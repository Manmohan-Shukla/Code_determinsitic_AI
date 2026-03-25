import dedupeAndValidate from "../services/suggest_service/suggest.dedupe.js";
import resolveSchema from "../services/suggest_service/suggest.schema_resolve.js";
import generateBaseTests from "../services/suggest_service/suggest.base_case.js";
import { testcase_prompt } from "../services/prompt/suggest.testcase.prompt.js";
import chatgpt from "../services/llm_call.js";
import { ensureBulletPoints } from "../utils/suggest.bullet_point.js";
import static_analyzer from "../services/review_service/review.static_analysis.js";
import { optimize_prompt } from "../services/prompt/suggest.optimize.prompt.js";
import heuristicOptimize from "../services/suggest_service/suggest.optimize.heuristic.js";
import { complexity_prompt } from "../services/prompt/suggest.timecomplexity.prompt.js";
import buildFallbackExplanation from "../services/suggest_service/suggest.complexity.fallback.js";
import classifyComplexity from "../services/suggest_service/suggest.complexity.classify.js";


// ==================== TESTCASE ====================

export async function testcase(req, res) {
  try {
    let { problem, code, constraints = {}, metadata } = req.body;

    // 🔥 normalize inputs
    problem = String(problem || "").trim();
    code = String(code || "").trim();

    if (!problem || !code) {
      return res.status(400).json({
        error: "problem description and code are required",
      });
    }

    // 🔥 ensure constraints is object
    if (typeof constraints !== "object") {
      constraints = { raw: String(constraints) };
    }

    let schema;

    // ✅ SAFE schema resolution
    try {
      schema = resolveSchema({ metadata, problem, code });
    } catch (err) {
      console.log("Schema failed → fallback used");

      schema = {
        kind: "single-input",
        input: "number",
        output: "number",
      };
    }

    // ✅ SAFE base test generation
    let baseTests = [];
    try {
      baseTests = generateBaseTests(schema, constraints);
    } catch (err) {
      console.log("Base test generation failed → fallback");

      baseTests = [0, 1, 2, 5, 10];
    }

    let aiTests = [];

    if (process.env.USE_AI === "true") {
      try {
        const prompt = testcase_prompt({
          schema,
          problem,
          constraints,
          baseTests,
        });

        const rawAIOutput = await chatgpt(prompt);

        if (typeof rawAIOutput === "string") {
          aiTests = ensureBulletPoints(rawAIOutput);
        }
      } catch (err) {
        console.log("AI test generation failed");
      }
    }

    const finalTests = dedupeAndValidate(
      [...baseTests, ...aiTests],
      schema,
      constraints
    );

    return res.json({
      schema: schema.kind,
      testcases: finalTests,
    });

  } catch (err) {
    console.error("Testcase error:", err);

    return res.status(500).json({
      error: "Internal server error during testcase generation",
    });
  }
}


// ==================== TIME COMPLEXITY ====================

export async function timecomplexity(req, res) {
  try {
    let { code } = req.body;

    code = String(code || "").trim();

    if (!code) {
      return res.status(400).json({
        error: "code is required",
      });
    }

    const static_info = static_analyzer(code);
    const complexity = classifyComplexity(static_info);

    let explanation = buildFallbackExplanation(complexity, static_info);

    if (process.env.USE_AI === "true") {
      try {
        const prompt = complexity_prompt(complexity, static_info);

        const rawAIOutput = await chatgpt(prompt);

        if (typeof rawAIOutput === "string" && rawAIOutput.trim()) {
          explanation = rawAIOutput.trim();
        }
      } catch (err) {
        console.log("AI complexity failed → fallback used");
      }
    }

    return res.json({
      explanation,
      complexity,
      static_info,
    });

  } catch (err) {
    console.error("timecomplexity error:", err);

    return res.status(500).json({
      error: "Internal server error during timecomplexity generation",
    });
  }
}


// ==================== OPTIMIZE ====================

export async function optimize(req, res) {
  try {
    let { code, constraints = {} } = req.body;

    code = String(code || "").trim();

    if (!code) {
      return res.status(400).json({
        error: "code is required",
      });
    }

    // 🔥 normalize constraints
    if (typeof constraints !== "object") {
      constraints = { raw: String(constraints) };
    }

    const static_info = static_analyzer(code);

    let optimizations = heuristicOptimize(static_info);

    if (process.env.USE_AI === "true") {
      try {
        const prompt = optimize_prompt(code, static_info, constraints);

        const rawAIOutput = await chatgpt(prompt);

        if (typeof rawAIOutput === "string") {
          const aitexts = ensureBulletPoints(rawAIOutput);

          if (aitexts.length > 0) {
            optimizations = dedupeAndValidate(aitexts, false);
          }
        }
      } catch (err) {
        console.log("AI optimize failed → fallback used");
      }
    }

    return res.json({
      optimization: optimizations,
    });

  } catch (err) {
    console.error("optimize error:", err);

    return res.status(500).json({
      error: "Internal server error during optimization",
    });
  }
}
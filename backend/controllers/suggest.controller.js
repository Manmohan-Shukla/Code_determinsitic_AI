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
export async function testcase(req, res) {
  try {
    const { problem, code, constraints = {}, metadata } = req.body;

    if (!problem || !code) {
      return res.status(400).json({
        error: "problem description and code are required",
      });
    }

    let schema;
    try {
      schema = resolveSchema({ metadata, problem, code });
    } catch (err) {
      return res.status(400).json({
        error: "Unable to resolve input schema",
      });
    }

    const baseTests = generateBaseTests(schema, constraints);

    let aiTests = [];
    if (process.env.USE_AI === "true") {
      const prompt = testcase_prompt({
        schema,
        problem,
        constraints,
        baseTests,
      });

      const rawAIOutput = await chatgpt(prompt);
      aiTests = ensureBulletPoints(rawAIOutput);
    }

    const finalTests = dedupeAndValidate(
      [...baseTests, ...aiTests],
      schema,
      constraints
    );

    res.json({
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

export async function timecomplexity(req, res) {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        error: "problem description and code are required",
      });
    }
    const static_info = static_analyzer(code);

    const complexity = classifyComplexity(static_info);

    let explanation = buildFallbackExplanation(complexity, static_info);
    if (process.env.USE_AI == "true") {
      const prompt = complexity_prompt(complexity, static_info);

      const rawAIOutput = await chatgpt(prompt);
      if (typeof rawAIOutput === "string" && rawAIOutput.trim()) {
        explanation = rawAIOutput.trim();
      }
    }
    res.json({
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

export async function optimize(req, res) {
  try {
    const { code, constraints = {} } = req.body;

    if (!code) {
      return res.status(400).json({
        error: "problem description and code are required",
      });
    }

    const static_info = static_analyzer(code);
    let optimizations = heuristicOptimize(static_info);

    let aitexts = [];
    if (process.env.USE_AI == "true") {
      const prompt = optimize_prompt(code, static_info, constraints);

      const rawAIOutput = await chatgpt(prompt);

      aitexts = ensureBulletPoints(rawAIOutput);
    }
    if (aitexts.length > 0) {
      optimizations = dedupeAndValidate(aitexts, false);
    }
    res.json({
      optimization: optimizations,
    });
  } catch (err) {
    console.error("optimize error:", err);
    return res.status(500).json({
      error: "Internal server error during optimization ",
    });
  }
}

import dedupeAndValidate from "../services/suggest_service/suggest.dedupe.js";
import resolveSchema from "../services/suggest_service/suggest.schema_resolve.js";
import generateBaseTests from "../services/suggest_service/suggest.base_case.js";
import { testcase_prompt } from "../services/prompt/suggest.testcase.prompt.js";
import chatgpt from "../services/llm_call.js";
import { ensureBulletPoints } from "../utils/suggest.bullet_point.js";
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

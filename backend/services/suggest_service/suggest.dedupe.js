import validateTest from "../suggest_service/suggest.validate.js";

export default function dedupeAndValidate(
  tests,
  schema,
  constraints,
  logic = true
) {
  const seen = new Set();
  const result = [];

  for (const test of tests) {
    if (logic) {
      if (!seen.has(test) && validateTest(test, schema, constraints)) {
        seen.add(test);
        result.push(test);
      }
    } else {
      if (!seen.has(test)) {
        seen.add(test);
        result.push(test);
      }
    }
  }

  return result;
}

import validateTest from "../suggest_service/suggest.validate.js";

export default function dedupeAndValidate(tests, schema, constraints) {
  const seen = new Set();
  const result = [];

  for (const test of tests) {
    if (!seen.has(test) && validateTest(test, schema, constraints)) {
      seen.add(test);
      result.push(test);
    }
  }

  return result;
}

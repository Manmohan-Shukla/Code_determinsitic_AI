export default function validateTest(test, schema, constraints) {
  switch (schema.kind) {
    case "array":
      return /\[.*\]/.test(test);

    case "string":
      return /".*"/.test(test);

    case "matrix":
      return /\[\[.*\]\]/.test(test);

    case "binary_tree":
      return /\[.*(null)?.*\]/.test(test);

    case "graph":
      return /\[\[.*\]\]/.test(test);

    case "composite":
      return test.includes(",");

    default:
      return true;
  }
}

export default function generateBaseTests(schema, constraints) {
  const tests = [];

  switch (schema.kind) {
    case "array":
      tests.push("nums = [1]");
      tests.push("nums = [0, 0, 0]");
      tests.push("nums = [1, 2, 3, 4, 5]");
      tests.push("nums = [5, 4, 3, 2, 1]");
      break;

    case "string":
      tests.push('s = "a"');
      tests.push('s = "aaaaa"');
      tests.push('s = "abcde"');
      break;

    case "matrix":
      tests.push("grid = [[0]]");
      tests.push("grid = [[1,0],[0,1]]");
      break;

    case "binary_tree":
      tests.push("root = []");
      tests.push("root = [1]");
      tests.push("root = [1,null,2]");
      break;

    case "graph":
      tests.push("edges = []");
      tests.push("edges = [[1,2]]");
      break;

    case "composite":
      tests.push("nums = [1], k = 1");
      tests.push("nums = [1,2,3], k = 0");
      break;

    default:
      tests.push("default minimal input");
  }

  return tests;
}

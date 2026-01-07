import { InputSchemas } from "../../schema/suggest.testcase.schema.js";

export default function resolveSchema({ metadata, problem, code }) {
  /* 1. Explicit metadata */
  if (metadata?.inputType && InputSchemas[metadata.inputType]) {
    return InputSchemas[metadata.inputType];
  }

  /* 2. Problem description */
  if (problem) {
    const p = problem.toLowerCase();

    if (p.includes("array")) return InputSchemas.array;
    if (p.includes("string")) return InputSchemas.string;
    if (p.includes("matrix") || p.includes("grid")) return InputSchemas.matrix;
    if (p.includes("binary tree")) return InputSchemas.binary_tree;
    if (p.includes("graph")) return InputSchemas.graph;
  }

  /* 3. Code signature */
  if (code) {
    if (/vector<\s*int\s*>/.test(code)) return InputSchemas.array;
    if (/string\s+\w+/.test(code)) return InputSchemas.string;
    if (/TreeNode\s*\*/.test(code)) return InputSchemas.binary_tree;
    if (/vector<\s*vector<\s*int\s*>>/.test(code)) return InputSchemas.matrix;
  }

  /* 4. Heuristic fallback */
  if (code) {
    if (/\w+\[\w+\]\[\w+\]/.test(code)) return InputSchemas.matrix;
    if (/\w+\[\w+\]/.test(code)) return InputSchemas.array;
  }

  throw new Error("Unable to resolve input schema");
}

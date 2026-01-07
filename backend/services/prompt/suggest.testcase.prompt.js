export function testcase_prompt(schema, problem, constraints, baseTests) {
  return `You are generating additional edge-case test inputs for a coding problem.

Input schema:
${schema.format}

Constraints:
${constraints}

Already covered test cases:
${baseTests}

Problem description:
${problem}



Rules:
- Do NOT repeat already covered cases
- Output ONLY concrete test inputs
- Follow the input schema exactly
- Respect all constraints
- Output bullet points only
- Focus on tricky and adversarial cases

`;
}

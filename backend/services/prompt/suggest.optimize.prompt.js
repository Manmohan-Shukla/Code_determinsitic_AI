export function optimize_prompt(
  codeSnippet,
  nestedLoops,
  recursion,
  constraints
) {
  return `You are assisting a code optimization engine.

Facts from static analysis:
- Nested loops: ${nestedLoops}
- Recursion: ${recursion}
- Input constraints: ${constraints}

Rules:
- Do NOT analyze the code from scratch
- Do NOT mention time complexity numbers
- Suggest only high-level optimization strategies
- Output 3 concise bullet points

Code context (partial):
${codeSnippet}
`;
}

export function complexity_prompt(complexity, nestedLoops, recursion) {
  return `You are explaining algorithmic complexity to a student.

Facts:
- Classified complexity: ${complexity}
- Nested loops: ${nestedLoops}
- Recursion: ${recursion}

Rules:
- Do NOT change the complexity
- Do NOT re-analyze the code
- Explain in simple terms why this complexity occurs
- Use plain language, no formulas beyond Big-O
`;
}

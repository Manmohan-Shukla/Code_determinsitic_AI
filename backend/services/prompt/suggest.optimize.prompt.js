export function optimize_prompt(codeSnippet, static_info, constraints) {
  return `
You are assisting a code optimization engine.

Facts from static analysis:
- Total loop count: ${static_info.loopCount}
- Nested loops detected: ${static_info.nested}
- Recursion detected: ${static_info.recursion}
- Sorting used: ${static_info.sorting}
- Hash-based structure used (map/dict): ${static_info.hashMap}
- Set used: ${static_info.set}
- BFS pattern detected: ${static_info.bfs}
- DFS pattern detected: ${static_info.dfs}
- Dynamic programming pattern detected: ${static_info.dp}
- Large input constraints detected: ${static_info.largeArray}

Input constraints:
${constraints || "Not specified"}

Rules:
- Do NOT analyze the code from scratch
- Do NOT infer or change time complexity
- Do NOT mention Big-O notation
- Suggest only high-level optimization strategies
- Base suggestions strictly on the facts above
- Output EXACTLY 3 concise bullet points
- No explanations, no extra text

Code context (partial, for reference only):
${codeSnippet}
`;
}

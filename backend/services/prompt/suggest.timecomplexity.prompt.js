// export function complexity_prompt(complexity, static_info) {
//   return `
// You are explaining algorithmic time complexity to a student.

// Facts from static analysis:
// - Classified time complexity: ${complexity}
// - Total loop count: ${static_info.loopCount}
// - Nested loops detected: ${static_info.nested}
// - Recursion detected: ${static_info.recursion}
// - Sorting used: ${static_info.sorting}
// - Dynamic programming detected: ${static_info.dp}
// - BFS pattern detected: ${static_info.bfs}
// - DFS pattern detected: ${static_info.dfs}
// - Large input constraints detected: ${static_info.largeArray}

// Rules:
// - Do NOT change or question the classified complexity
// - Do NOT re-analyze the code
// - Explain ONLY why this complexity arises based on the facts above
// - Use plain language
// - Do NOT introduce new technical assumptions
// - Avoid formulas beyond Big-O
// - Keep the explanation concise and clear
// `;
// }

export function complexity_prompt(complexity, static_info) {
  return `
You are explaining algorithmic time complexity to a student.

Facts from static analysis (DO NOT question these):
- Classified time complexity: ${complexity}
- Total loop count: ${static_info.loopCount}
- Nested loops detected: ${static_info.nested}
- Recursion detected: ${static_info.recursion}
- Sorting used: ${static_info.sorting}
- Dynamic programming detected: ${static_info.dp}
- BFS pattern detected: ${static_info.bfs}
- DFS pattern detected: ${static_info.dfs}
- Large input constraints detected: ${static_info.largeArray}

Rules (STRICT):
- Do NOT restate or repeat the complexity value
- Do NOT write Big-O notation more than once
- Do NOT use markdown, bold text, or bullet points
- Do NOT name specific algorithms or data structures
- Do NOT re-analyze or infer new behavior
- Explain ONLY the reason for the complexity in plain language
- Keep the explanation to 2–4 short sentences
`;
}

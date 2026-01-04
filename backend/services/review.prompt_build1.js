export function build_prompt(code, staticInfo, failureHint, constraints = "") {
  const {
    loopCount,
    nestedLoops,
    recursion,
    sorting,
    hashmap,
    setUsage,
    dpArray,
    bfs,
    dfs,
    largeArray,
  } = staticInfo || {};

  const failureSection = failureHint
    ? `
Failure Classification:
- Type: ${failureHint.type}
- Confidence: ${failureHint.confidence}
- Reason: ${failureHint.reason}
`
    : `
Failure Classification:
- Type: UNKNOWN
- Confidence: LOW
- Reason: No strong failure pattern detected
`;

  return `
You are an experienced competitive programming interviewer.

Analyze the following solution and explain the likely issue clearly and concisely.

-------------------------
PROBLEM CONSTRAINTS
-------------------------
${constraints || "No explicit constraints provided."}

-------------------------
STATIC ANALYSIS SIGNALS
-------------------------
- Loop count: ${loopCount}
- Nested loops: ${nestedLoops}
- Recursion used: ${recursion}
- Sorting used: ${sorting}
- Hash map used: ${hashmap}
- Set used: ${setUsage}
- DP array detected: ${dpArray}
- BFS detected: ${bfs}
- DFS detected: ${dfs}
- Large input indicators: ${largeArray}

${failureSection}

-------------------------
SOURCE CODE
-------------------------
${code}

-------------------------
INSTRUCTIONS
-------------------------
1. Explain *why* this solution may fail under the given constraints.
2. If the failure is TLE or MLE, explain the time or space complexity.
3. If the failure is WA, explain the logical risk or missing case.
4. Suggest a high-level fix or optimization (do NOT rewrite full code).
5. Keep the explanation short, technical, and interview-focused.

Respond in clear bullet points.
`;
}

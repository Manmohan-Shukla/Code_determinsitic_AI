export default function buildFallbackExplanation(complexity, staticInfo) {
  const reasons = [];

  /* ---------------------------------
     Nested loops
     --------------------------------- */
  if (staticInfo.nested) {
    if (staticInfo.loopCount >= 3) {
      reasons.push(
        "The code contains multiple levels of nested loops, where inner loops execute repeatedly for each outer iteration, leading to very rapid growth in operations."
      );
    } else {
      reasons.push(
        "The code contains nested loops, meaning an inner loop runs for every iteration of an outer loop, which significantly increases the total number of operations."
      );
    }
  }

  /* ---------------------------------
     Loop count (non-nested)
     --------------------------------- */
  if (!staticInfo.nested && staticInfo.loopCount > 1) {
    reasons.push(
      "The code uses multiple loops. Even if they are not nested, repeated full traversals of the input can increase runtime."
    );
  }

  /* ---------------------------------
     Recursion
     --------------------------------- */
  if (staticInfo.recursion) {
    if (staticInfo.dp) {
      reasons.push(
        "The code uses recursion along with dynamic programming, which avoids repeated computations and keeps the runtime under control."
      );
    } else {
      reasons.push(
        "The code relies on recursion without clear memoization, so the number of function calls can grow quickly depending on the recursion tree."
      );
    }
  }

  /* ---------------------------------
     Sorting
     --------------------------------- */
  if (staticInfo.sorting) {
    reasons.push(
      "A sorting operation is performed, which typically requires more work as the input size grows."
    );
  }

  /* ---------------------------------
     BFS / DFS traversal
     --------------------------------- */
  if (staticInfo.dfs) {
    reasons.push(
      "A depth-first search traversal is used. Each node and edge may be visited once, depending on how the graph or tree is structured."
    );
  }

  if (staticInfo.bfs) {
    reasons.push(
      "A breadth-first search traversal is used, processing elements level by level using a queue."
    );
  }

  /* ---------------------------------
     Dynamic Programming (iterative)
     --------------------------------- */
  if (staticInfo.dp && !staticInfo.recursion) {
    reasons.push(
      "Dynamic programming is used with iterative state transitions, which processes each state a limited number of times."
    );
  }

  /* ---------------------------------
     Large input constraints
     --------------------------------- */
  if (staticInfo.largeArray) {
    if (staticInfo.nested) {
      reasons.push(
        "The input size is large, and when combined with nested loops this can significantly impact performance."
      );
    } else {
      reasons.push(
        "The input size is large, so even linear passes must be implemented efficiently."
      );
    }
  }

  /* ---------------------------------
     Hash-based data structures
     --------------------------------- */
  if (staticInfo.hashMap || staticInfo.set) {
    reasons.push(
      "Hash-based data structures are used, which generally allow constant-time lookups and help reduce unnecessary iteration."
    );
  }

  /* ---------------------------------
     Final fallback (no signals)
     --------------------------------- */
  if (reasons.length === 0) {
    reasons.push(
      "The code performs a small, fixed set of operations and does not scale with input size in a significant way."
    );
  }

  /* ---------------------------------
     Combine into explanation
     --------------------------------- */
  return reasons.join(" ");
}

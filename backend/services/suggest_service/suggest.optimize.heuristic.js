export default function heuristicOptimize(staticInfo) {
  const suggestions = [];

  /* ---------------------------------
     1. Nested loops (highest impact)
     --------------------------------- */
  if (staticInfo.nested) {
    if (staticInfo.hashMap || staticInfo.set) {
      suggestions.push(
        "You are using nested loops along with hash-based structures; consider reducing the inner loop by direct lookups instead of full scans"
      );
    } else {
      suggestions.push(
        "Nested loops detected; consider hashing, prefix sums, or two-pointer techniques to eliminate inner iteration"
      );
    }
  }

  /* ---------------------------------
     2. High loop count (but not nested)
     --------------------------------- */
  if (!staticInfo.nested && staticInfo.loopCount >= 2) {
    suggestions.push(
      "Multiple loops detected; check if loops can be merged or if early termination conditions can reduce iterations"
    );
  }

  /* ---------------------------------
     3. Recursion-specific optimizations
     --------------------------------- */
  if (staticInfo.recursion) {
    if (staticInfo.dp) {
      suggestions.push(
        "Recursive DP detected; ensure memoization is complete and avoid recomputation of overlapping subproblems"
      );
    } else {
      suggestions.push(
        "Recursion detected; consider memoization or converting to an iterative solution to reduce call stack overhead"
      );
    }
  }

  /* ---------------------------------
     4. DFS / BFS specific guidance
     --------------------------------- */
  if (staticInfo.dfs) {
    suggestions.push(
      "DFS pattern detected; ensure visited nodes are tracked to avoid redundant traversal"
    );
  }

  if (staticInfo.bfs) {
    suggestions.push(
      "BFS pattern detected; verify queue operations are O(1) and avoid pushing the same node multiple times"
    );
  }

  /* ---------------------------------
     5. Sorting usage
     --------------------------------- */
  if (staticInfo.sorting) {
    suggestions.push(
      "Sorting is used; verify that sorting is required and not repeated unnecessarily inside loops"
    );
  }

  /* ---------------------------------
     6. Large input constraints
     --------------------------------- */
  if (staticInfo.largeArray) {
    if (staticInfo.nested) {
      suggestions.push(
        "Large input size combined with nested loops may cause performance issues; prioritize reducing time complexity"
      );
    } else {
      suggestions.push(
        "Large input size detected; ensure all operations are linear or near-linear where possible"
      );
    }
  }

  /* ---------------------------------
     7. HashMap / Set usage refinement
     --------------------------------- */
  if (staticInfo.hashMap && staticInfo.loopCount > 1 && !staticInfo.nested) {
    suggestions.push(
      "Hash-based lookups are used; consider restructuring logic to rely more on constant-time access rather than repeated iteration"
    );
  }

  /* ---------------------------------
     8. Dynamic Programming memory hints
     --------------------------------- */
  if (staticInfo.dp) {
    suggestions.push(
      "Dynamic programming detected; review state size and consider space optimization using rolling arrays if applicable"
    );
  }

  /* ---------------------------------
     9. Fallback (no signals)
     --------------------------------- */
  if (suggestions.length === 0) {
    suggestions.push(
      "No obvious structural optimization issues detected; consider improving readability or adding early exit conditions"
    );
  }

  /* ---------------------------------
     10. Cap suggestions (important)
     --------------------------------- */
  return suggestions.slice(0, 4);
}

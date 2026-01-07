export default function classifyComplexity(staticInfo) {
  const {
    loopCount,
    nested,
    recursion,
    sorting,
    hashMap,
    set,
    bfs,
    dfs,
    dp,
    largeArray,
  } = staticInfo;

  /* ---------------------------------
     1. Deep nesting (highest priority)
     --------------------------------- */
  if (nested) {
    if (loopCount >= 3) {
      return "O(n^3)";
    }
    return "O(n^2)";
  }

  /* ---------------------------------
     2. Recursion-based patterns
     --------------------------------- */
  if (recursion) {
    // Graph / tree traversal
    if (dfs || bfs) {
      return "O(V + E)";
    }

    // Memoized recursion / DP
    if (dp) {
      return "O(n)";
    }

    // Plain recursion (backtracking, divide & conquer)
    return "Depends on recursion tree";
  }

  /* ---------------------------------
     3. Sorting-based complexity
     --------------------------------- */
  if (sorting) {
    // Sorting usually dominates linear passes
    return "O(n log n)";
  }

  /* ---------------------------------
     4. Dynamic programming (iterative)
     --------------------------------- */
  if (dp && loopCount >= 2) {
    return "O(n^2)";
  }

  if (dp && loopCount === 1) {
    return "O(n)";
  }

  /* ---------------------------------
     5. Graph traversal without recursion
     --------------------------------- */
  if (bfs || dfs) {
    return "O(V + E)";
  }

  /* ---------------------------------
     6. Multiple non-nested loops
     --------------------------------- */
  if (loopCount > 1) {
    return "O(n)";
  }

  /* ---------------------------------
     7. Single loop
     --------------------------------- */
  if (loopCount === 1) {
    return "O(n)";
  }

  /* ---------------------------------
     8. Hash / Set only operations
     --------------------------------- */
  if ((hashMap || set) && loopCount === 0) {
    return "O(1)";
  }

  /* ---------------------------------
     9. Large input but no clear loops
     --------------------------------- */
  if (largeArray) {
    return "O(n)";
  }

  /* ---------------------------------
     10. Default fallback
     --------------------------------- */
  return "O(1)";
}

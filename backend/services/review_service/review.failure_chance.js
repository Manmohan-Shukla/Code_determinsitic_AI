function normalizeConstraints(constraints) {
  if (!constraints) return "";

  if (typeof constraints === "string") {
    return constraints.toLowerCase();
  }

  if (typeof constraints === "object") {
    return Object.values(constraints).join(" ").toLowerCase();
  }

  return "";
}

export default function failure_chance(static_info, constraints) {
  const cnormal = normalizeConstraints(constraints);

  // 🔥 Detect input size
  const largeN =
    cnormal.includes("1e5") ||
    cnormal.includes("100000") ||
    cnormal.includes("200000") ||
    cnormal.includes("10^5") ||
    cnormal.includes("2e5");

  const vlargeN =
    cnormal.includes("1e6") ||
    cnormal.includes("1000000") ||
    cnormal.includes("10^6");

  const tightMemory =
    cnormal.includes("128mb") ||
    cnormal.includes("64mb");

  // 🚀 ===== TLE CASES =====

  if (static_info.nested && largeN) {
    return {
      type: "TLE",
      confidence: "High",
      reason: "Nested loops with large input size",
    };
  }

  if (static_info.sorting && static_info.loopCount > 1 && largeN) {
    return {
      type: "TLE",
      confidence: "High",
      reason: "Repeated sorting inside loop",
    };
  }

  if (static_info.recursion && vlargeN) {
    return {
      type: "TLE",
      confidence: "High",
      reason: "Deep recursion with very large input size",
    };
  }

  // 🔥 IMPORTANT FIX (your fibonacci case)
  if (static_info.recursion && !static_info.dp) {
    return {
      type: "TLE",
      confidence: "High",
      reason: "Exponential recursion without memoization",
    };
  }

  // 🚀 ===== MLE CASES =====

  if (static_info.dp && vlargeN) {
    return {
      type: "MLE",
      confidence: "High",
      reason: "DP table too large for memory limits",
    };
  }

  if (static_info.dp && tightMemory) {
    return {
      type: "MLE",
      confidence: "Medium",
      reason: "DP memory usage risky under tight constraints",
    };
  }

  // 🚀 ===== WA CASES =====

  if ((static_info.dfs || static_info.bfs) && !static_info.hashMap) {
    return {
      type: "WA",
      confidence: "Medium",
      reason: "Graph traversal without visited tracking",
    };
  }

  // 🚀 ===== SUBOPTIMAL =====

  if (static_info.sorting && !largeN) {
    return {
      type: "SubOptimal",
      confidence: "High",
      reason: "Sorting used where linear approach may exist",
    };
  }

  // 🚀 DEFAULT

  return {
    type: "UNKNOWN",
    confidence: "Low",
    reason: "Insufficient evidence to classify failure",
  };
}
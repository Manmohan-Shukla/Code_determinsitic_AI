export default function static_analyzer(code) {
  const normalize = code.replace(/\s+/g, " ").toLowerCase();

  const forLoop = (normalize.match(/\bfor\b/g) || []).length;
  const whileLoop = (normalize.match(/\bwhile\b/g) || []).length;
  const loopCount = forLoop + whileLoop;

  const nested =
    /for[\s\S]*for/.test(normalize) ||
    /for[\s\S]*while/.test(normalize) ||
    /while[\s\S]*for/.test(normalize) ||
    /while[\s\S]*while/.test(normalize);
  const functionNames = [...normalize.matchAll(/\b(\w+)\s*\(/g)]
    .map((m) => m[1])
    .filter(
      (name) => !["if", "for", "while", "switch", "return"].includes(name)
    );

  let recursion = false;
  for (const fn of functionNames) {
    const regex = new RegExp(`\\b${fn}\\s*\\(`, "g");
    if ((normalize.match(regex) || []).length > 1) {
      recursion = true;
      break;
    }
  }
  const sorting =
    normalize.includes("sort(") ||
    normalize.includes("sorted(") ||
    normalize.includes(".sort(");

  const hashMap =
    normalize.includes("unordered_map") ||
    normalize.includes("dict") ||
    normalize.includes("map<") ||
    normalize.includes("{");

  const set = normalize.includes("set<") || normalize.includes("unordered_set");
  const dfs =
    recursion && (normalize.includes("adj") || normalize.includes("graph"));

  const bfs =
    normalize.includes("queue") &&
    (normalize.includes("push") || normalize.includes("pop"));

  const largeArray =
    normalize.includes("1e5") ||
    normalize.includes("1e6") ||
    normalize.includes("100000");

  const dp =
    /\bvector<vector<\b/.test(normalize) ||
    /\bdp\b/.test(normalize) ||
    /\bint\s+dp\[b/.test(normalize);

  return {
    loopCount,
    sorting,
    nested,
    hashMap,
    set,
    recursion,
    bfs,
    dfs,
    dp,
    largeArray,
  };
}

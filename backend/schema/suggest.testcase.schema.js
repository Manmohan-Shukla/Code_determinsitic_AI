export const InputSchemas = {
  scalar: {
    kind: "scalar",
    format: "n = integer",
    constraints: {
      min: -1e9,
      max: 1e9,
    },
    semantics: ["count", "index", "threshold"],
  },

  /* =========================
     2. Array / List
     ========================= */
  array: {
    kind: "array",
    format: "nums = [int]",
    constraints: {
      minLength: 1,
      maxLength: 200000,
      minValue: -1e9,
      maxValue: 1e9,
    },
    semantics: ["sorted", "duplicates_allowed", "can_be_negative"],
  },

  /* =========================
     3. String
     ========================= */
  string: {
    kind: "string",
    format: "s = string",
    constraints: {
      minLength: 1,
      maxLength: 100000,
      charset: "lowercase | uppercase | alphanumeric | ascii",
    },
    semantics: ["palindrome_candidate", "pattern_sensitive"],
  },

  /* =========================
     4. Matrix / 2D Grid
     ========================= */
  matrix: {
    kind: "matrix",
    format: "grid = [[int]]",
    constraints: {
      rows: [1, 1000],
      cols: [1, 1000],
      minValue: -1e9,
      maxValue: 1e9,
    },
    semantics: ["binary_matrix", "graph_adjacency", "dp_grid"],
  },

  /* =========================
     5. Linked List
     (LeetCode uses array serialization)
     ========================= */
  linked_list: {
    kind: "linked_list",
    format: "head = [int]",
    constraints: {
      minLength: 0,
      maxLength: 100000,
      minValue: -1e9,
      maxValue: 1e9,
    },
    semantics: ["cycle_possible", "sorted"],
  },

  /* =========================
     6. Binary Tree
     (Level-order with nulls)
     ========================= */
  binary_tree: {
    kind: "binary_tree",
    format: "root = [int | null]",
    constraints: {
      maxNodes: 100000,
      minValue: -1e9,
      maxValue: 1e9,
    },
    semantics: ["bst", "complete", "skewed"],
  },

  /* =========================
     7. Graph (Edge List)
     ========================= */
  graph: {
    kind: "graph",
    format: "edges = [[u, v]]",
    constraints: {
      nodes: [1, 200000],
      edges: [0, 200000],
      directed: false,
      weighted: false,
    },
    semantics: ["tree", "cycle", "disconnected"],
  },

  /* =========================
     8. Composite / Multi-Input
     Example: nums + k
     ========================= */
  composite: {
    kind: "composite",
    inputs: [
      {
        name: "nums",
        kind: "array",
        constraints: {
          minLength: 1,
          maxLength: 100000,
          minValue: -1e9,
          maxValue: 1e9,
        },
      },
      {
        name: "k",
        kind: "scalar",
        constraints: {
          min: 0,
          max: 100000,
        },
      },
    ],
    format: "nums = [int], k = int",
  },
};

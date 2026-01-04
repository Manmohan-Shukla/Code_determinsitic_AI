export function buildPrompt(code, staticInfo, failureHint, constraints = "") {
  const signals = Object.entries(staticInfo || {})
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  return `
ROLE:
You are a competitive programming interviewer.

TASK:
Explain the likely failure and how to fix it.

FAILURE_HINT:
${
  failureHint
    ? `type: ${failureHint.type}
confidence: ${failureHint.confidence}
reason: ${failureHint.reason}`
    : `type: UNKNOWN
confidence: LOW
reason: Insufficient evidence`
}

CONSTRAINTS:
${constraints || "Not specified"}

STATIC_SIGNALS:
${signals}

CODE:
${code}

RESPONSE_RULES:
- Explain why the solution fails under constraints
- Mention time/space complexity if relevant
- If WA, explain the logical risk
- Suggest a high-level fix (no full rewrite)
- Use bullet points only
`;
}

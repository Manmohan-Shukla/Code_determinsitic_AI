export function ensureBulletPoints(text) {
  return text
    .split("\n")
    .filter(
      (line) => line.trim().startsWith("•") || line.trim().startsWith("-")
    )
    .slice(0, 5);
}

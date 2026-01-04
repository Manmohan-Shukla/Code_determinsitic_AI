import crypto from "crypto";
export default function hashCode(code) {
  return crypto.createHash("sha256").update(code).digest("hex");
}

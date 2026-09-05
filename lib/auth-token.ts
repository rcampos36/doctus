import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const COOKIE_NAME = "doctus_admin";
const SESSION_DAYS = 7;

function authSecret() {
  return process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD || "doctus-dev-secret";
}

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "doctus";
}

function sign(value: string) {
  return createHmac("sha256", authSecret()).update(value).digest("hex");
}

export function safeEqual(left: string, right: string) {
  const a = createHash("sha256").update(left).digest();
  const b = createHash("sha256").update(right).digest();
  return timingSafeEqual(a, b);
}

export function verifyAdminPassword(password: string) {
  return safeEqual(password, adminPassword());
}

export function createSessionToken() {
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000 }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function isValidAdminCookie(token?: string | null) {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeEqual(sign(payload), signature)) return false;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      exp?: number;
    };
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

export const SESSION_MAX_AGE = SESSION_DAYS * 24 * 60 * 60;

import { cookies } from "next/headers";
import {
  COOKIE_NAME,
  SESSION_MAX_AGE,
  createSessionToken,
  isValidAdminCookie,
  verifyAdminPassword,
} from "@/lib/auth-token";

export { COOKIE_NAME, isValidAdminCookie, verifyAdminPassword };

export async function getAdminSession() {
  const store = await cookies();
  return isValidAdminCookie(store.get(COOKIE_NAME)?.value);
}

export async function setAdminSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

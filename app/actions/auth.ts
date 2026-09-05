"use server";

import { redirect } from "next/navigation";
import { clearAdminSession, setAdminSession, verifyAdminPassword } from "@/lib/auth";

export async function loginAction(_prev: { error?: string } | null, formData: FormData) {
  const password = String(formData.get("password") || "");
  if (!verifyAdminPassword(password)) {
    return { error: "That password is incorrect." };
  }

  await setAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions/auth";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <main className="page-gutter flex min-h-dvh items-center justify-center py-16">
      <div className="w-full max-w-md rounded-[1.25rem] bg-white p-5 shadow-[0_1px_0_rgb(0_0_0/0.04)] sm:p-8">
        <p className="mb-3 inline-flex rounded-full bg-[#ebe8e2] px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-text-dark uppercase">
          Admin
        </p>
        <h1 className="text-[clamp(1.75rem,6vw,2rem)] leading-tight font-bold tracking-[-0.03em]">
          Sign in to edit Doctus
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-paragraph-gray">
          Use the admin password to update landing page copy, images, and lists.
        </p>
        <form action={formAction} className="mt-8 grid gap-4">
          <label className="block text-[0.8125rem] font-medium text-text-dark">
            Password
            <input
              type="password"
              name="password"
              required
              autoFocus
              className="mt-1.5 w-full rounded-[0.625rem] border border-[#260a0026] bg-white px-[0.875rem] py-[0.625rem] text-base text-text-dark outline-none focus:border-[#c9510080] focus:shadow-[0_0_0_2px_#c9510026]"
            />
          </label>
          {state?.error ? (
            <p className="rounded-xl bg-[#fef2f2] px-4 py-3 text-sm text-[#991b1b]">{state.error}</p>
          ) : null}
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-[0.9375rem] font-semibold text-white disabled:opacity-60"
          >
            {pending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}

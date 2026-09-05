"use client";

import { useActionState } from "react";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";
import type { SiteContent } from "@/lib/cms/types";

const initialContactState: ContactState = { status: "idle" };

export default function Footer({
  content,
  navLinks,
}: {
  content: SiteContent["footer"];
  navLinks: SiteContent["header"]["navLinks"];
}) {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialContactState,
  );

  return (
    <footer
      id="contact"
      className="content-info page-gutter border-t border-text-dark/10 bg-ductus-header pt-[clamp(2.5rem,6vw,4rem)] pb-[max(clamp(2.5rem,6vw,4rem),env(safe-area-inset-bottom,0px))] text-text-dark"
    >
      <div className="mx-auto max-w-[1300px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,9rem)_minmax(0,1.35fr)_minmax(0,1.15fr)] lg:items-start lg:gap-x-10 xl:gap-x-14">
          <div className="max-w-[9rem] shrink-0">
            <a className="inline-flex items-center gap-2 text-inherit no-underline" href="#home">
              <img
                className="h-7 w-auto max-w-full"
                src={content.logo}
                alt="Doctus"
                width={100}
                height={43}
              />
            </a>
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <a
                className="inline-flex h-6 w-6 items-center justify-center rounded-[0.2rem] border border-primary/40 text-primary no-underline transition-opacity hover:opacity-85"
                href={content.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="h-4 w-4 object-contain" src={content.instagramIcon} alt="" />
              </a>
            </div>
          </div>

          <div className="min-w-0 lg:pr-4 xl:pr-6">
            <h3 className="m-0 mb-4 text-[1.125rem] font-semibold tracking-[-0.01em] text-text-dark">
              {content.formEyebrow}
            </h3>
            {state.status === "sent" ? (
              <p className="rounded-xl bg-primary/10 px-4 py-3 text-[0.9375rem] leading-[1.45] text-text-dark">
                {content.successMessage}
              </p>
            ) : (
              <form className="mt-1 flex flex-col gap-4" action={formAction}>
                <label className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  Company
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                </label>
                <label className="block text-[0.8125rem] font-medium text-text-dark">
                  Name *
                  <input
                    required
                    name="name"
                    className="mt-1.5 w-full rounded-[0.625rem] border border-[#260a0026] bg-white px-[0.875rem] py-[0.625rem] text-base leading-[1.45] text-text-dark shadow-[0_1px_#00000008] outline-none transition-[border-color,box-shadow] duration-150 focus:border-[#c9510080] focus:shadow-[0_0_0_2px_#c9510026]"
                  />
                </label>
                <label className="block text-[0.8125rem] font-medium text-text-dark">
                  Email *
                  <input
                    required
                    type="email"
                    name="email"
                    className="mt-1.5 w-full rounded-[0.625rem] border border-[#260a0026] bg-white px-[0.875rem] py-[0.625rem] text-base leading-[1.45] text-text-dark shadow-[0_1px_#00000008] outline-none transition-[border-color,box-shadow] duration-150 focus:border-[#c9510080] focus:shadow-[0_0_0_2px_#c9510026]"
                  />
                </label>
                <label className="block text-[0.8125rem] font-medium text-text-dark">
                  Message *
                  <textarea
                    required
                    name="message"
                    className="mt-1.5 min-h-[6.5rem] w-full resize-y rounded-[0.625rem] border border-[#260a0026] bg-white px-[0.875rem] py-[0.625rem] text-base leading-[1.45] text-text-dark shadow-[0_1px_#00000008] outline-none transition-[border-color,box-shadow] duration-150 focus:border-[#c9510080] focus:shadow-[0_0_0_2px_#c9510026]"
                  />
                </label>
                {state.status === "error" ? (
                  <p className="rounded-xl bg-[#fef2f2] px-4 py-3 text-sm text-[#991b1b]">
                    {state.error}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-primary px-6 py-3 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-[color-mix(in_srgb,var(--primary)_88%,black)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {pending ? "Sending..." : "Submit"}
                </button>
              </form>
            )}
          </div>

          <div className="min-w-0 lg:pl-2 xl:pl-4">
            <h3 className="m-0 text-[clamp(1.875rem,3.2vw,3rem)] leading-[1.14] font-semibold tracking-[-0.02em] text-text-dark whitespace-pre-line">
              {content.heading}
            </h3>
            <p className="mt-6 text-[clamp(1rem,1.25vw,1.125rem)] leading-[1.4] font-semibold text-primary">
              {content.location}
            </p>
            <p className="m-0 mt-4 text-[clamp(1rem,1.25vw,1.125rem)] leading-[1.4] font-semibold text-primary">
              {content.phone}
            </p>
            <p className="m-0 mt-4 break-words text-[clamp(1rem,1.25vw,1.125rem)] leading-[1.4] font-semibold text-primary">
              {content.email}
            </p>
            <nav className="mt-6" aria-label="Primary">
              <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 text-[0.9375rem] font-medium text-text-dark">
                {navLinks.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <a
                      href={link.href}
                      className="inline-flex items-center py-1.5 text-[0.9375rem] font-medium text-inherit no-underline transition-opacity hover:opacity-85"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-text-dark/10 pt-5 text-sm text-paragraph-gray sm:text-[1rem]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="m-0 max-w-[46rem]">{content.copyright}</p>
            <div className="flex flex-col items-start gap-3 sm:items-end">
              <p className="m-0 text-left sm:text-right">{content.credit}</p>
              <a
                className="inline-flex items-center justify-center rounded-full border border-text-dark/15 bg-white px-[1.35rem] py-2.5 text-[0.9375rem] font-semibold text-text-dark no-underline transition-colors hover:bg-creamy focus-visible:bg-creamy"
                href="/admin/login"
              >
                Admin
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

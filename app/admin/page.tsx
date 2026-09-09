import { redirect } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";
import AdminEditor from "@/components/admin/AdminEditor";
import { getAdminSession } from "@/lib/auth";
import { getSiteContent } from "@/lib/cms/store";
import { CONTENT_SECTIONS, type ContentSection } from "@/lib/cms/types";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  if (!(await getAdminSession())) {
    redirect("/admin/login");
  }

  const content = await getSiteContent();
  const params = await searchParams;
  const initialSection = CONTENT_SECTIONS.some((item) => item.id === params.section)
    ? (params.section as ContentSection)
    : undefined;

  return (
    <main className="page-gutter mx-auto w-full min-w-0 max-w-[1100px] pt-16 pb-16">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-3 inline-flex rounded-full bg-white px-4 py-1.5 text-[0.75rem] font-semibold text-primary shadow-[0_1px_2px_rgb(0_0_0/0.06)]">
            Content
          </p>
          <h1 className="text-[clamp(2rem,4vw,3rem)] leading-[1.1] font-bold tracking-[-0.03em]">
            Landing page editor
          </h1>
          <p className="mt-3 max-w-[36rem] text-[1rem] text-paragraph-gray">
            Change the copy and images for each homepage section. Saved updates appear on the
            public site immediately.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-text-dark shadow-[0_1px_4px_rgb(0_0_0/0.08)]"
          >
            View site
          </a>
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center rounded-full border border-text-dark/10 px-4 py-2 text-sm font-semibold text-text-dark"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>
      <AdminEditor initialContent={content} initialSection={initialSection} />
    </main>
  );
}

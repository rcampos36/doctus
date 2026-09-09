import type { SiteContent } from "@/lib/cms/types";

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="m-0 mb-8 list-none space-y-3.5 p-0">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 text-[15px] leading-[1.4] font-semibold text-text-dark sm:text-[16px] sm:leading-[1.35]"
        >
          <span className="mt-1 shrink-0 text-primary" aria-hidden="true">
            ✓
          </span>
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Services({ content }: { content: SiteContent["services"] }) {
  const notes = content.expectNotes.split(/\n+/).filter(Boolean);

  return (
    <section
      id="services"
      className="services-section page-gutter overflow-x-clip bg-light-bg py-[clamp(3rem,8vw,5rem)] text-text-dark"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-[1300px]">
        <header className="relative mx-auto mb-[clamp(2rem,5vw,3.5rem)] max-w-[52rem] text-center">
          <p className="mb-4 inline-flex rounded-full bg-white px-4 py-1.5 text-[0.75rem] font-semibold text-primary shadow-[0_1px_2px_rgb(0_0_0/0.06)]">
            {content.badge}
          </p>
          <h2
            id="services-heading"
            className="mx-auto max-w-[44rem] text-[clamp(1.875rem,5vw,2.5rem)] leading-[1.12] font-bold tracking-[-0.03em] text-text-dark"
          >
            {content.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[42rem] text-[clamp(1rem,3.2vw,1.125rem)] leading-[1.45] tracking-[-0.01em] text-paragraph-gray">
            {content.subtitle}
          </p>
        </header>

        <div className="services-panel flex flex-col gap-6 rounded-[1.5rem] lg:flex-row lg:items-stretch">
          <article className="services-card order-2 w-full min-w-0 rounded-[1.5rem] bg-light-bg p-[clamp(1rem,2.2vw,2rem)] lg:order-1 lg:w-[40%]">
            <img className="mb-5 h-11 w-auto" src={content.idealIcon} alt="" />
            <h3 className="mb-3 text-[clamp(1.5rem,4.5vw,2.35rem)] leading-[1.12] font-bold tracking-[-0.02em] text-text-dark">
              {content.idealTitle}
            </h3>
            <CheckList items={content.idealItems} />
          </article>

          <div className="services-image relative order-1 min-w-0 overflow-hidden rounded-[1.25rem] lg:order-2 lg:w-[60%] lg:overflow-visible">
            <div className="image-grow-frame overflow-hidden rounded-[1.25rem] bg-[#d7d5d2]">
              <img
                className="image-grow block h-full min-h-[16rem] w-full object-cover object-center sm:min-h-[22rem] lg:min-h-[30rem]"
                src={content.idealImage}
                alt={content.title}
              />
            </div>
            {content.highlightImage ? (
              <img
                className="image-grow absolute bottom-2 left-2 z-20 h-24 w-auto max-w-[42%] sm:bottom-3 sm:left-3 sm:h-36 lg:bottom-4 lg:-left-24 lg:h-56 lg:max-w-none"
                src={content.highlightImage}
                alt=""
              />
            ) : null}
          </div>
        </div>

        <div className="services-panel mt-16 flex flex-col gap-6 rounded-[1.5rem] sm:mt-24 lg:mt-36 lg:flex-row lg:items-stretch">
          <div className="services-image relative order-1 min-w-0 overflow-hidden rounded-[1.25rem] lg:w-[60%]">
            <div className="image-grow-frame overflow-hidden rounded-[1.25rem] bg-[#d7d5d2]">
              <img
                className="image-grow block h-full min-h-[16rem] w-full object-cover object-center sm:min-h-[22rem] lg:min-h-[30rem]"
                src={content.expectImage}
                alt={content.expectTitle}
              />
            </div>
          </div>

          <article className="services-card order-2 w-full min-w-0 rounded-[1.5rem] bg-light-bg p-[clamp(1rem,2.2vw,2rem)] lg:w-[40%]">
            <img className="mb-5 h-11 w-auto" src={content.expectIcon} alt="" />
            <h3 className="mb-3 text-[clamp(1.5rem,4.5vw,2.35rem)] leading-[1.12] font-bold tracking-[-0.02em] text-text-dark">
              {content.expectTitle}
            </h3>
            <div className="mb-10 max-w-[40ch] text-[clamp(1rem,1.55vw,1.25rem)] leading-[1.5] text-paragraph-gray">
              {notes.map((note, index) => (
                <p key={note} className={index > 0 ? "mt-4" : undefined}>
                  {note}
                </p>
              ))}
            </div>
            <CheckList items={content.expectItems} />
          </article>
        </div>
      </div>
    </section>
  );
}

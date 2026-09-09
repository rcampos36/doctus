"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/lib/cms/types";

export default function About({ content }: { content: SiteContent["about"] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1);
  const [slideWidth, setSlideWidth] = useState(0);
  const gap = 20;

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const nextPerView =
      window.matchMedia("(min-width: 1024px)").matches
        ? 3
        : window.matchMedia("(min-width: 768px)").matches
          ? 2
          : 1;
    const width = Math.max(0, (viewport.clientWidth - gap * (nextPerView - 1)) / nextPerView);
    setPerView(nextPerView);
    setSlideWidth(width);
    setIndex((current) => Math.min(current, Math.max(0, content.testimonials.length - nextPerView)));
  }, [content.testimonials.length]);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    window.addEventListener("orientationchange", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("orientationchange", measure);
    };
  }, [measure]);

  const maxIndex = Math.max(0, content.testimonials.length - perView);
  const offset = index * (slideWidth + gap);

  return (
    <section
      id="about"
      className="about-us-section page-gutter bg-white pt-[clamp(2.5rem,6vw,4rem)] pb-[clamp(3rem,8vw,5rem)] text-text-dark"
      aria-label="About Us"
    >
      <div className="mx-auto min-w-0 max-w-[1300px]">
        <header className="mb-10 flex w-full min-w-0 flex-col gap-5 lg:mb-14 lg:gap-6">
          <p className="inline-flex self-start rounded-full bg-[#ebe8e2] px-4 py-1.5 text-[0.6875rem] font-semibold tracking-[0.12em] text-text-dark uppercase">
            {content.badge}
          </p>
        </header>

        <div className="about-us-panel image-grow-frame relative flex min-h-[20rem] flex-col overflow-hidden rounded-[1.5rem] bg-[#1a120e] p-3 shadow-[0_1px_0_rgb(0_0_0/0.04)] sm:min-h-[26rem] sm:rounded-[2rem] sm:p-5 md:min-h-[28rem] md:flex-row md:items-stretch md:gap-5 md:p-5 lg:min-h-[32rem] lg:gap-6 lg:p-6 xl:min-h-[34rem] xl:p-8">
          <div
            className="image-grow absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url('${content.backgroundImage}')`,
              backgroundPosition: "center right",
            }}
            aria-hidden="true"
          />
          <span className="sr-only">About Us</span>
          <div
            className="about-us-panel-spacer mb-4 min-h-[9rem] shrink-0 sm:mb-6 sm:min-h-[14rem] md:order-2 md:mb-0 md:min-h-0 md:flex-1"
            aria-hidden="true"
          />
          <div className="about-us-card relative z-10 order-2 flex min-h-0 w-full flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm sm:gap-6 sm:p-8 md:order-1 md:mt-0 md:w-1/2 md:max-w-none md:shrink-0 md:flex-row md:items-start md:self-stretch lg:gap-8">
            <div className="mt-auto flex min-w-0 flex-1 flex-col gap-3 text-[1.0625rem] leading-[1.55] font-normal text-text-dark sm:gap-4 sm:text-[1.25rem] lg:text-[1.5rem]">
              {content.paragraphs
                .filter((paragraph) => !/^\*+\s*ROGER:/i.test(paragraph.trim()))
                .map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
            </div>
            <div className="order-first shrink-0 md:order-none">
              <div className="image-grow-frame relative h-[7.25rem] w-[5rem] overflow-hidden rounded-lg border-2 border-white shadow-sm sm:h-[9.5rem] sm:w-28">
                <img
                  className="image-grow h-full w-full object-cover object-top"
                  src={content.headshot}
                  alt={content.headshotAlt}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="about-us-testimonials mt-[clamp(2.5rem,6vw,5rem)] w-full min-w-0">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8 lg:mb-10">
            <div className="min-w-0 max-w-[min(100%,36rem)] flex-1">
              <p className="mb-3 inline-flex rounded-full bg-white px-4 py-1.5 text-[0.8125rem] font-semibold text-primary shadow-[0_1px_0_rgb(0_0_0/0.06)] sm:mb-4">
                {content.testimonialsBadge}
              </p>
              <h3 className="m-0 text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.12] font-bold tracking-[-0.03em] text-text-dark">
                {content.testimonialsTitle}
              </h3>
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
              <button
                type="button"
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-0 bg-white text-text-dark shadow-[0_1px_4px_rgb(0_0_0/0.08)] transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-35 sm:h-11 sm:w-11"
                aria-label="Previous testimonials"
                disabled={index <= 0}
                onClick={() => setIndex((value) => Math.max(0, value - 1))}
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M10 3L5 8l5 5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-0 bg-white text-text-dark shadow-[0_1px_4px_rgb(0_0_0/0.08)] transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-35 sm:h-11 sm:w-11"
                aria-label="Next testimonials"
                disabled={index >= maxIndex}
                onClick={() => setIndex((value) => Math.min(maxIndex, value + 1))}
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M6 3l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="w-full min-w-0 overflow-hidden" ref={viewportRef}>
            <div
              ref={trackRef}
              className="flex"
              style={{
                gap,
                transform: `translate3d(-${offset}px, 0, 0)`,
                transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {content.testimonials.map((item) => (
                <div
                  key={item.name}
                  className="shrink-0"
                  style={{
                    width: slideWidth || "100%",
                    flexBasis: slideWidth || "100%",
                  }}
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-[1rem] bg-white shadow-[0_1px_0_rgb(0_0_0/0.04)] sm:rounded-[1.25rem]">
                    <blockquote className="m-0 flex flex-col p-5 sm:p-6">
                      <p className="m-0 text-[0.9375rem] leading-[1.55] font-normal text-text-dark sm:text-[16px]">
                        &quot;{item.quote}&quot;
                      </p>
                      <footer className="mt-3 text-[0.9375rem] leading-[1.45] text-text-dark sm:text-[16px]">
                        <strong className="font-semibold">{item.name}</strong>
                        <span className="text-paragraph-gray">, {item.role}</span>
                      </footer>
                    </blockquote>
                    <div className="image-grow-frame mt-auto overflow-hidden border-t border-black/[0.06] bg-[#d8d8d8]">
                      <img
                        className="image-grow block aspect-[3/2] h-full w-full object-cover object-center"
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

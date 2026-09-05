"use client";

import { useMemo, useState } from "react";
import { saveContentAction } from "@/app/actions/content";
import { Card, ImageField, TextAreaField, TextField } from "@/components/admin/fields";
import { CONTENT_SECTIONS, type ContentSection, type SiteContent } from "@/lib/cms/types";

type Props = {
  initialContent: SiteContent;
  initialSection?: ContentSection;
};

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function AdminEditor({ initialContent, initialSection }: Props) {
  const [content, setContent] = useState(initialContent);
  const [section, setSection] = useState<ContentSection>(initialSection || "header");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  const current = useMemo(
    () => CONTENT_SECTIONS.find((item) => item.id === section),
    [section],
  );

  async function save() {
    setStatus("saving");
    setError("");
    try {
      const saved = await saveContentAction(content);
      setContent(saved);
      setStatus("saved");
      window.setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not save.");
    }
  }

  return (
    <div className="grid min-w-0 gap-8 lg:grid-cols-[16rem_1fr]">
      <aside className="min-w-0 lg:sticky lg:top-8 lg:self-start">
        <nav className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 lg:flex-col lg:overflow-visible">
          {CONTENT_SECTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSection(item.id)}
              className={`shrink-0 rounded-xl px-3 py-2.5 text-left text-[0.9375rem] font-medium whitespace-nowrap transition-colors lg:w-full lg:whitespace-normal ${
                section === item.id
                  ? "bg-white text-text-dark shadow-[0_1px_4px_rgb(0_0_0/0.08)]"
                  : "text-paragraph-gray hover:bg-white/60 hover:text-text-dark"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <section className="rounded-[1.25rem] bg-white p-5 shadow-[0_1px_0_rgb(0_0_0/0.04)] sm:p-7">
        <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="mb-2 inline-flex rounded-full bg-[#ebe8e2] px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-text-dark uppercase">
              {current?.label}
            </p>
            <h2 className="text-[1.75rem] leading-tight font-bold tracking-[-0.03em]">
              Edit {current?.label}
            </h2>
            <p className="mt-2 text-sm text-paragraph-gray">{current?.description}</p>
          </div>
          <button
            type="button"
            onClick={() => void save()}
            disabled={status === "saving"}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-[0.9375rem] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {status === "saving" ? "Saving..." : status === "saved" ? "Saved" : "Save section"}
          </button>
        </header>
        {error ? (
          <p className="mb-4 rounded-xl bg-[#fef2f2] px-4 py-3 text-sm text-[#991b1b]">{error}</p>
        ) : null}

        {section === "header" ? (
          <div className="grid gap-4">
            <ImageField
              label="Logo"
              value={content.header.logo}
              onChange={(logo) => setContent((c) => ({ ...c, header: { ...c.header, logo } }))}
            />
            <TextField
              label="Logo alt text"
              value={content.header.logoAlt}
              onChange={(logoAlt) => setContent((c) => ({ ...c, header: { ...c.header, logoAlt } }))}
            />
            <TextField
              label="Button label"
              value={content.header.ctaLabel}
              onChange={(ctaLabel) =>
                setContent((c) => ({ ...c, header: { ...c.header, ctaLabel } }))
              }
            />
            <TextField
              label="Button link"
              value={content.header.ctaHref}
              onChange={(ctaHref) =>
                setContent((c) => ({ ...c, header: { ...c.header, ctaHref } }))
              }
            />
            {content.header.navLinks.map((link, index) => (
              <Card
                key={`${link.href}-${index}`}
                title={`Nav link ${index + 1}`}
                onRemove={() =>
                  setContent((c) => ({
                    ...c,
                    header: {
                      ...c.header,
                      navLinks: c.header.navLinks.filter((_, i) => i !== index),
                    },
                  }))
                }
              >
                <TextField
                  label="Label"
                  value={link.label}
                  onChange={(label) =>
                    setContent((c) => {
                      const navLinks = [...c.header.navLinks];
                      navLinks[index] = { ...navLinks[index], label };
                      return { ...c, header: { ...c.header, navLinks } };
                    })
                  }
                />
                <TextField
                  label="Link"
                  value={link.href}
                  onChange={(href) =>
                    setContent((c) => {
                      const navLinks = [...c.header.navLinks];
                      navLinks[index] = { ...navLinks[index], href };
                      return { ...c, header: { ...c.header, navLinks } };
                    })
                  }
                />
              </Card>
            ))}
            <button
              type="button"
              className="justify-self-start text-sm font-semibold text-primary"
              onClick={() =>
                setContent((c) => ({
                  ...c,
                  header: {
                    ...c.header,
                    navLinks: [...c.header.navLinks, { label: "New link", href: "#home" }],
                  },
                }))
              }
            >
              Add nav link
            </button>
          </div>
        ) : null}

        {section === "hero" ? (
          <div className="grid gap-4">
            <ImageField
              label="Background image"
              value={content.hero.backgroundImage}
              onChange={(backgroundImage) =>
                setContent((c) => ({ ...c, hero: { ...c.hero, backgroundImage } }))
              }
            />
            <TextField
              label="Heading"
              value={content.hero.heading}
              onChange={(heading) => setContent((c) => ({ ...c, hero: { ...c.hero, heading } }))}
            />
            <TextField
              label="Heading second line"
              value={content.hero.headingAccent}
              onChange={(headingAccent) =>
                setContent((c) => ({ ...c, hero: { ...c.hero, headingAccent } }))
              }
            />
            <TextAreaField
              label="Description"
              value={content.hero.description}
              onChange={(description) =>
                setContent((c) => ({ ...c, hero: { ...c.hero, description } }))
              }
            />
            <TextField
              label="Primary button"
              value={content.hero.primaryCta.label}
              onChange={(label) =>
                setContent((c) => ({
                  ...c,
                  hero: { ...c.hero, primaryCta: { ...c.hero.primaryCta, label } },
                }))
              }
            />
            <TextField
              label="Primary button link"
              value={content.hero.primaryCta.href}
              onChange={(href) =>
                setContent((c) => ({
                  ...c,
                  hero: { ...c.hero, primaryCta: { ...c.hero.primaryCta, href } },
                }))
              }
            />
            <TextField
              label="Secondary button"
              value={content.hero.secondaryCta.label}
              onChange={(label) =>
                setContent((c) => ({
                  ...c,
                  hero: { ...c.hero, secondaryCta: { ...c.hero.secondaryCta, label } },
                }))
              }
            />
            <TextField
              label="Secondary button link"
              value={content.hero.secondaryCta.href}
              onChange={(href) =>
                setContent((c) => ({
                  ...c,
                  hero: { ...c.hero, secondaryCta: { ...c.hero.secondaryCta, href } },
                }))
              }
            />
            {content.hero.cards.map((card, index) => (
              <Card
                key={`${card.title}-${index}`}
                title={`Feature card ${index + 1}`}
                onRemove={() =>
                  setContent((c) => ({
                    ...c,
                    hero: { ...c.hero, cards: c.hero.cards.filter((_, i) => i !== index) },
                  }))
                }
              >
                <ImageField
                  label="Icon"
                  value={card.icon}
                  onChange={(icon) =>
                    setContent((c) => {
                      const cards = [...c.hero.cards];
                      cards[index] = { ...cards[index], icon };
                      return { ...c, hero: { ...c.hero, cards } };
                    })
                  }
                />
                <TextField
                  label="Title"
                  value={card.title}
                  onChange={(title) =>
                    setContent((c) => {
                      const cards = [...c.hero.cards];
                      cards[index] = { ...cards[index], title };
                      return { ...c, hero: { ...c.hero, cards } };
                    })
                  }
                />
                <TextAreaField
                  label="Body"
                  value={card.body}
                  onChange={(body) =>
                    setContent((c) => {
                      const cards = [...c.hero.cards];
                      cards[index] = { ...cards[index], body };
                      return { ...c, hero: { ...c.hero, cards } };
                    })
                  }
                />
                <label className="flex items-center gap-2 text-sm text-text-dark">
                  <input
                    type="checkbox"
                    checked={Boolean(card.wide)}
                    onChange={(event) =>
                      setContent((c) => {
                        const cards = [...c.hero.cards];
                        cards[index] = { ...cards[index], wide: event.target.checked };
                        return { ...c, hero: { ...c.hero, cards } };
                      })
                    }
                  />
                  Full-width card
                </label>
              </Card>
            ))}
            <button
              type="button"
              className="justify-self-start text-sm font-semibold text-primary"
              onClick={() =>
                setContent((c) => ({
                  ...c,
                  hero: {
                    ...c.hero,
                    cards: [
                      ...c.hero.cards,
                      { icon: "/images/icon-chat.svg", title: "New card", body: "", wide: false },
                    ],
                  },
                }))
              }
            >
              Add feature card
            </button>
          </div>
        ) : null}

        {section === "services" ? (
          <div className="grid gap-4">
            <TextField
              label="Badge"
              value={content.services.badge}
              onChange={(badge) => setContent((c) => ({ ...c, services: { ...c.services, badge } }))}
            />
            <TextField
              label="Title"
              value={content.services.title}
              onChange={(title) => setContent((c) => ({ ...c, services: { ...c.services, title } }))}
            />
            <TextField
              label="Subtitle"
              value={content.services.subtitle}
              onChange={(subtitle) =>
                setContent((c) => ({ ...c, services: { ...c.services, subtitle } }))
              }
            />
            <TextField
              label="Ideal-for heading"
              value={content.services.idealTitle}
              onChange={(idealTitle) =>
                setContent((c) => ({ ...c, services: { ...c.services, idealTitle } }))
              }
            />
            <ImageField
              label="Ideal-for icon"
              value={content.services.idealIcon}
              onChange={(idealIcon) =>
                setContent((c) => ({ ...c, services: { ...c.services, idealIcon } }))
              }
            />
            <ImageField
              label="Ideal-for image"
              value={content.services.idealImage}
              onChange={(idealImage) =>
                setContent((c) => ({ ...c, services: { ...c.services, idealImage } }))
              }
            />
            <ImageField
              label="Highlight graphic"
              value={content.services.highlightImage}
              onChange={(highlightImage) =>
                setContent((c) => ({ ...c, services: { ...c.services, highlightImage } }))
              }
            />
            <TextAreaField
              label="Ideal-for list (one item per line)"
              rows={10}
              value={content.services.idealItems.join("\n")}
              onChange={(value) =>
                setContent((c) => ({
                  ...c,
                  services: {
                    ...c.services,
                    idealItems: value.split("\n").filter((item) => item.trim().length > 0),
                  },
                }))
              }
            />
            <TextField
              label="What to expect heading"
              value={content.services.expectTitle}
              onChange={(expectTitle) =>
                setContent((c) => ({ ...c, services: { ...c.services, expectTitle } }))
              }
            />
            <ImageField
              label="What to expect icon"
              value={content.services.expectIcon}
              onChange={(expectIcon) =>
                setContent((c) => ({ ...c, services: { ...c.services, expectIcon } }))
              }
            />
            <ImageField
              label="What to expect image"
              value={content.services.expectImage}
              onChange={(expectImage) =>
                setContent((c) => ({ ...c, services: { ...c.services, expectImage } }))
              }
            />
            <TextAreaField
              label="What to expect notes"
              value={content.services.expectNotes}
              onChange={(expectNotes) =>
                setContent((c) => ({ ...c, services: { ...c.services, expectNotes } }))
              }
            />
            <TextAreaField
              label="What to expect list (one item per line)"
              rows={12}
              value={content.services.expectItems.join("\n")}
              onChange={(value) =>
                setContent((c) => ({
                  ...c,
                  services: {
                    ...c.services,
                    expectItems: value.split("\n").filter((item) => item.trim().length > 0),
                  },
                }))
              }
            />
          </div>
        ) : null}

        {section === "mission" ? (
          <div className="grid gap-4">
            <TextField
              label="Badge"
              value={content.mission.badge}
              onChange={(badge) => setContent((c) => ({ ...c, mission: { ...c.mission, badge } }))}
            />
            <TextField
              label="Title"
              value={content.mission.title}
              onChange={(title) => setContent((c) => ({ ...c, mission: { ...c.mission, title } }))}
            />
            {content.mission.tabs.map((tab, index) => (
              <Card
                key={tab.id}
                title={`Tab ${index + 1}`}
                onRemove={() =>
                  setContent((c) => ({
                    ...c,
                    mission: { ...c.mission, tabs: c.mission.tabs.filter((_, i) => i !== index) },
                  }))
                }
              >
                <TextField
                  label="Label"
                  value={tab.label}
                  onChange={(label) =>
                    setContent((c) => {
                      const tabs = [...c.mission.tabs];
                      tabs[index] = { ...tabs[index], label };
                      return { ...c, mission: { ...c.mission, tabs } };
                    })
                  }
                />
                <TextAreaField
                  label="Heading"
                  value={tab.heading}
                  onChange={(heading) =>
                    setContent((c) => {
                      const tabs = [...c.mission.tabs];
                      tabs[index] = { ...tabs[index], heading };
                      return { ...c, mission: { ...c.mission, tabs } };
                    })
                  }
                />
                <TextAreaField
                  label="Extra line"
                  value={tab.extra || ""}
                  onChange={(extra) =>
                    setContent((c) => {
                      const tabs = [...c.mission.tabs];
                      tabs[index] = { ...tabs[index], extra };
                      return { ...c, mission: { ...c.mission, tabs } };
                    })
                  }
                />
                <ImageField
                  label="Image"
                  value={tab.image}
                  onChange={(image) =>
                    setContent((c) => {
                      const tabs = [...c.mission.tabs];
                      tabs[index] = { ...tabs[index], image };
                      return { ...c, mission: { ...c.mission, tabs } };
                    })
                  }
                />
                <TextField
                  label="Image alt text"
                  value={tab.alt}
                  onChange={(alt) =>
                    setContent((c) => {
                      const tabs = [...c.mission.tabs];
                      tabs[index] = { ...tabs[index], alt };
                      return { ...c, mission: { ...c.mission, tabs } };
                    })
                  }
                />
              </Card>
            ))}
            <button
              type="button"
              className="justify-self-start text-sm font-semibold text-primary"
              onClick={() =>
                setContent((c) => ({
                  ...c,
                  mission: {
                    ...c.mission,
                    tabs: [
                      ...c.mission.tabs,
                      {
                        id: uid("tab"),
                        label: "New tab",
                        heading: "",
                        extra: "",
                        image: "/images/mission.jpg",
                        alt: "",
                      },
                    ],
                  },
                }))
              }
            >
              Add tab
            </button>
          </div>
        ) : null}

        {section === "faq" ? (
          <div className="grid gap-4">
            <TextField
              label="Badge"
              value={content.faq.badge}
              onChange={(badge) => setContent((c) => ({ ...c, faq: { ...c.faq, badge } }))}
            />
            <TextAreaField
              label="Title"
              rows={2}
              value={content.faq.title}
              onChange={(title) => setContent((c) => ({ ...c, faq: { ...c.faq, title } }))}
            />
            {content.faq.items.map((item, index) => (
              <Card
                key={`${item.q}-${index}`}
                title={`Question ${index + 1}`}
                onRemove={() =>
                  setContent((c) => ({
                    ...c,
                    faq: { ...c.faq, items: c.faq.items.filter((_, i) => i !== index) },
                  }))
                }
              >
                <TextField
                  label="Question"
                  value={item.q}
                  onChange={(q) =>
                    setContent((c) => {
                      const items = [...c.faq.items];
                      items[index] = { ...items[index], q };
                      return { ...c, faq: { ...c.faq, items } };
                    })
                  }
                />
                <TextAreaField
                  label="Answer"
                  value={item.a}
                  onChange={(a) =>
                    setContent((c) => {
                      const items = [...c.faq.items];
                      items[index] = { ...items[index], a };
                      return { ...c, faq: { ...c.faq, items } };
                    })
                  }
                />
              </Card>
            ))}
            <button
              type="button"
              className="justify-self-start text-sm font-semibold text-primary"
              onClick={() =>
                setContent((c) => ({
                  ...c,
                  faq: { ...c.faq, items: [...c.faq.items, { q: "New question", a: "" }] },
                }))
              }
            >
              Add question
            </button>
          </div>
        ) : null}

        {section === "about" ? (
          <div className="grid gap-4">
            <TextField
              label="Badge"
              value={content.about.badge}
              onChange={(badge) => setContent((c) => ({ ...c, about: { ...c.about, badge } }))}
            />
            <ImageField
              label="Background image"
              value={content.about.backgroundImage}
              onChange={(backgroundImage) =>
                setContent((c) => ({ ...c, about: { ...c.about, backgroundImage } }))
              }
            />
            <ImageField
              label="Headshot"
              value={content.about.headshot}
              onChange={(headshot) =>
                setContent((c) => ({ ...c, about: { ...c.about, headshot } }))
              }
            />
            <TextField
              label="Headshot alt text"
              value={content.about.headshotAlt}
              onChange={(headshotAlt) =>
                setContent((c) => ({ ...c, about: { ...c.about, headshotAlt } }))
              }
            />
            <TextAreaField
              label="Bio paragraphs (separate with a blank line)"
              rows={12}
              value={content.about.paragraphs.join("\n\n")}
              onChange={(value) =>
                setContent((c) => ({
                  ...c,
                  about: {
                    ...c.about,
                    paragraphs: value
                      .split(/\n\s*\n/)
                      .map((item) => item.trim())
                      .filter(Boolean),
                  },
                }))
              }
            />
            <TextField
              label="Testimonials badge"
              value={content.about.testimonialsBadge}
              onChange={(testimonialsBadge) =>
                setContent((c) => ({ ...c, about: { ...c.about, testimonialsBadge } }))
              }
            />
            <TextField
              label="Testimonials title"
              value={content.about.testimonialsTitle}
              onChange={(testimonialsTitle) =>
                setContent((c) => ({ ...c, about: { ...c.about, testimonialsTitle } }))
              }
            />
            {content.about.testimonials.map((item, index) => (
              <Card
                key={`${item.name}-${index}`}
                title={`Testimonial ${index + 1}`}
                onRemove={() =>
                  setContent((c) => ({
                    ...c,
                    about: {
                      ...c.about,
                      testimonials: c.about.testimonials.filter((_, i) => i !== index),
                    },
                  }))
                }
              >
                <TextAreaField
                  label="Quote"
                  value={item.quote}
                  onChange={(quote) =>
                    setContent((c) => {
                      const testimonials = [...c.about.testimonials];
                      testimonials[index] = { ...testimonials[index], quote };
                      return { ...c, about: { ...c.about, testimonials } };
                    })
                  }
                />
                <TextField
                  label="Name"
                  value={item.name}
                  onChange={(name) =>
                    setContent((c) => {
                      const testimonials = [...c.about.testimonials];
                      testimonials[index] = { ...testimonials[index], name };
                      return { ...c, about: { ...c.about, testimonials } };
                    })
                  }
                />
                <TextField
                  label="Role"
                  value={item.role}
                  onChange={(role) =>
                    setContent((c) => {
                      const testimonials = [...c.about.testimonials];
                      testimonials[index] = { ...testimonials[index], role };
                      return { ...c, about: { ...c.about, testimonials } };
                    })
                  }
                />
                <ImageField
                  label="Image"
                  value={item.image}
                  onChange={(image) =>
                    setContent((c) => {
                      const testimonials = [...c.about.testimonials];
                      testimonials[index] = { ...testimonials[index], image };
                      return { ...c, about: { ...c.about, testimonials } };
                    })
                  }
                />
              </Card>
            ))}
            <button
              type="button"
              className="justify-self-start text-sm font-semibold text-primary"
              onClick={() =>
                setContent((c) => ({
                  ...c,
                  about: {
                    ...c.about,
                    testimonials: [
                      ...c.about.testimonials,
                      {
                        quote: "",
                        name: "New patient",
                        role: "Doctus patient",
                        image: "/images/services-doctor.jpg",
                      },
                    ],
                  },
                }))
              }
            >
              Add testimonial
            </button>
          </div>
        ) : null}

        {section === "footer" ? (
          <div className="grid gap-4">
            <ImageField
              label="Logo"
              value={content.footer.logo}
              onChange={(logo) => setContent((c) => ({ ...c, footer: { ...c.footer, logo } }))}
            />
            <TextField
              label="Instagram URL"
              value={content.footer.instagramUrl}
              onChange={(instagramUrl) =>
                setContent((c) => ({ ...c, footer: { ...c.footer, instagramUrl } }))
              }
            />
            <ImageField
              label="Instagram icon"
              value={content.footer.instagramIcon}
              onChange={(instagramIcon) =>
                setContent((c) => ({ ...c, footer: { ...c.footer, instagramIcon } }))
              }
            />
            <TextField
              label="Form eyebrow"
              value={content.footer.formEyebrow}
              onChange={(formEyebrow) =>
                setContent((c) => ({ ...c, footer: { ...c.footer, formEyebrow } }))
              }
            />
            <TextField
              label="Success message"
              value={content.footer.successMessage}
              onChange={(successMessage) =>
                setContent((c) => ({ ...c, footer: { ...c.footer, successMessage } }))
              }
            />
            <TextAreaField
              label="Tagline"
              rows={2}
              value={content.footer.heading}
              onChange={(heading) =>
                setContent((c) => ({ ...c, footer: { ...c.footer, heading } }))
              }
            />
            <TextAreaField
              label="Location"
              value={content.footer.location}
              onChange={(location) =>
                setContent((c) => ({ ...c, footer: { ...c.footer, location } }))
              }
            />
            <TextField
              label="Phone"
              value={content.footer.phone}
              onChange={(phone) => setContent((c) => ({ ...c, footer: { ...c.footer, phone } }))}
            />
            <TextField
              label="Email"
              value={content.footer.email}
              onChange={(email) => setContent((c) => ({ ...c, footer: { ...c.footer, email } }))}
            />
            <TextAreaField
              label="Copyright"
              value={content.footer.copyright}
              onChange={(copyright) =>
                setContent((c) => ({ ...c, footer: { ...c.footer, copyright } }))
              }
            />
            <TextField
              label="Credit"
              value={content.footer.credit}
              onChange={(credit) => setContent((c) => ({ ...c, footer: { ...c.footer, credit } }))}
            />
          </div>
        ) : null}
      </section>
    </div>
  );
}

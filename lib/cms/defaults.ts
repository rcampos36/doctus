import type { SiteContent } from "@/lib/cms/types";
import {
  expectItems,
  faqs,
  heroCards,
  idealFor,
  missionTabs,
  navLinks,
  testimonials,
} from "@/lib/content";

export const defaultSiteContent: SiteContent = {
  header: {
    logo: "/images/logo.png",
    logoAlt: "Doctus",
    ctaLabel: "Contact Us",
    ctaHref: "#contact",
    navLinks: navLinks.map((link) => ({ href: link.href, label: link.label })),
  },
  hero: {
    backgroundImage: "/images/hero-hands.jpg",
    heading: "Welcome to Doctus.",
    headingAccent: "More Minds...Better Medicine.",
    description:
      "Independent medical second opinions combining evidence-based medicine with a root-cause approach.",
    primaryCta: { label: "Schedule A Consultation", href: "#contact" },
    secondaryCta: { label: "How It Works", href: "#services" },
    cards: heroCards.map((card) => ({
      icon: card.icon,
      title: card.title,
      body: card.body,
      wide: "wide" in card ? card.wide : false,
    })),
  },
  services: {
    badge: "Services",
    title: "Is Doctus for Me?",
    subtitle: "Health Questions Are Complicated, We Bring Clarity",
    idealIcon: "/images/icon-care-dark.svg",
    idealTitle: "Doctus is ideal if you:",
    idealImage: "/images/services-doctor.jpg",
    highlightImage: "/images/highlight.svg",
    idealItems: [...idealFor],
    expectIcon: "/images/icon-cheer.svg",
    expectTitle: "What to Expect with the Doctus Experience",
    expectImage: "/images/services-consult.jpg",
    expectNotes:
      '*Not all services listed are included in all plans. Click the "Doctus Pricing Plans" for more details\n\n**Note: CAN WE MAKE THIS STATEMENT A DISCLAIMER SOMEWHERE?? In some instances, patients are responsible for the cost of labs and supplements. **NOTE 2: We may need a similar section like this to outline the payment plans themselves???',
    expectItems: [...expectItems],
  },
  mission: {
    badge: "The Mission",
    title: "More Minds...Better Medicine.",
    tabs: missionTabs.map((tab) => ({
      id: tab.id,
      label: tab.label,
      heading: tab.heading,
      extra: "extra" in tab ? tab.extra : "",
      image: tab.image,
      alt: tab.alt,
    })),
  },
  faq: {
    badge: "FAQ",
    title: "Frequently asked\nquestions",
    items: faqs.map((item) => ({ q: item.q, a: item.a })),
  },
  about: {
    badge: "About Us",
    backgroundImage: "/images/hero-hands.jpg",
    headshot: "/images/gelrud-headshot.jpeg",
    headshotAlt: "Dr. Adam Gelrud",
    paragraphs: [
      "**ROGER: can we move the picture to be on the right side and then the card body copy on the left?",
      "Who Is Dr. Adam Gelrud?",
      'Board-certified in Internal Medicine and a four-time "Top Doc" recipient, I have spent more than 22 years caring for patients throughout the Richmond area in both hospital and outpatient settings. My passion is helping patients understand complex medical conditions by translating complicated information into clear, practical guidance that empowers them to make informed decisions.',
      "I created Doctus because I believe every patient's health deserves a second look. Simply put:",
      "More Minds...Better Medicine.",
    ],
    testimonialsBadge: "Testimonials",
    testimonialsTitle: "What our people say",
    testimonials: testimonials.map((item) => ({ ...item })),
  },
  footer: {
    logo: "/images/logo.png",
    instagramUrl: "https://www.instagram.com/doctushc?utm_source=qr",
    instagramIcon: "/images/instagram.png",
    formEyebrow: "Get in touch",
    formTitle: "Contact Me",
    successMessage: "Thank you. Your message has been received.",
    heading: "More Minds...\nBetter Medicine.",
    location:
      "Home or virtual consultations by appointment in and around Richmond, Virginia",
    phone: "(804) 299-4779",
    email: "doctushealthcareconsulting@gmail.com",
    copyright:
      "© Doctus. All Rights Reserved. Licensing. Doctus is a private consultation practice and is not a substitute for emergency medical care. If you are experiencing a medical emergency, call 911.",
    credit: "Template by: rcdev.me",
  },
};

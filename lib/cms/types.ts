export type NavLink = {
  href: string;
  label: string;
};

export type Cta = {
  label: string;
  href: string;
};

export type HeroCard = {
  icon: string;
  title: string;
  body: string;
  wide?: boolean;
};

export type MissionTab = {
  id: string;
  label: string;
  heading: string;
  extra?: string;
  image: string;
  alt: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  image: string;
};

export type PricingPlan = {
  name: string;
  price: string;
  period: string;
  features: string[];
};

export type SiteContent = {
  header: {
    logo: string;
    logoAlt: string;
    ctaLabel: string;
    ctaHref: string;
    navLinks: NavLink[];
  };
  hero: {
    backgroundImage: string;
    heading: string;
    headingAccent: string;
    description: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    cards: HeroCard[];
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    idealIcon: string;
    idealTitle: string;
    idealImage: string;
    highlightImage: string;
    idealItems: string[];
    expectIcon: string;
    expectTitle: string;
    expectImage: string;
    expectNotes: string;
    expectItems: string[];
  };
  mission: {
    badge: string;
    title: string;
    tabs: MissionTab[];
  };
  faq: {
    badge: string;
    title: string;
    items: FaqItem[];
  };
  about: {
    badge: string;
    backgroundImage: string;
    headshot: string;
    headshotAlt: string;
    paragraphs: string[];
    testimonialsBadge: string;
    testimonialsTitle: string;
    testimonials: Testimonial[];
  };
  plans: {
    badge: string;
    title: string;
    plans: PricingPlan[];
  };
  footer: {
    logo: string;
    instagramUrl: string;
    instagramIcon: string;
    formEyebrow: string;
    formTitle: string;
    successMessage: string;
    heading: string;
    location: string;
    phone: string;
    email: string;
    copyright: string;
    credit: string;
  };
};

export type ContentSection = keyof SiteContent;

export const CONTENT_SECTIONS: { id: ContentSection; label: string; description: string }[] = [
  { id: "header", label: "Header", description: "Logo, navigation, and contact button" },
  { id: "hero", label: "Hero", description: "Homepage headline, buttons, and feature cards" },
  { id: "services", label: "Services", description: "Ideal-for list and what to expect" },
  { id: "mission", label: "Mission", description: "Mission, vision, and bottom line tabs" },
  { id: "faq", label: "FAQ", description: "Frequently asked questions" },
  { id: "about", label: "About", description: "Doctor bio and testimonials" },
  { id: "plans", label: "Plans", description: "Monthly pay plans and included features" },
  { id: "footer", label: "Footer", description: "Contact form copy and site details" },
];

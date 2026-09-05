export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact Us" },
] as const;

export const heroCards = [
  {
    icon: "/images/icon-chat.svg",
    title: "Independent Medical Second Opinion.",
    body: "Your health deserves another perspective. A Doctus physician provides an independent review of your diagnosis, treatment plan, and care options. We help you better understand your health so you can make informed, confident decisions with your healthcare team.",
    titleClass: "text-xl",
    iconClass: "mb-4 h-8 w-8",
  },
  {
    icon: "/images/icon-lightbulb.svg",
    title: "Root-Cause, Integrative Approach.",
    body: "Looking beyond symptoms, we examine how your medical history, lifestyle, nutrition, environment, and underlying biology fit together. Our goal is to identify the factors that may be contributing to your condition and uncover opportunities for better health.",
    titleClass: "text-xl",
    iconClass: "mb-4 h-8 w-8",
  },
  {
    icon: "/images/icon-care.svg",
    title: "Personalized Care.",
    body: "No two patients are alike. Every consultation is tailored to your unique health story, concerns, and goals, resulting in recommendations that are practical, evidence-based, and designed specifically for you.",
    titleClass: "text-2xl",
    iconClass: "mb-5 h-9 w-9",
    wide: true,
  },
] as const;

export const idealFor = [
  "Want to better understand your health",
  "Have ongoing health concerns without clear answers",
  "Want a personalized, proactive approach to wellness",
  "Prefer one-on-one guidance and support",
  "Would like advanced laboratory evaluations, or laboratory interpretations",
  "Have a loved one you want evaluated due to a health crisis, concerns, or chronic medical illness",
  "Are frustrated that your treatment is not working, causing side effects, or there are multiple options and unsure where to start",
  "Are confronted with a major or high-risk decision and want reassurance before proceeding",
  "Are facing a new diagnosis and unsure of the next steps",
  "...And More!",
];

export const expectItems = [
  "Discovery Call",
  "Initial in-person consultation with a Doctus Physician",
  "Full review of your health history and lab history",
  'Creation of a personalized health plan and "Roadmap"',
  'In-person plan review / "Note Reveal" of the personalized health roadmap',
  "Lab ordering guidance followed by detailed lab interpretation once completed",
  "Updates to your health plan",
  "Advocacy and navigation when needed",
  "In-depth monitoring and comprehensive support",
  "Communications with other healthcare providers when indicated",
  "Supplement guidance when appropriate",
];

export const missionTabs = [
  {
    id: "mission",
    label: "Our Mission",
    heading:
      "To provide independent, evidence-based medical second opinions that distill complex illnesses into clear, actionable insights.",
    image: "/images/mission.jpg",
    alt: "Our Mission",
  },
  {
    id: "vision",
    label: "Our Vision",
    heading:
      "To be the trusted partner for patients and their treating clinicians in navigating complex medical decisions.",
    image: "/images/services-consult.jpg",
    alt: "Our Vision",
  },
  {
    id: "bottom-line",
    label: "The Bottom Line",
    heading:
      "Doctus brings clarity to your health and treatment options so you can make confident decisions with your healthcare team.",
    extra: "Simply put, your health is too important to navigate alone.",
    image: "/images/bottom-line.jpg",
    alt: "The Bottom Line",
  },
] as const;

export const faqs = [
  {
    q: "Are you going to take the place of my current Primary Care Provider?",
    a: "Doctus does not replace your primary care doctor or specialist team. We are physicians who provide independent second opinions. We help explain complex medical problems and treatment options. We work alongside your doctors to help you better understand your health and make more confident decisions.",
  },
  {
    q: "What exactly is a medical second opinion with a root-cause approach?",
    a: "A medical second opinion is when a physician outside your current care team independently reviews your diagnosis and treatment plan. At Doctus, we take that a step further by looking beyond your diagnosis to understand why you may be experiencing your health concerns. We evaluate how your medical history, lifestyle, nutrition, environment, and underlying biology fit together to identify contributors that may have been overlooked. Our goal is to provide clear, evidence-based recommendations that help you better understand your health and your options.",
  },
  {
    q: "How is a second opinion different from a regular doctor visit?",
    a: "Unlike a typical clinic visit, a second opinion focuses on review and synthesis. We interpret your records, test results, and imaging in the context of current medical evidence to evaluate your diagnosis and treatment plan.",
  },
  {
    q: "What scenarios could trigger one to consider a consultation from Doctus?",
    a: "• You are unsure about your diagnosis or whether it is correct\n• Your symptoms are not improving with current treatment\n• You are considering surgery or multiple treatment options\n• You have a complex, rare, or serious condition\n• You were told there are no further treatment options\n• You want a clearer understanding of your condition or prognosis\n• You are seeking confirmation or clarification of a treatment plan\n• You want to better understand risks, benefits, and alternatives",
  },
  {
    q: "How does payment actually work?",
    a: "We offer several service models depending on your needs, including hourly consultations and longer-term care programs (6- and 12-month options).\nPayment is due prior to completion of the consultation and delivery of recommendations.",
  },
  {
    q: "What forms of payment do you accept?",
    a: "We accept cash, electronic bank transfers, Zelle, and personal checks.",
  },
  {
    q: "What if I just need help understanding my diagnosis or results?",
    a: "For patients seeking education and clarity around a diagnosis, test result, or treatment plan, we offer hourly consultations focused on explanation and understanding. You can select this option when booking.",
  },
  {
    q: "Do you offer ongoing support?",
    a: "Yes. Patients or families who prefer ongoing access to Doctus physicians can enroll in a retainer model over six or twelve months, which provides continuity, follow-up, and priority scheduling at a preferred rate.",
  },
  {
    q: "Is there a cost to submit my information or records?",
    a: "No. You will only be billed once a physician begins your review and consultation process. All medical data is stored and transmitted using HIPAA-compliant, encrypted systems.",
  },
  {
    q: "What information do I need to provide?",
    a: "You’ll upload or share your medical records, imaging, lab results, and any relevant history. The more complete your submission, the more accurate and useful your second opinion will be.",
  },
  {
    q: "Do you offer in-person or virtual visits?",
    a: "We do not operate a clinic. Consultations are conducted in your home or virtually, depending on your preference and clinical needs. In-home visits are our preferred model for the most comprehensive evaluation.",
  },
  {
    q: "Why do you provide in-home consultations?",
    a: "In-home visits allow us to better understand the full context of your health including your environment, daily routines, and real-world challenges. This context is an important part of our root-cause approach, helping us identify factors that may be contributing to your condition and develop a more complete clinical understanding.",
  },
  {
    q: "Can you prescribe medications or order tests?",
    a: "Doctus is not a replacement for your primary care or specialist providers. We focus on interpretation, education, and evidence-based recommendations. In select cases, and when clinically appropriate, we may provide prescriptions or order testing as part of your care plan.",
  },
  {
    q: "Will Doctus contact my current doctor?",
    a: "Only if you request it. Many patients prefer an independent review, while others appreciate a collaborative approach. The choice is entirely yours.",
  },
  {
    q: "How long does the process take?",
    a: "Most opinions are completed within 3–5 business days to include the interview between you and the provider. Complex cases may take longer — we’ll always update you on timelines.",
  },
  {
    q: "What if the Doctus opinion agrees with my original diagnosis?",
    a: "That’s good news. Our goal is to independently review your data and provide clarity on your diagnosis and treatment plan. When we agree with your original diagnosis, it reinforces confidence in your care plan. If differences arise, we explain them clearly and support our recommendations with evidence.",
  },
  {
    q: "What happens after I receive my Doctus opinion?",
    a: "You’ll receive a written summary and the option to schedule a follow-up discussion to review findings, next steps, or questions to bring to your treating physician.",
  },
  {
    q: "Can Doctus help coordinate next steps?",
    a: "We provide guidance and education to help you discuss findings with your current care team, but we do not directly coordinate care or referrals at this time.",
  },
];

export const testimonials = [
  {
    quote:
      "Speak on functional, quality of care, integrative approach, being spouse of patient turned patient.",
    name: "Michael P.",
    role: "Doctus patient",
    image: "/images/services-doctor.jpg",
  },
  {
    quote: "comment on functional medicine and converting husband as patient as well.",
    name: "Marsha R.",
    role: "Doctus patient",
    image: "/images/services-consult.jpg",
  },
  {
    quote: "Spouse of integrative care second opinion patient.",
    name: "Allison",
    role: "Spouse of a Doctus patient",
    image: "/images/testimonial-allison.png",
  },
  {
    quote:
      "Elderhaven has been a true blessing for our family. The care and attention they provide my mother have given us peace of mind, knowing she’s in capable, compassionate hands. Thank you for everything!",
    name: "Mike T.,",
    role: "Family of Resident",
    image: "/images/mission.jpg",
  },
];

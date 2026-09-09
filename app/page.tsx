import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Mission from "@/components/Mission";
import FAQ from "@/components/FAQ";
import About from "@/components/About";
import Plans from "@/components/Plans";
import Footer from "@/components/Footer";
import { getSiteContent } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getSiteContent();

  return (
    <div className="bg-light-bg text-text-dark">
      <div
        className="pointer-events-none fixed top-0 right-0 left-0 z-[60] border-t-4 border-t-primary"
        aria-hidden="true"
      />
      <a className="sr-only focus:not-sr-only" href="#main">
        Skip to content
      </a>
      <Header content={content.header} />
      <Hero content={content.hero} />
      <main id="main">
        <Services content={content.services} />
        <Mission content={content.mission} />
        <FAQ content={content.faq} />
        <About content={content.about} />
        <Plans content={content.plans} />
      </main>
      <Footer content={content.footer} navLinks={content.header.navLinks} />
    </div>
  );
}

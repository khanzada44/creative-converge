import HeroVideo from "../app/components/HeroVideo";
import AboutSection from "../app/components/AboutSection";
import ServicesSection from "../app/components/ServicesSection";
import ConsultationSection from "../app/components/ConsultationSection";
import TeamExperienceSection from "../app/components/TeamExperienceSection";
import WorldSection from "../app/components/WorldSection";
import WhyChooseUs from "../app/components/WhyChooseUs";
import OurPortfolio from "../app/components/OurPortfolio";

export default function Home() {
  return (
    <>
      <main>
        <HeroVideo />
        <AboutSection />
        <ServicesSection />
        <ConsultationSection />
        <TeamExperienceSection />
        <WorldSection />
        <WhyChooseUs />
        <OurPortfolio />
      </main>
    </>
  );
}

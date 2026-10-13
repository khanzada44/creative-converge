import HeroVideo from "../app/components/HeroVideo";
import AboutSection from "../app/components/AboutSection";
import ServicesSection from "../app/components/ServicesSection";
import ConsultationSection from "../app/components/ConsultationSection";
import TeamExperienceSection from "../app/components/TeamExperienceSection";
import WorldSection from "../app/components/WorldSection";
import WhyChooseUs from "../app/components/WhyChooseUs";
import OurPortfolio from "../app/components/OurPortfolio";
import PortfolioSection from "../app/components/PortfolioSection";
import BrandLogo from "../app/components/BrandLogo";
import BusinessPotentialSection from "../app/components/BusinessPotentialSection";
import ServicesPackagesSection from "../app/components/ServicesPackagesSection";
import HomePageServicesPackagesSection from "../app/components/HomePageServicesPackagesSection";

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
        <PortfolioSection />
        <BrandLogo />
        <BusinessPotentialSection />
        <ServicesPackagesSection />
        <HomePageServicesPackagesSection />
      </main>
    </>
  );
}

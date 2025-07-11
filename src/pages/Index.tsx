// src/pages/Index.jsx (or wherever your Index.jsx is)
import { useEffect } from "react";
// Navbar and Footer are removed from here
import HeroSection from "@/components/home/HeroSection";
import CertificationSection from "@/components/home/CertificationSection";
import LogoSlider from "@/components/home/LogoSlider";
import ImpactStatement from "@/components/home/ImpactStatement";
import SolutionsSection from "@/components/home/SolutionsSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialSection from "@/components/home/TestimonialSection";

const Index = () => {
  useEffect(() => {
    document.title = "Silver Talent | Recruitment Expert";
    
    const handleScroll = () => {
      const animateElements = document.querySelectorAll('.animate-on-scroll');
      animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150; // Adjust this threshold as needed
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('animated');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // The div with "flex flex-col min-h-screen" is now in Layout.jsx
    // Navbar and Footer are rendered by Layout.jsx
    <>
      {/* All your page-specific content goes directly here */}
      <HeroSection />
      <StatsSection />
      <LogoSlider />
      <ImpactStatement />
      <SolutionsSection />
      <CertificationSection />
      <TestimonialSection />
    </>
  );
};

export default Index;

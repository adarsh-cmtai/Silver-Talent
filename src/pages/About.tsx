import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/about/AboutHero";
import CompetitiveEdge from "@/components/about/CompetitiveEdge";
import WhyChooseUs from "@/components/about/WhyChooseUs";
// import OurServices from "@/components/about/OurServices";
import RecruitmentProcess from "@/components/about/RecruitmentProcess";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About Us | Silver Talent";
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {/* <Navbar /> */}
      <div className="pt-0">
        <AboutHero />
        <CompetitiveEdge />
        <WhyChooseUs />
        {/* <OurServices /> */}
        <RecruitmentProcess />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default About;

import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import SocialLinks from "@/components/contact/SocialLinks";

const Contact = () => {
  const location = useLocation();
  const formRef = useRef(null);

  useEffect(() => {
    if (location.state?.scrollToForm) {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
    document.title = "Contact Us | Silver Talent";
  }, [location.state]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* <Navbar /> */}
      <div className="pt-0">
        <ContactHeader />
        <ContactInfo />
        <div ref={formRef}>
          <ContactForm />
        </div>
        <SocialLinks />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Contact;
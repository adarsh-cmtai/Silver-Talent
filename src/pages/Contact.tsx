
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import SocialLinks from "@/components/contact/SocialLinks";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact Us | Silver Talent";
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {/* <Navbar /> */}
      <div className="pt-0">
        <ContactHeader />
        <ContactInfo />
        <ContactForm />
        <SocialLinks />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Contact;

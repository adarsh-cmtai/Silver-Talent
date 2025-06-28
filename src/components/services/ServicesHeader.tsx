
import { useEffect } from "react";

const ServicesHeader = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-royal-blue mb-6 animate-on-scroll">
          Our Recruitment Services
        </h1>
        <p className="text-lg text-gray-700 mb-6 animate-on-scroll" style={{ transitionDelay: "0.2s" }}>
          Discover our comprehensive range of services designed to meet your talent acquisition needs. From executive search to training & development, we provide end-to-end solutions to help your business thrive.
        </p>
        <div className="w-24 h-1 bg-mustard-gold mx-auto animate-on-scroll" style={{ transitionDelay: "0.3s" }}></div>
      </div>
    </section>
  );
};

export default ServicesHeader;

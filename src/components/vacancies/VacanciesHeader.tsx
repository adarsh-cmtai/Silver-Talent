
import { useEffect } from "react";

const VacanciesHeader = () => {
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
        <h1 className="text-4xl md:text-5xl font-bold text-deep-blue mb-6 animate-on-scroll">
          Current Vacancies
        </h1>
        <p className="text-lg text-text-medium mb-6 animate-on-scroll" style={{ transitionDelay: "0.2s" }}>
          Browse through our latest job openings and find the perfect opportunity to advance your career. Use the filters below to narrow down your search and discover roles that match your skills and aspirations.
        </p>
        <div className="w-24 h-1 bg-vibrant-gold mx-auto animate-on-scroll" style={{ transitionDelay: "0.3s" }}></div>
      </div>
    </section>
  );
};

export default VacanciesHeader;

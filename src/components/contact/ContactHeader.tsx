import { useEffect } from "react";
import { Link } from "react-router-dom";

const IllustrationPlaceholder = () => (
  <div className="w-full max-w-lg mx-auto">
    <img
      src="/image/Contact/image1.png"
      alt="Contact us illustration showing a support agent"
      className="w-full h-auto object-contain"
    />
  </div>
);

const ContactHeader = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
    elementsToAnimate.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elementsToAnimate.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section className="relative bg-white py-8 lg:py-8 overflow-hidden">
      <div
        className="absolute top-0 right-0 w-2/3 h-full bg-sky-50/70 -z-0"
        style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)" }}
        aria-hidden="true"
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight animate-on-scroll">
              Contact <span className="text-sky-600">Us</span>
            </h1>
            <div className="space-y-5 text-slate-600 text-lg leading-relaxed animate-on-scroll">
              <p>
                Get in touch to discuss how we can collaborate to find the right talent for your organization.
              </p>
              <p>
                Feel free to share any challenging requirements—our team is confident you’ll be impressed by the speed and quality of our recruitment solutions. We’re accessible across various channels to assist you with any questions.
              </p>
            </div>
            <div className="mt-10 animate-on-scroll">
              <Link to="/contact" state={{ scrollToForm: true }}>
              <button className="bg-[#0078D4] hover:bg-sky-700 text-[#fff] font-bold py-3 px-8 rounded-full text-base shadow-lg hover:shadow-xl shadow-sky-200 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sky-300">
                Contact Us
              </button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center items-center animate-on-scroll">
            <IllustrationPlaceholder />
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ContactHeader;

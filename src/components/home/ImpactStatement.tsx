import { useRef, useEffect } from "react";
import { Quote } from "lucide-react";

const ImpactStatement = () => {
  const statementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          statementRef.current?.classList.add("is-visible");
        }
      },
      { threshold: 0.2 }
    );

    const el = statementRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, []);

  return (
    <section className="relative bg-[#091e42] text-white py-20 md:py-28 overflow-hidden">
      {/* Subtle background grid pattern */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiPjxwYXRoIGQ9Ik0wIC41SDMybTAtMTZ2MzJNMTYgMFYzMiIvPjwvc3ZnPg==')]"
      ></div>

      <div className="relative container mx-auto px-4">
        <div
          ref={statementRef}
          className="animate-fade-in-up max-w-4xl mx-auto text-center flex flex-col items-center"
        >
          {/* <Quote className="w-16 h-16 text-sky-400/80 mb-6" /> */}
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
            Recruit <span className="text-sky-300">Leaders & High-performing Innovative Teams</span> Using Silver Talent Services
          </h2>
        </div>
      </div>

      <style>
        {`
          .animate-fade-in-up {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          }
          .animate-fade-in-up.is-visible {
            opacity: 1;
            transform: translateY(0);
          }
        `}
      </style>
    </section>
  );
};

export default ImpactStatement;
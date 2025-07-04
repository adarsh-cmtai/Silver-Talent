import { Award } from "lucide-react";
import { useEffect, useRef } from "react";

const CertificationSection = () => {
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated-badge");
            entry.target.classList.remove("opacity-0", "translate-y-5");
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentImageRef = imageRef.current;
    if (currentImageRef) {
      observer.observe(currentImageRef);
    }

    return () => {
      if (currentImageRef) {
        observer.unobserve(currentImageRef);
      }
    };
  }, []);

  return (
    <section className="py-8 md:py-8 bg-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-slate-800 flex items-center justify-center gap-4">
          Our Accreditations & Recognitions
          <Award className="w-16 h-16 text-[#006CB7]" />
        </h2>
        <div
          ref={imageRef}
          className="opacity-0 translate-y-5 transition-all duration-700 ease-out flex justify-center"
        >
          <img
            src="/image/Home/ISO.png"
            alt="Company Accreditations and Recognitions"
            className="w-full h-auto rounded-lg max-w-6xl"
          />
        </div>
      </div>
    </section>
  );
};

export default CertificationSection;

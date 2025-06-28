import { useEffect, useRef } from "react";
import { Award } from "lucide-react";

// Updated certification data with THEMED PLACEHOLDER IMAGES
const certificationsData = [
  {
    id: 1,
    altText: "11 Years of Excellence",
    // THEMED PLACEHOLDER - Dark blue background, Gold text
    image: "/image/Home/certificate2.jpg"
  },
  {
    id: 2,
    altText: "ISO 9001:2015 Certified Company",
    // THEMED PLACEHOLDER - Dark blue background, Gold text
    image: "/image/Home/certificate2.jpg"
  },
  {
    id: 3,
    altText: "Proud ERA Member",
    // THEMED PLACEHOLDER - Dark blue background, Gold text
    image: "/image/Home/certificate2.jpg"
  },
  {
    id: 4,
    altText: "Best Recruitment Consultancy",
    // THEMED PLACEHOLDER - Dark blue background, Gold text
    image: "/image/Home/certificate2.jpg"
  }
];

const CertificationSection = () => {
  const certificationsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    certificationsRef.current.forEach((cert) => {
      if (cert) observer.observe(cert);
    });

    return () => {
      certificationsRef.current.forEach((cert) => {
        if (cert) observer.unobserve(cert);
      });
    };
  }, []);

  return (
    <section className="py-16 md:py-11 bg-white"> {/* Section background remains white */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-slate-800 flex items-center justify-center gap-4">
          Our Accreditations & Recognitions
          <Award className="w-16 h-16 text-[#006CB7]" />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {certificationsData.map((cert, index) => (
            <div
              key={cert.id}
              ref={(el) => (certificationsRef.current[index] = el)}
              className="opacity-0 translate-y-5 transition-all duration-500 ease-out flex flex-col items-center text-center transform hover:scale-105"
            >
              <div className="w-36 h-36 md:w-44 md:h-44 p-1 rounded-full"> {/* Adjusted padding slightly */}
                <img
                  src={cert.image}
                  alt={cert.altText}
                  className="w-full h-full object-cover rounded-full shadow-2xl" // object-cover for placeholders
                />
              </div>
              {/* Text below the badge */}
              <h3 className="text-base md:text-lg font-medium text-slate-700 mt-3 px-2">
                {cert.altText}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationSection;
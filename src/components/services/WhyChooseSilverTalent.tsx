
import { useEffect } from "react";

const WhyChooseSilverTalent = () => {
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
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gradient-to-br from-royal-blue to-royal-blue/80 rounded-xl shadow-xl p-8 md:p-12 animate-on-scroll">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose Silver Talent</h2>
            <div className="w-16 h-1 bg-mustard-gold mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="text-mustard-gold text-xl">✓</span>
                  <p className="text-white text-lg">24-48 hour turnaround time</p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-mustard-gold text-xl">✓</span>
                  <p className="text-white text-lg">Process-driven approach</p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-mustard-gold text-xl">✓</span>
                  <p className="text-white text-lg">Industry experts with specialized knowledge</p>
                </li>
              </ul>
            </div>
            
            <div>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="text-mustard-gold text-xl">✓</span>
                  <p className="text-white text-lg">AI-enhanced candidate matching</p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-mustard-gold text-xl">✓</span>
                  <p className="text-white text-lg">Extensive talent network</p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-mustard-gold text-xl">✓</span>
                  <p className="text-white text-lg">Quality guarantee on placements</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSilverTalent;

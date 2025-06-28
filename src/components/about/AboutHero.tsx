import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div 
        className="h-full w-full bg-gradient-to-br from-sky-50 to-cyan-100"
          style={{
            WebkitClipPath: "path('M0 0 H calc(100% - 60px) Q 100% 50% calc(100% - 60px) 100% H 0 Z')",
            clipPath: "path('M0 0 H calc(100% - 60px) Q 100% 50% calc(100% - 60px) 100% H 0 Z')",
          }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-0 md:py-8">

          {/* Left Content Column */}
          <div className="animate-fade-in-left">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              About Silver Talent
            </h1>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              At Silver Talent, we pride ourselves on delivering both quality and speed in recruitment. Our average turnaround time for providing a high-quality shortlist is just 24 to 48 hr, depending on the role's complexity. With one of the largest and most refined candidate databases in the country, we offer unmatched access to top-tier, experienced professionals.
            </p>
            
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              We leverage proprietary assessment tools to create customized hiring solutions, significantly improving the chances of finding the right fit. Our domain-focused approach ensures targeted sourcing and successful placements.
            </p>
            
            <Button size="lg" className="group bg-sky-600 hover:bg-sky-700 text-white font-bold px-8 py-6 rounded-full shadow-lg hover:shadow-sky-300 transition-all duration-300 text-base">
              Learn More
              <MoveRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Right Image Column */}
          <div className="animate-fade-in-right">
            <div className="relative p-2 bg-white rounded-2xl">
              <img
                src="/image/about/about.png"
                alt="HR recruitment collaboration"
                className=" w-full h-auto max-h-[450px]"
              />
            </div>
          </div>

        </div>
      </div>
      <style>
        {`
          @keyframes fade-in-left {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-fade-in-left {
            animation: fade-in-left 0.8s ease-out forwards;
          }

          @keyframes fade-in-right {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-fade-in-right {
            animation: fade-in-right 0.8s ease-out 0.2s forwards;
            animation-fill-mode: backwards; 
          }
        `}
      </style>
    </section>
  );
};

export default AboutHero;
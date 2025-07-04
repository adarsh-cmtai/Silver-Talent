import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

const AboutHero = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br bg-white"
        style={{
          clipPath: "path('M0 0 H calc(100% - 120px) C calc(100% - 50px) 15%, 100% 40%, calc(100% - 80px) 100% H 0 Z')"
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center py-4 md:py-4">

          <div className="animate-fade-in-left">
            <p className="text-sm font-semibold text-indigo-700 uppercase tracking-wider mb-4">
              Who We Are
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
              About Silver Talent
            </h1>

            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
              At Silver Talent, we pride ourselves on delivering both quality and speed in recruitment. Our average turnaround time for providing a high-quality shortlist is just 24 to 48 hours, depending on the role's complexity.
            </p>

            <p className="text-lg text-slate-700 mb-10 leading-relaxed">
              With one of the largest and most refined candidate databases in the country, we leverage <b>AI</b> and <b>proprietary assessment tools</b> to create customized hiring solutions, ensuring targeted sourcing and successful placements.
            </p>

            <Link to="/contact" state={{ scrollToForm: true }}>
              <Button size="lg" className="group bg-[#042c60] hover:bg-sky-700 text-white font-bold px-8 py-2 rounded-xl shadow-lg shadow-sky-500/20 hover:shadow-xl hover:shadow-sky-500/30 transition-all duration-300 text-lg">
                Contact Us
                <MoveRight className="ml-3 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Button>
            </Link>
          </div>

          <div className="animate-fade-in-right">
            <div className="relative p-3 bg-white rounded-2xl shadow-slate-900/10">
              <img
                src="/image/Home/image1.png"
                alt="HR recruitment collaboration"
                className="w-full rounded-xl max-h-[500px] h-[450px] object-cover"
              />
            </div>
          </div>

        </div>
      </div>
      <style>
        {`
          @keyframes fade-in-left {
            from { opacity: 0; transform: translateX(-25px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-fade-in-left {
            animation: fade-in-left 1s ease-out forwards;
          }

          @keyframes fade-in-right {
            from { opacity: 0; transform: translateX(25px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-fade-in-right {
            animation: fade-in-right 1s ease-out 0.2s forwards;
            animation-fill-mode: backwards;
          }
        `}
      </style>
    </section>
  );
};

export default AboutHero;
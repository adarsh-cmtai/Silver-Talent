import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react"; // A popular icon library, replace if you use another

const HeroSection = () => {
  const illustrationUrl = "/image/Home/image1.png";

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Decorative Background Shape with a subtle gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-full lg:w-[55%]"
      >
        <div
          className="h-full w-full bg-gradient-to-br bg-white"
          style={{
            WebkitClipPath: "path('M0 0 H calc(100% - 60px) Q 100% 50% calc(100% - 60px) 100% H 0 Z')",
            clipPath: "path('M0 0 H calc(100% - 60px) Q 100% 50% calc(100% - 60px) 100% H 0 Z')",
          }}
        ></div>

      </div>

      <div className="relative container mx-auto px-6 pt-8 pb-20 md:pt-8 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16 items-center">

          {/* Left Column: Text Content */}
          <div className="z-10 text-center lg:text-left animate-fade-in">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Talent Acquisition, Redefined
            </p>

            <h1 className="text-4xl md:text-5xl xl:text-[3.4rem] font-bold text-slate-900 tracking-tight leading-tight mb-6">
              Specialists in Acquiring the Best Talent
            </h1>

            <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 mb-12">
              Your trusted partner in shaping business expansion. We deliver tailor-made hiring solutions to build strong, effective teams for India's leading companies.
              Partner with India’s Leading Recruitment Firm to Build Strong Teams.
            </p>

            <Button
              asChild
              size="lg"
              className="inline-flex items-center gap-2 h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base rounded-lg shadow-lg hover:shadow-indigo-500/40 transition-all duration-300"
            >
              <Link to="/contact">
                Learn More
                <MoveRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Right Column: Image */}
          <div className="relative flex justify-center lg:justify-end animate-slide-in-right">
            <img
              src={illustrationUrl}
              alt="Team collaborating on business growth charts"
              className="w-full max-w-md lg:max-w-none"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
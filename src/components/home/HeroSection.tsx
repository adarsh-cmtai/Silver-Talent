import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";

const HeroSection = () => {
  const illustrationUrl = "/image/image1.png";

  return (
    <section className="relative bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative grid grid-cols-1 lg:grid-cols-6 items-center gap-12 lg:gap-16 py-8 lg:py-8 ">

          <div className="lg:col-span-3 z-10 text-center lg:text-left">
            <div className="inline-block bg-indigo-100 text-[#042c60] font-semibold py-1 px-3 rounded-full text-sm mb-5">
              Talent Acquisition, Redefined
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tighter mb-6">
              We Specialists at acquiring the best talent for your business
            </h1>

            <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 mb-10">
              India’s leading tailor-made solutions for hiring, and your trusted talent partner in shaping business expansion.
              Partner with India’s Leading Recruitment Firm to Build Strong Teams.

            </p>

            <Button
              asChild
              size="lg"
              className="inline-flex items-center gap-2.5 h-12 px-8 bg-[#042c60] hover:bg-indigo-700 text-white font-bold text-base rounded-lg shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Link to="/contact">
                Contact Us
                <MoveRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="lg:col-span-3 relative flex justify-center lg:justify-end">
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-sky-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            <img
              src={illustrationUrl}
              alt="Team collaborating on business growth"
              className="relative w-full max-w-md lg:max-w-none drop-shadow-2xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

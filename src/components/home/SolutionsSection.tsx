import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface Solution {
  id: number;
  serviceId: string;
  icon: string;
  title: string;
  description: string;
}

const solutions: Solution[] = [
  {
    id: 1,
    serviceId: "recruitment-services",
    icon: "/image/Home/recruitement.png",
    title: "Recruitment Services",
    description:
      "Streamline your hiring process with Silver Talent's expert recruitment services. We match businesses with the right talent through customized solutions that ensure smooth and successful hiring.",
  },
  {
    id: 2,
    serviceId: "executive-search",
    icon: "/image/Home/executive search.png",
    title: "Executive Search",
    description:
      "We are leading professional headhunters with a proven track record of placing exceptional C-level executives across various industries.",
  },
  {
    id: 3,
    serviceId: "staffing-services",
    icon: "/image/Home/staff.png",
    title: "Staffing Services",
    description:
      "At Silver Talent, we deliver premium staffing services—whether you need short-term support or long-term workforce solutions.",
  },
  {
    id: 4,
    serviceId: "hr-outsourcing",
    icon: "/image/Home/HR.png",
    title: "HR Outsourcing",
    description:
      "Silver Talent provides end-to-end outsourcing services that boost efficiency, cut costs, and accelerate business growth.",
  },
  {
    id: 5,
    serviceId: "payroll-services",
    icon: "/image/Home/payroll.png",
    title: "Payroll Services",
    description:
      "Silver Talent specializes in customized Third-Party Payroll Services designed to suit the unique requirements of businesses across various industries.",
  },
  {
    id: 6,
    serviceId: "training-development",
    icon: "/image/Home/training.png",
    title: "Training & Development",
    description:
      "Silver Talent's principal objective of training and development is to make sure your employees are able to unlock their true potential.",
  },
];

const SolutionCard = ({ solution }: { solution: Solution }) => (
  <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-transparent hover:border-indigo-300">
    <div className="relative h-40 w-full overflow-hidden">
      <img
        src={solution.icon}
        alt={`${solution.title} illustration`}
        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.src = `https://placehold.co/400x240/E2E8F0/475569?text=Image+Not+Found`;
        }}
      />
    </div>
    <div className="flex flex-grow flex-col p-6">
      <h3 className="mb-2 text-xl font-semibold text-slate-800 text-center">
        {solution.title}
      </h3>
      <p className="mb-5 flex-grow text-sm leading-relaxed text-slate-500">
        {solution.description}
      </p>
      <div className="mt-auto">
        <Link
          to={`/services#${solution.serviceId}`}
          state={{ expandedServiceId: solution.serviceId }}
          className="inline-flex items-center gap-2 text-base font-semibold text-indigo-600 transition-colors hover:text-indigo-800"
        >
          Read More
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  </div>
);

const SolutionsSection = () => {
  if (!solutions || solutions.length === 0) return null;

  const topRowSolutions = solutions.slice(0, 4);
  const bottomRowSolutions = solutions.slice(4);

  return (
    <section className="bg-blue-50 py-8 md:py-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-2 font-semibold uppercase tracking-wider text-indigo-600">
            OUR EXPERTISE
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Our Solutions For You
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Explore services tailored to drive your business success and optimize your workforce.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {topRowSolutions.map((solution) => (
            <SolutionCard key={solution.id} solution={solution} />
          ))}
        </div>

        {bottomRowSolutions.length > 0 && (
          <div className="mt-8 flex justify-center">
            <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:w-2/3 xl:w-1/2">
              {bottomRowSolutions.map((solution) => (
                <SolutionCard key={solution.id} solution={solution} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SolutionsSection;
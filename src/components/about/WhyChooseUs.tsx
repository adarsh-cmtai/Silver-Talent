import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const reasonsData = [
  {
    id: 1,
    slug: "deep-industry-expertise",
    icon: "/image/about/image1.png",
    title: "Deep Industry Expertise",
    content: "With years of experience across a wide range of industries, we know what it takes to find the right talent for your specific needs. Our recruiters are experts in identifying high-calibre candidates for positions across various sectors.",
  },
  {
    id: 2,
    slug: "time-saving",
    icon: "/image/about/image2.png",
    title: "Save Time and Effort",
    content: "Outsource your recruitment and let us handle the entire process — from screening to interviewing — saving your resources.",
  },
  {
    id: 3,
    slug: "extensive-talent-network",
    icon: "/image/about/image1.png",
    title: "Extensive Talent Network",
    content: "We have access to a vast network of active and passive candidates. our comprehensive talent pool allows us to quickly identify and engage top professionals who meet your requirements.",
  },
  {
    id: 4,
    slug: "quality-of-hire",
    icon: "/image/about/image4.png",
    title: "Quality of Hire",
    content: "We use comprehensive assessments and background checks to ensure every candidate is the best fit for the role.",
  },
];

const ReasonCard = ({ reason }) => (
  <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-transparent hover:border-indigo-300">
    <div className="relative h-40 w-full overflow-hidden">
      <img
        src={reason.icon}
        alt={`${reason.title} illustration`}
        className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.src = `https://placehold.co/400x240/E2E8F0/475569?text=Image+Not+Found`;
        }}
      />
    </div>
    <div className="flex flex-grow flex-col p-6">
      <h3 className="mb-2 text-xl font-semibold text-slate-800">
        {reason.title}
      </h3>
      <p className="mb-5 flex-grow text-sm leading-relaxed text-slate-500">
        {reason.content}
      </p>
      <div className="mt-auto">
        {/* <Link to={`/about#${reason.slug}`} className="inline-flex items-center gap-2 text-base font-semibold text-indigo-600 transition-colors hover:text-indigo-800">
          Read More
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link> */}
      </div>
    </div>
  </div>
);

const WhyChooseUs = () => {
  return (
    <section className="bg-blue-100 py-8 md:py-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-2 font-semibold uppercase tracking-wider text-indigo-600">
            OUR COMMITMENT
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Why Choose Us for Your Recruitment Services?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Discover why our recruitment solutions are the key to driving your business success and building a stronger workforce.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasonsData.map((reason) => (
            <ReasonCard key={reason.id} reason={reason} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
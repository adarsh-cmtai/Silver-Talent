import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const advantagesData = [
  {
    id: 1,
    slug: "talent-pool-access",
    image: "/image/about/image1.png", // Replace with your image
    title: "Access to a Larger Talent Pool",
    content: "With one of the largest and most refined candidate databases in the country, we offer unmatched access to top-tier, experienced professionals.",
  },
  {
    id: 2,
    slug: "recruitment-speed",
    image: "/image/about/image2.png", // Replace with your image
    title: "Speed in Recruitment",
    content: "Our average turnaround time for providing a high-quality shortlist is just 24 to 48 hours, depending on the role's complexity.",
  },
  {
    id: 3,
    slug: "custom-hiring-solutions",
    image: "/image/about/image3.png", // Replace with your image
    title: "Customized Hiring Solutions",
    content: "We leverage proprietary assessment tools to create tailored hiring solutions, ensuring the right fit for every role.",
  },
  {
    id: 4,
    slug: "quality-and-retention",
    image: "/image/about/image4.png", // Replace with your image
    title: "Proven Quality and Retention",
    content: "Over 85% of our key clients are MNCs, showcasing our consistency, quality, and the long-term success of our hires.",
  },
];

const AdvantageCard = ({ advantage }) => (
  <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-transparent hover:border-indigo-300">
    <div className="relative h-40 w-full overflow-hidden">
      <img
        src={advantage.image}
        alt={`${advantage.title} illustration`}
        className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.src = `https://placehold.co/400x240/E2E8F0/475569?text=Image+Not+Found`;
        }}
      />
    </div>
    <div className="flex flex-grow flex-col p-6">
      <h3 className="mb-2 text-xl font-semibold text-slate-800">
        {advantage.title}
      </h3>
      <p className="mb-5 flex-grow text-sm leading-relaxed text-slate-500">
        {advantage.content}
      </p>
      <div className="mt-auto">
        {/* <Link to={`/about#${advantage.slug}`} className="inline-flex items-center gap-2 text-base font-semibold text-indigo-600 transition-colors hover:text-indigo-800">
          Read More
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link> */}
      </div>
    </div>
  </div>
);

const CompetitiveEdge = () => {
  return (
    <section className="bg-blue-50 py-16 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-2 font-semibold uppercase tracking-wider text-indigo-600">
            WHY CHOOSE US
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Our Competitive Edge
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            We provide significant advantages that set us apart, ensuring your organization gets the best talent, faster.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {advantagesData.map((advantage) => (
            <AdvantageCard key={advantage.id} advantage={advantage} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompetitiveEdge;
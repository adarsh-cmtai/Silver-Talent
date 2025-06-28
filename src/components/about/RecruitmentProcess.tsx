import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const processSteps = [
  {
    id: 1,
    icon: "/image/about/image5.png",
    title: "Understanding Client Requirements",
    description: "At Silver Talent, we begin by gaining a deep understanding of the client’s needs, ensuring precise alignment with their manpower requirements—including skill sets, experience levels, and cultural fit.",
  },
  {
    id: 2,
    icon: "/image/about/image6.png",
    title: "AI-Based Candidate Evaluation",
    description: "Silver Talent leverages cutting-edge AI technology for candidate assessment. Our advanced software analyzes resumes, evaluates skills, and assesses compatibility, ensuring an efficient and unbiased short listing process.",
  },
  {
    id: 3,
    icon: "/image/about/image7.png",
    title: "Client Assessment of Shortlisted Candidates",
    description: "Silver Talent provides a curated list of shortlisted candidates, enabling clients to review profiles and conduct interviews.",
  },
  {
    id: 4,
    icon: "/image/about/image8.png",
    title: "Selection Process of Candidates",
    description: "Interviews with shortlisted candidates are scheduled in coordination with the client, and upon selection, we manage the documentation process.",
  },
  {
    id: 5,
    icon: "/image/about/image9.png",
    title: "Streamlined Documentation and Onboarding",
    description: "We manage paperwork with precision, ensure smooth communication, and deliver a swift transition from candidate selection to onboarding—reducing administrative burdens along the way.",
  },
];

const MAX_WORDS = 15;

const ProcessStepCard = ({ step, index, isExpanded, onToggle }) => {
  const isTooLong = step.description.split(" ").length > MAX_WORDS;
  const displayText = isExpanded ? step.description : `${step.description.split(" ").slice(0, MAX_WORDS).join(" ")}...`;

  return (
    <div className="group flex h-full  flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-transparent hover:border-indigo-300">
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={step.icon}
          alt={`${step.title} illustration`}
          className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = `https://placehold.co/400x240/E2E8F0/475569?text=Image+Not+Found`;
          }}
        />
      </div>
      <div className="flex flex-grow flex-col p-6">
        <h3 className="mb-2 text-xl font-semibold text-slate-800">
          {step.title}
        </h3>
        <p className="mb-5 flex-grow text-sm leading-relaxed text-slate-500">
          {isTooLong ? displayText : step.description}
        </p>
        {isTooLong && (
          <div className="mt-auto">
            <button
              onClick={() => onToggle(index)}
              className="inline-flex items-center gap-2 text-base font-semibold text-indigo-600 transition-colors hover:text-indigo-800"
            >
              {isExpanded ? "Read Less" : "Read More"}
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const RecruitmentProcess = () => {
  const [expandedCards, setExpandedCards] = useState({});

  const toggleExpand = (index) => {
    setExpandedCards(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const topRowSteps = processSteps.slice(0, 3);
  const bottomRowSteps = processSteps.slice(3);

  return (
    <section className="bg-blue-50 py-16 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-2 font-semibold uppercase tracking-wider text-indigo-600">
            OUR METHODOLOGY
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Our Recruitment Process
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            We follow a comprehensive, step-by-step process to ensure we deliver the highest quality talent for your organization.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {topRowSteps.map((step, index) => (
            <ProcessStepCard
              key={step.id}
              step={step}
              index={index}
              isExpanded={!!expandedCards[index]}
              onToggle={toggleExpand}
            />
          ))}
        </div>

        {bottomRowSteps.length > 0 && (
          <div className="mt-8 flex justify-center">
            <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:w-2/3">
              {bottomRowSteps.map((step, index) => (
                <ProcessStepCard
                  key={step.id}
                  step={step}
                  index={index + topRowSteps.length}
                  isExpanded={!!expandedCards[index + topRowSteps.length]}
                  onToggle={toggleExpand}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecruitmentProcess;
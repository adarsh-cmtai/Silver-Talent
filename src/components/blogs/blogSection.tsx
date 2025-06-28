import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card"; // Assuming shadcn/ui
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui
import { FaUsersCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  Briefcase,      // Recruitment Services
  UserCheck,      // Executive Search
  Users2,         // Staffing Services
  Settings2,      // HR Outsourcing
  Calculator,     // Payroll Services
  BookOpen,       // Training & Development
  ChevronRight
} from 'lucide-react';

const blogs = () => {
  const [expandedStates, setExpandedStates] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
        }
      });
    }, { threshold: 0.1 });

    const elementsToObserve = document.querySelectorAll(".animate-on-scroll");
    elementsToObserve.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elementsToObserve.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  const blogs = [
    {
      id: "recruitment-services",
      icon: Briefcase,
      title: "Recruitment Services",
      content: [
        "Silver Talent is a trusted name in recruitment, specializing in both IT and Non-IT hiring solutions. Leveraging advanced technology and a client-first approach, we develop customized strategies tailored to your specific workforce needs.",
        "With deep expertise and insight into evolving market dynamics, we excel at identifying and recommending top-tier talent that aligns with your business goals. As a respected recruitment partner, we offer end-to-end solutions—including sourcing, screening, interviewing, and placement—ensuring efficient and impactful hiring to drive your company's success.",
        "As a leading placement consultancy, we go beyond the active job market to engage high-caliber professionals, ensuring that our clients connect with the right talent—not just those currently seeking new opportunities. Our process is private, efficient, cost-effective, and time-sensitive."
      ],
      delay: "0s",
    },
    {
      icon: UserCheck,
      title: "Executive Search",
      content: [
        "Silver Talent Services is a premier recruitment agency with deep expertise in hiring CXO, business heads, and senior functional leaders. Renowned for our exclusive Executive Search practice, we specialize in recruiting medium to high-level executives across IT and non-IT sectors. Our expert consultants help businesses grow by identifying and placing top industry-ready talent, fostering agile and diverse organizations capable of meeting strategic goals.",
        "With decades of proven experience, Silver Talent Services blends deep industry knowledge with an extensive professional network to deliver outstanding recruitment, staffing, and HR services. Our approach is powered by continuous market research, talent strategy insights, and a commitment to excellence.",
        "What sets Silver Talent Services apart is our research-led Executive Search model combined with a personalized, high-touch approach to candidate engagement. From multinational corporations to startups, our team consistently delivers exceptional results, meeting even the most complex and niche talent needs."
      ],
      delay: "0.2s",
    },
    {
      icon: Users2,
      title: "Staffing Services",
      content: [
        "At Silver Talent, we specialize in providing top-tier Staffing Services, Whether you require short-term staffing solutions or long-term workforce management.",
        "At Silver Talent, we understand that the foundation of every successful organization lies in the strength of its people. Our Staffing Services are designed to equip your business with the right talent to thrive in today's competitive landscape.",
        "As a leading Staffing Company, we serve as your trusted partner in identifying and placing top-tier professionals who drive innovation and performance. Our experienced team takes the time to understand your unique hiring needs, delivering customized staffing solutions that align perfectly with your business goals."
      ],
      delay: "0.4s",
    },
    {
      icon: Settings2,
      title: "HR Outsourcing",
      content: [
        "Silver Talent provides end-to-end Outsourcing Services aimed at boosting operational efficiency, cutting costs, and propelling your business growth.",
        "Silver Talent is a premier Recruitment and HR Consulting firm with a pan-India presence, committed to helping businesses unlock the full potential of their workforce. We understand that people are a company's most valuable asset—key to driving success, shaping culture, and achieving long-term growth.",
        "Our expert team delivers end-to-end HR solutions, including recruitment, training, workforce planning, succession mapping, compliance, and compensation strategy. With deep industry knowledge and a strategic approach, we tailor solutions that attract, develop, and retain top talent.",
        "Recognized both in India and globally, Silver Talent is your trusted partner for building high-performing teams and future-ready organizations."
      ],
      delay: "0.6s",
    },
    {
      icon: Calculator,
      title: "Payroll Services",
      content: [
        "At Silver Talent, we specialize in delivering customized Third-Party Payroll Services designed to support the diverse needs of businesses across various industries. Our solutions simplify complex payroll management—whether it's for temporary staff, seasonal hires, or remote teams.",
        "By partnering with trusted third-party payroll providers, Silver Talent ensures a smooth and compliant process for workforce management. From onboarding to salary processing and statutory compliance, we handle every aspect efficiently, allowing you to focus on your core operations while we manage your payroll with precision and care."
      ],
      delay: "0.8s",
    },
    {
      icon: BookOpen,
      title: "Training & Development",
      content: [
        "Training and development are fundamental pillars of human resource management, focused on enhancing the skills, knowledge, and competencies of employees across all levels of an organization. These initiatives are not only crucial for boosting individual performance but also play a vital role in driving overall organizational growth, adaptability, and long-term success. By investing in continuous learning, companies can foster innovation, improve employee retention, and build a resilient workforce ready to meet evolving business challenges.",
        "At Silver Talent, we design and deliver tailored training and development programs that empower your teams to reach their full potential. From technical upskilling to leadership development, our solutions are strategically aligned with your business objectives—ensuring that your talent grows in tandem with your organization."
      ],
      delay: "1s",
    }
  ];

  const toggleExpand = (index) => {
    setExpandedStates(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section className="py-10 px-4 bg-gray-100"> {/* Added light gray background to section */}
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-3 mb-12 animate-on-scroll">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
            Empowering Your Business with Outstanding Talent Solutions
          </h2>
          <FaUsersCog className="text-sky-600 w-8 h-8 md:w-12 md:h-12" /> {/* Adjusted size */}
        </div>

        <div className="space-y-8"> {/* Increased spacing between cards */}
          {blogs.map((service, index) => {
            const isExpanded = expandedStates[index];
            const IconComponent = service.icon;

            return (
              <Card
                key={index}
                className="animate-on-scroll bg-white shadow-2xl border-gray-400 rounded-xl overflow-hidden hover:shadow-3xl transition-shadow duration-300"
                style={{ transitionDelay: service.delay }}
              >
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left mb-4">
                    {IconComponent && (
                      <div className="bg-sky-100 p-4 rounded-full mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                        <IconComponent className="w-10 h-10 text-sky-600" />
                      </div>
                    )}
                    <div className="flex-grow">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">{service.title}</h3>
                    </div>
                  </div>
                  
                  <div className="text-gray-700 text-sm md:text-base space-y-3 text-left">
                    {isExpanded ? (
                      service.content.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))
                    ) : (
                      <p>{service.content[0].substring(0, 200)}{service.content[0].length > 200 ? "..." : ""}</p> 
                      // Show first 200 chars of the first paragraph as a snippet
                    )}
                  </div>

                  <div className="mt-6 text-center md:text-right">
                    <Link to={`/blog/${service.id}`}>
                      <Button
                        variant="link"
                        className="text-sky-600 hover:text-sky-700 font-semibold text-sm md:text-base group"
                      >
                        Read More
                        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default blogs;
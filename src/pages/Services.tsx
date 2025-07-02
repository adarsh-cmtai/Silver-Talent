import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Target,
  Award,
  Shield,
  Zap,
  Heart,
  Building2,
  Briefcase,
  UserCheck,
  Users2 as LucideUsers2,
  Settings2,
  Calculator,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { FaUsersCog } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


interface ServiceItem {
  id: string;
  icon: React.ElementType;
  title: string;
  content: string[];
  image: string;
}

interface StatItem {
  number: string;
  label: string;
  icon: React.ElementType;
}

interface WhyChooseUsItem {
  image: string;
  title: string;
  content: string;
}

export const servicesContent: ServiceItem[] = [
  {
    id: "recruitment-services",
    icon: Briefcase,
    title: "Recruitment Services",
    image: "/image/Home/recruitement.png",
    content: [
      "Silver Talent is a trusted name in recruitment, specializing in both IT and Non-IT hiring solutions. Leveraging advanced technology and a client-first approach, we develop customized strategies tailored to your specific workforce needs.",
      "With deep expertise and insight into evolving market dynamics, we excel at identifying and recommending top-tier talent that aligns with your business goals. As a respected recruitment partner, we offer end-to-end solutions—including sourcing, screening, interviewing, and placement—ensuring efficient and impactful hiring to drive your company’s success.",
      "As a leading placement consultancy, we go beyond the active job market to engage high-caliber professionals, ensuring that our clients connect with the right talent—not just those currently seeking new opportunities. Our process is private, efficient, cost-effective, and time-sensitive."
    ],
  },
  {
    id: "executive-search",
    icon: UserCheck,
    title: "Executive Search",
    image: "/image/Home/executive search.png",
    content: [
      "Silver Talent Services is a premier recruitment agency with deep expertise in hiring CXO, business heads, and senior functional leaders. Renowned for our exclusive Executive Search practice, we specialize in recruiting medium to high-level executives across IT and non-IT sectors. Our expert consultants help businesses grow by identifying and placing top industry-ready talent, fostering agile and diverse organizations capable of meeting strategic goals.",
      "With decades of proven experience, Silver Talent Services blends deep industry knowledge with an extensive professional network to deliver outstanding recruitment, staffing, and HR services. Our approach is powered by continuous market research, talent strategy insights, and a commitment to excellence.",
      "What sets Silver Talent Services apart is our research-led Executive Search model combined with a personalized, high-touch approach to candidate engagement. From multinational corporations to startups, our team consistently delivers exceptional results, meeting even the most complex and niche talent needs."
    ],
  },
  {
    id: "staffing-services",
    icon: LucideUsers2,
    title: "Staffing Services",
    image: "/image/Home/staff.png",
    content: [
      "At Silver Talent, we specialize in providing top-tier Staffing Services, Whether you require short-term staffing solutions or long-term workforce management.",
      "At Silver Talent, we understand that the foundation of every successful organization lies in the strength of its people. Our Staffing Services are designed to equip your business with the right talent to thrive in today’s competitive landscape.",
      "As a leading Staffing Company, we serve as your trusted partner in identifying and placing top-tier professionals who drive innovation and performance. Our experienced team takes the time to understand your unique hiring needs, delivering customized staffing solutions that align perfectly with your business goals."
    ],
  },
  {
    id: "hr-outsourcing",
    icon: Settings2,
    title: "HR Outsourcing",
    image: "/image/Home/HR.png",
    content: [
      "Silver Talent provides end-to-end Outsourcing Services aimed at boosting operational efficiency, cutting costs, and propelling your business growth.",
      "Silver Talent is a premier Recruitment and HR Consulting firm with a pan-India presence, committed to helping businesses unlock the full potential of their workforce. We understand that people are a company’s most valuable asset—key to driving success, shaping culture, and achieving long-term growth.",
      "Our expert team delivers end-to-end HR solutions, including recruitment, training, workforce planning, succession mapping, compliance, and compensation strategy. With deep industry knowledge and a strategic approach, we tailor solutions that attract, develop, and retain top talent.",
      "Recognized both in India and globally, Silver Talent is your trusted partner for building high-performing teams and future-ready organizations."
    ],
  },
  {
    id: "payroll-services",
    icon: Calculator,
    title: "Payroll Services",
    image: "/image/Home/payroll.png",
    content: [
      "At Silver Talent, we specialize in delivering customized Third-Party Payroll Services designed to support the diverse needs of businesses across various industries. Our solutions simplify complex payroll management—whether it's for temporary staff, seasonal hires, or remote teams.",
      "By partnering with trusted third-party payroll providers, Silver Talent ensures a smooth and compliant process for workforce management. From onboarding to salary processing and statutory compliance, we handle every aspect efficiently, allowing you to focus on your core operations while we manage your payroll with precision and care."
    ],
  },
  {
    id: "training-development",
    icon: BookOpen,
    title: "Training & Development",
    image: "/image/Home/training.png",
    content: [
      "Training and development are fundamental pillars of human resource management, focused on enhancing the skills, knowledge, and competencies of employees across all levels of an organization. These initiatives are not only crucial for boosting individual performance but also play a vital role in driving overall organizational growth, adaptability, and long-term success. By investing in continuous learning, companies can foster innovation, improve employee retention, and build a resilient workforce ready to meet evolving business challenges.",
      "At Silver Talent, we design and deliver tailored training and development programs that empower your teams to reach their full potential. From technical upskilling to leadership development, our solutions are strategically aligned with your business objectives—ensuring that your talent grows in tandem with your organization."
    ],
  }
];

const whyChooseUsData: WhyChooseUsItem[] = [
  {
    image: "/image/services/expert team.jpg",
    title: "Expert Team",
    content: "Our seasoned professionals bring deep expertise across the full spectrum of talent and HR services, from recruitment to payroll and development.",
  },
  {
    image: "/image/services/customize.png",
    title: "Customized Approach",
    content: "Our solutions, from executive search to HR outsourcing, are tailored to your specific business needs and organizational culture.",
  },
  {
    image: "/image/services/efficient.png",
    title: "Efficient & Responsive",
    content: "Experience swift, effective service delivery, ensuring your talent and HR requirements are met with speed and precision.",
  },
  {
    image: "/image/services/result driven.png",
    title: "Results-Driven Partnership",
    content: "We are committed to delivering measurable outcomes, helping you build a stronger workforce and achieve your strategic business goals.",
  },
];

const Services = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Services | Silver Talent";
    const serviceIdToScroll = location.state?.expandedServiceId;
    if (serviceIdToScroll) {
      const timer = setTimeout(() => {
        const element = document.getElementById(serviceIdToScroll);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 200);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.state]);

  const stats: StatItem[] = [
    { number: "250+", label: "Companies Empowered", icon: Building2 },
    { number: "8500+", label: "Talent Successfully Placed", icon: Users },
    { number: "98%", label: "Client Satisfaction Rate", icon: Heart },
    { number: "24/7", label: "Dedicated Support", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="relative overflow-hidden bg-[#042c60] text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-[#fff]">Comprehensive Talent & HR Solutions</h1>
            <p className="text-xl text-[#fff] mb-8 leading-relaxed">Silver Talent offers a full spectrum of services from recruitment, executive search, staffing, HR outsourcing, payroll, and strategic training & development.</p>
            <div className="flex gap-4">
              <Link to="/vacancies">
                <Button size="lg" className="bg-white text-sky-600 hover:bg-gray-100 px-8">
                  Explore Our Solutions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-sky-600 hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 bg-white shadow-xl border-0"><div className="flex items-center gap-4"><div className="bg-sky-50 p-3 rounded-lg"><stat.icon className="w-6 h-6 text-sky-600" /></div><div><div className="text-2xl font-bold text-gray-900">{stat.number}</div><div className="text-sm text-gray-600">{stat.label}</div></div></div></Card>
          ))}
        </div>
      </div>

      <div className="bg-blue-50">
        <div className="container mx-auto px-4 pt-8 pb-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Our Talent Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed">Discover our range of services designed to help your business thrive by connecting you with top-tier talent.</p>
          </div>
        </div>
        {servicesContent.map((service, index) => {
          const IconComponent = service.icon;
          const isReversed = index % 2 !== 0;
          const bgColor = index % 2 === 0 ? 'bg-blue-50' : 'bg-blue-100';

          return (
            <section key={service.id} id={service.id} className={`${bgColor} py-8`}>
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-11 gap-12 lg:gap-16 items-center">
                  <div className={`lg:col-span-4 w-full ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="rounded-xl object-cover w-full h-full max-h-[500px]"
                    />
                  </div>
                  <div className={`lg:col-span-7 w-full ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="flex items-start mb-5">
                      <div className="bg-sky-100 p-4 rounded-xl mr-5 flex-shrink-0">
                        <IconComponent className="w-8 h-8 text-sky-600" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900">{service.title}</h3>
                      </div>
                    </div>
                    <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                      {service.content.map((paragraph, pIndex) => (
                        <p key={pIndex}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="bg-gradient-to-b bg-blue-50 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-sky-50 rounded-full text-sky-600 font-medium mb-4">Why Partner with Us</div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">The Silver Talent Advantage</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">Discover how our comprehensive approach and dedicated experts can elevate your business.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {whyChooseUsData.map((item, index) => (
              <Card
                key={index}
                className="h-full bg-white rounded-xl flex flex-col border-gray-100 hover:shadow-sky-100 hover:border-sky-400 transition-all duration-300 ease-in-out group"
              >
                <CardContent className="p-6 flex flex-col items-center text-center flex-grow">
                  <div className="bg-sky-100 group-hover:bg-sky-300 w-28 h-28 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-xl transition-all duration-300 ease-in-out">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain transition-colors duration-300 ease-in-out"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 group-hover:text-sky-700 mb-4 transition-colors duration-300 ease-in-out">
                    {item.title}
                  </h3>
                  <p className="text-base text-gray-600 mb-6 flex-grow">{item.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default Services;
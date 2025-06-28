// src/data/services.ts
import {
  Briefcase,
  UserCheck,
  Users2,
  Settings2,
  Calculator,
  BookOpen,
  Icon as LucideIcon, // Generischer Typ für Lucide Icons
} from "lucide-react";

// Hilfsfunktion zum Erstellen von Slugs (unverändert)
const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

export interface Service {
  id: string;
//   icon: LucideIcon; // Typ für Lucide-React Icons
  title: string;
  content: string[];
  delay: string;
  slug: string;
}

export const servicesData: Service[] = [
  {
    id: "comprehensive-recruitment",
    icon: Briefcase,
    title:
      "Smarter Hiring, Better Teams: Silver Talent’s Comprehensive Recruitment Services",
    content: [
      "Silver Talent is a trusted name in both IT and Non-IT recruitment. Our approach is built on a deep understanding of market dynamics, enhanced by smart use of technology and a strong client-first philosophy. We offer fully customized hiring strategies that help businesses attract the best talent faster.",
      "Our team manages the entire recruitment lifecycle—from sourcing and screening to interviewing and final placement—ensuring your hires are not just qualified, but the right fit for your team culture and long-term goals.",
      "We also reach beyond the active job market, engaging high-caliber professionals who may not be actively seeking new roles but are perfect matches for your needs. Our process is efficient, confidential, and designed to deliver results quickly and cost-effectively.",
    ],
    delay: "0s",
  },
  {
    id: "executive-search",
    icon: UserCheck,
    title: "Targeted Executive Search for Leadership That Drives Impact",
    content: [
      "Silver Talent Services specializes in Executive Search, helping organizations recruit senior leaders, including CXOs and department heads, across IT and Non-IT sectors.",
      "Our executive recruiters use a research-led, high-touch approach to connect clients with transformative leaders. With decades of experience and an extensive network, we identify industry-ready talent capable of navigating complex challenges and driving organizational growth.",
      "From startups to multinational enterprises, we deliver tailored executive hiring solutions that blend strategic insight, rigorous vetting, and market intelligence.",
    ],
    delay: "0.2s",
  },
  {
    id: "flexible-staffing",
    icon: Users2,
    title: "Flexible Staffing Solutions for a Dynamic Workforce",
    content: [
      "Silver Talent provides customized staffing services designed to meet your workforce needs—whether temporary, project-based, or long-term.",
      "We understand that the right people are your company’s most powerful asset. Our team works closely with you to understand your hiring requirements and deliver professionals who are ready to contribute from day one.",
      "Our scalable staffing solutions allow you to adapt quickly to shifting demands while maintaining high performance and productivity across teams.",
    ],
    delay: "0.4s",
  },
  {
    id: "hr-outsourcing",
    icon: Settings2,
    title: "Streamline Your People Strategy with Expert HR Outsourcing",
    content: [
      "Silver Talent offers full-spectrum HR Outsourcing services to help businesses cut costs, increase efficiency, and scale strategically.",
      "From recruitment and training to compliance, performance management, and compensation planning, we manage every aspect of the employee lifecycle.",
      "Our HR experts tailor strategies to your unique culture and goals, allowing your internal teams to focus on innovation and growth while we manage the backend complexities.",
      "Recognized across India and internationally, Silver Talent is your strategic HR partner in building future-ready teams.",
    ],
    delay: "0.6s",
  },
  {
    id: "payroll-management",
    icon: Calculator,
    title: "Effortless Payroll Management for Your Growing Workforce",
    content: [
      "Silver Talent provides end-to-end third-party payroll services to streamline your operations and ensure compliance. Whether you’re managing freelancers, contract staff, or remote employees, our solutions are built to simplify complex payroll processes.",
      "We handle onboarding, payroll processing, tax compliance, and reporting—so you can focus on growing your business while we take care of the paperwork with accuracy and confidentiality.",
    ],
    delay: "0.8s",
  },
  {
    id: "training-development",
    icon: BookOpen,
    title: "Empowering Talent Through Strategic Training & Development",
    content: [
      "Employee development is a cornerstone of high-performing organizations. At Silver Talent, we design training programs that elevate skills, enhance leadership, and align individual growth with company objectives.",
      "Whether it’s upskilling your technical team or developing future leaders, our training solutions are customized to unlock the full potential of your workforce.",
      "By investing in continuous learning, companies foster innovation, increase retention, and build teams prepared for the future.",
    ],
    delay: "1s",
  },
].map((service) => ({ ...service, slug: slugify(service.title) }));
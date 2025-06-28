
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Search, Users, Shield, Coins, GraduationCap } from "lucide-react";

const ServicesList = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  const services = [
    {
      icon: Briefcase,
      title: "Recruitment Services",
      description: "Comprehensive IT & Non-IT recruitment solutions across industries. We handle the entire process from job posting to onboarding for permanent roles.",
      delay: "0s"
    },
    {
      icon: Search,
      title: "Executive Search",
      description: "Specialized search for C-Suite executives and leadership roles. Our executive headhunting ensures you find transformative leaders who align with your vision.",
      delay: "0.1s"
    },
    {
      icon: Users,
      title: "Staffing Services",
      description: "Flexible staffing solutions for short and long-term contracts. Get qualified professionals to address immediate needs without long-term commitments.",
      delay: "0.2s"
    },
    {
      icon: Shield,
      title: "HR Outsourcing",
      description: "Comprehensive outsourced HR management to handle your day-to-day processes, compliance, and employee relations, allowing you to focus on core business.",
      delay: "0.3s"
    },
    {
      icon: Coins,
      title: "Payroll Services",
      description: "Reliable third-party payroll processing that ensures accurate, timely payments while maintaining compliance with tax regulations and statutory requirements.",
      delay: "0.4s"
    },
    {
      icon: GraduationCap,
      title: "Training & Development",
      description: "Customized training programs to upskill your workforce. Our programs enhance employee performance, engagement and retention through targeted skill development.",
      delay: "0.5s"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="animate-on-scroll border-2 border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{ transitionDelay: service.delay }}
            >
              <CardContent className="p-8 flex flex-col items-center h-full">
                <div className="bg-royal-blue/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-royal-blue" />
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-center">{service.title}</h3>
                
                <p className="text-gray-600 text-center mb-6 flex-grow">
                  {service.description}
                </p>
                
                <Button className="bg-mustard-gold hover:bg-mustard-gold/80 text-royal-blue mt-auto">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;


import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, MapPin, Calendar, Building } from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  postedDate: string;
  description: string;
}

const JobListings = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  
  useEffect(() => {
    // Simulate fetching jobs from an API
    const mockJobs = [
      {
        id: 1,
        title: "Senior Software Engineer",
        company: "Tech Innovators",
        location: "Bangalore",
        type: "Full-time",
        postedDate: "2 days ago",
        description: "We're seeking an experienced Software Engineer to join our dynamic team. The ideal candidate will develop high-quality web applications using React, Node.js, and other modern technologies."
      },
      {
        id: 2,
        title: "Financial Analyst",
        company: "Global Finance Corp",
        location: "Mumbai",
        type: "Full-time",
        postedDate: "1 week ago",
        description: "Looking for a skilled Financial Analyst with experience in financial modeling, forecasting, and data analysis. The role involves preparing reports and presentations for senior management."
      },
      {
        id: 3,
        title: "Marketing Manager",
        company: "Brand Elevate",
        location: "Delhi NCR",
        type: "Full-time",
        postedDate: "3 days ago",
        description: "Seeking a creative Marketing Manager to lead our marketing initiatives. The role includes developing marketing strategies, managing campaigns, and analyzing market trends."
      },
      {
        id: 4,
        title: "HR Specialist",
        company: "People First Inc.",
        location: "Remote",
        type: "Contract",
        postedDate: "Just now",
        description: "We're looking for an HR Specialist to support our growing team. Responsibilities include recruitment, employee relations, and ensuring compliance with employment laws."
      },
      {
        id: 5,
        title: "Operations Manager",
        company: "Logistics Pro",
        location: "Pune",
        type: "Full-time",
        postedDate: "5 days ago",
        description: "Seeking an Operations Manager to oversee daily operations, optimize processes, and ensure efficient service delivery. Experience in logistics or supply chain management is preferred."
      },
    ];
    
    setJobs(mockJobs);
    
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

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold mb-8 animate-on-scroll">Found {jobs.length} Job Openings</h2>
        
        <div className="space-y-6">
          {jobs.map((job, index) => (
            <Card 
              key={job.id}
              className="animate-on-scroll hover:shadow-xl transition-all duration-300"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-royal-blue">{job.title}</h3>
                    
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-6 mt-3 text-gray-600">
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-2" />
                        {job.company}
                      </div>
                      
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {job.location}
                      </div>
                      
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-2" />
                        {job.type}
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Posted {job.postedDate}
                      </div>
                    </div>
                    
                    <p className="mt-4 text-gray-700">
                      {job.description}
                    </p>
                  </div>
                  
                  <div className="mt-6 md:mt-0 md:ml-4 flex-shrink-0">
                    <Button className="bg-mustard-gold hover:bg-mustard-gold/80 text-royal-blue">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Pagination could go here */}
        <div className="mt-12 flex justify-center">
          <Button variant="outline" className="mx-2">
            Previous
          </Button>
          <Button variant="outline" className="mx-2 bg-royal-blue text-white">
            1
          </Button>
          <Button variant="outline" className="mx-2">
            2
          </Button>
          <Button variant="outline" className="mx-2">
            3
          </Button>
          <Button variant="outline" className="mx-2">
            Next
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobListings;

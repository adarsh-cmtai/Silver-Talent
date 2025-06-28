
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, MapPin, Search } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const VacanciesFilters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would typically filter the jobs based on the search criteria
    console.log("Search term:", searchTerm);
    console.log("Filters:", { selectedRole, selectedLocation, selectedIndustry, selectedExperience });
    
    toast({
      title: "Search applied",
      description: "Your filters have been applied to the job listings.",
    });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedRole("");
    setSelectedLocation("");
    setSelectedIndustry("");
    setSelectedExperience("");
    
    toast({
      title: "Filters cleared",
      description: "All search filters have been reset.",
    });
  };

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSearch}>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Search by job title, skills, or keywords"
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button 
                type="submit"
                className="bg-royal-blue hover:bg-royal-blue/90 text-white w-full md:w-auto"
              >
                Search Jobs
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Role
                </label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="it">IT & Software</SelectItem>
                    <SelectItem value="finance">Finance & Accounting</SelectItem>
                    <SelectItem value="sales">Sales & Marketing</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Location
                </label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="delhi">Delhi NCR</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  Industry
                </label>
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Industries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  Experience
                </label>
                <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Experience</SelectItem>
                    <SelectItem value="0-1">0-1 Years</SelectItem>
                    <SelectItem value="1-3">1-3 Years</SelectItem>
                    <SelectItem value="3-5">3-5 Years</SelectItem>
                    <SelectItem value="5-10">5-10 Years</SelectItem>
                    <SelectItem value="10+">10+ Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-6 text-right">
              <Button 
                type="button" 
                variant="outline"
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VacanciesFilters;

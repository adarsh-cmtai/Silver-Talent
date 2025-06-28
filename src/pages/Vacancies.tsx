// client/src/pages/Vacancies.tsx
import React, { useEffect, useState, FormEvent, ChangeEvent, useCallback } from "react";
import { Card } from "@/components/ui/card"; // Adjust paths if needed
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search, MapPin, Briefcase, Building2, Clock, DollarSign, Star,
  Filter, ArrowRight, BookmarkPlus, Share2, Loader2, AlertTriangle,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { ApplyJobModal } from "@/components/ApplyJobModal"; // Import the modal

// --- Configuration ---
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://silver-talent-backend-2.onrender.com/api";

// --- TypeScript Interfaces ---
export interface JobLogo { // Exported if ApplyJobModal or others need it, or keep local
  public_id?: string;
  url: string;
}

export interface Job { // Ensure this is EXPORTED
  _id: string;
  id?: string; 
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  category: string;
  description: string;
  postedDate: string;
  skills: string[];
  logo?: JobLogo;
  rating: number;
  applicants: number;
}

interface FeaturedCompany {
  _id: string; 
  id?: string; 
  name: string;
  logo?: string;
  jobs: number;
  rating: number;
}

interface FilterOptions {
  categories: string[];
  locations: string[];
  jobTypes: string[];
}

const formatDatePosted = (dateString?: string): string => {
  if (!dateString) return "Date not available";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffSeconds = Math.round(diffTime / 1000);
    if (diffSeconds < 5) return "Just now";
    if (diffSeconds < 60) return `${diffSeconds} sec ago`;
    const diffMinutes = Math.round(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    const diffHours = Math.round(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hr ago`;
    const diffDays = Math.round(diffHours / 24);
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} wk ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} mo ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch (e) {
    console.error("Error formatting date:", e);
    return "Date unavailable";
  }
};

const Vacancies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Vacancies | Silver Talent";
  }, []);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>([]);
  const [featuredCompanies, setFeaturedCompanies] = useState<FeaturedCompany[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    categories: ["All Categories"], locations: ["All Locations"], jobTypes: ["All Types"]
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [selectedLocation, setSelectedLocation] = useState<string>("All Locations");
  const [selectedJobType, setSelectedJobType] = useState<string>("All Types");
  const [isLoadingJobs, setIsLoadingJobs] = useState<boolean>(true);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState<boolean>(true);
  const [isLoadingFilters, setIsLoadingFilters] = useState<boolean>(true);
  const [jobsError, setJobsError] = useState<string | null>(null);
  const [alertEmail, setAlertEmail] = useState<string>("");
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState<boolean>(false);

  // State for Apply Job Modal
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
  const [selectedJobForApplication, setSelectedJobForApplication] = useState<Job | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoadingFilters(true); setIsLoadingJobs(true); setIsLoadingCompanies(true); setJobsError(null);
      try {
        const [filtersResponse, jobsResponse, companiesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/filter-options`),
          fetch(`${API_BASE_URL}/jobs`), 
          fetch(`${API_BASE_URL}/featured-companies`)
        ]);

        if (!filtersResponse.ok) throw new Error(`Filter options: ${filtersResponse.statusText || filtersResponse.status}`);
        const filtersData: FilterOptions = await filtersResponse.json();
        setFilterOptions({
            categories: ["All Categories", ...(filtersData.categories || [])],
            locations: ["All Locations", ...(filtersData.locations || [])],
            jobTypes: ["All Types", ...(filtersData.jobTypes || [])]
        });
        setIsLoadingFilters(false);

        if (!jobsResponse.ok) {
            const errorData = await jobsResponse.json().catch(() => ({ message: `Initial jobs: ${jobsResponse.statusText || jobsResponse.status}` }));
            throw new Error(errorData.message || `Initial jobs: ${jobsResponse.statusText || jobsResponse.status}`);
        }
        const jobsDataWrapper = await jobsResponse.json();
        setDisplayedJobs(jobsDataWrapper.jobs || []);
        setIsLoadingJobs(false);
        
        if (!companiesResponse.ok) throw new Error(`Featured companies: ${companiesResponse.statusText || companiesResponse.status}`);
        const companiesData: FeaturedCompany[] = await companiesResponse.json(); // API now returns array directly based on controller
        setFeaturedCompanies(companiesData || []);
        setIsLoadingCompanies(false);

      } catch (error: any) {
        console.error("Error fetching initial data:", error);
        toast.error(error.message || "Could not load initial page data.");
        if (!filterOptions.categories.length || filterOptions.categories[0] === "All Categories") setIsLoadingFilters(false);
        if (displayedJobs.length === 0) {
            setJobsError(error.message || "Failed to load jobs.");
            setDisplayedJobs([]); setIsLoadingJobs(false);
        }
        if (featuredCompanies.length === 0) {
            setFeaturedCompanies([]); setIsLoadingCompanies(false);
        }
      } finally {
        setInitialLoadComplete(true);
      }
    };
    fetchInitialData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const fetchJobsWithCurrentFilters = useCallback(async () => {
    setIsLoadingJobs(true); setJobsError(null);
    try {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.append('q', searchQuery.trim());
      if (selectedCategory !== "All Categories") params.append('category', selectedCategory);
      if (selectedLocation !== "All Locations") params.append('location', selectedLocation);
      if (selectedJobType !== "All Types") params.append('type', selectedJobType);
      
      const response = await fetch(`${API_BASE_URL}/jobs?${params.toString()}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Filtered jobs: ${response.statusText || response.status}` }));
        throw new Error(errorData.message || `Filtered jobs: ${response.statusText || response.status}`);
      }
      const dataWrapper = await response.json();
      setDisplayedJobs(dataWrapper.jobs || []);
    } catch (error: any) {
      console.error("Error fetching filtered jobs:", error);
      setDisplayedJobs([]);
      setJobsError(error.message || "An unknown error occurred while fetching jobs.");
      toast.error(error.message || "Could not load jobs with current filters.");
    } finally {
      setIsLoadingJobs(false);
    }
  }, [searchQuery, selectedCategory, selectedLocation, selectedJobType]);

  useEffect(() => {
    if (initialLoadComplete) { 
      const isDefaultFilters = !searchQuery.trim() && selectedCategory === "All Categories" &&
                               selectedLocation === "All Locations" && selectedJobType === "All Types";
      if (!isDefaultFilters || (isDefaultFilters && (searchQuery === '' || displayedJobs.length === 0 && !jobsError))) {
        const handler = setTimeout(() => { fetchJobsWithCurrentFilters(); }, 700);
        return () => clearTimeout(handler);
      }
    }
  }, [searchQuery, selectedCategory, selectedLocation, selectedJobType, initialLoadComplete, fetchJobsWithCurrentFilters, displayedJobs.length, jobsError]);

  const handleSearchButtonClick = () => fetchJobsWithCurrentFilters();
  const handlePopularSearchClick = (searchTerm: string) => setSearchQuery(searchTerm);

  const handleSubscribeAlerts = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!alertEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(alertEmail)) {
      toast.error("Please enter a valid email address."); return;
    }
    setIsSubscribing(true);
    try {
      const response = await fetch(`${API_BASE_URL}/subscribe`, { // Assuming /subscribe is under /api in your backend
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: alertEmail }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Subscription failed.");
      toast.success(data.message || "Successfully subscribed!");
      setAlertEmail("");
    } catch (error: any) {
      console.error("Subscription error:", error);
      toast.error(error.message || "Could not subscribe.");
    } finally {
      setIsSubscribing(false);
    }
  };

  const popularSearches: string[] = [
    "Software Engineer", "React", "Product Manager", "UX Design",
    "Data Science", "DevOps", "Marketing", "Remote"
  ];

  const handleApplyNowClick = (job: Job) => {
    setSelectedJobForApplication(job);
    setIsApplyModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-gray-100 selection:bg-sky-200 selection:text-sky-900">
      <Toaster richColors position="top-center" duration={3000} />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-10 mix-blend-soft-light"></div>
        <div className="container mx-auto px-4 py-20 sm:py-24 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm mb-6">
              <span className="text-sm font-medium">
                {(isLoadingJobs && !initialLoadComplete && displayedJobs.length === 0) ? "Counting jobs..." : `${displayedJobs.length} Jobs Available`}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your <span className="text-sky-400">Next Opportunity</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed">
              Explore thousands of job openings from leading companies and discover your dream career.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <Input
                  type="text" aria-label="Search jobs by title, keywords, or company"
                  placeholder="Job title, keywords, or company"
                  className="pl-12 pr-4 py-3 bg-white text-gray-900 text-base rounded-lg h-12 w-full shadow-sm focus:ring-2 focus:ring-sky-500 border-gray-300"
                  value={searchQuery} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchButtonClick()}
                />
              </div>
              <Button 
                size="lg" aria-label="Search jobs"
                className="bg-sky-500 hover:bg-sky-600 text-white px-6 sm:px-8 rounded-lg h-12 shadow-md transition-colors flex items-center justify-center" 
                onClick={handleSearchButtonClick} disabled={isLoadingJobs && displayedJobs.length === 0}
              >
                {isLoadingJobs && displayedJobs.length === 0 ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5 sm:mr-2" />}
                <span className="hidden sm:inline">Search</span>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap justify-center items-center gap-2">
              <span className="text-white/70 text-sm mr-1">Popular:</span>
              {popularSearches.slice(0,6).map((search, index) => (
                <Badge key={index} variant="secondary" 
                  className="bg-white/10 text-white hover:bg-white/20 cursor-pointer text-xs px-2.5 py-1 rounded-md"
                  onClick={() => handlePopularSearchClick(search)} tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handlePopularSearchClick(search)}
                >{search}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <Card className="p-4 sm:p-6 shadow-xl border-gray-200 rounded-xl bg-white">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-sky-600" />
            <h3 className="text-lg font-semibold text-gray-800">Filter Your Search</h3>
          </div>
          {isLoadingFilters ? (
            <div className="grid md:grid-cols-3 gap-4">
                {[...Array(3)].map((_,i) => ( <div key={i} className="h-12 bg-gray-200 rounded-lg animate-pulse"></div> ))}
            </div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory} disabled={isLoadingJobs}>
              <SelectTrigger className="h-12 rounded-lg text-base border-gray-300 focus:ring-sky-500">
                <SelectValue placeholder="Job Category" />
              </SelectTrigger>
              <SelectContent>{filterOptions.categories.map((cat) => (<SelectItem key={cat} value={cat} className="text-base">{cat}</SelectItem>))}</SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation} disabled={isLoadingJobs}>
              <SelectTrigger className="h-12 rounded-lg text-base border-gray-300 focus:ring-sky-500">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>{filterOptions.locations.map((loc) => (<SelectItem key={loc} value={loc} className="text-base">{loc}</SelectItem>))}</SelectContent>
            </Select>
            <Select value={selectedJobType} onValueChange={setSelectedJobType} disabled={isLoadingJobs}>
              <SelectTrigger className="h-12 rounded-lg text-base border-gray-300 focus:ring-sky-500">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>{filterOptions.jobTypes.map((jtype) => (<SelectItem key={jtype} value={jtype} className="text-base">{jtype}</SelectItem>))}</SelectContent>
            </Select>
          </div>
          )}
        </Card>
      </div>

      {/* Job Listings & Sidebar */}
      <div className="container mx-auto px-4 py-10 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {isLoadingJobs && displayedJobs.length === 0 && !jobsError ? (
              <div className="flex flex-col justify-center items-center h-96 bg-white rounded-xl shadow-lg p-6">
                <Loader2 className="h-16 w-16 animate-spin text-sky-500" />
                <p className="mt-4 text-xl text-gray-600 font-medium">Finding opportunities...</p>
              </div>
            ) : jobsError ? (
                <Card className="p-6 sm:p-10 text-center border-0 shadow-lg bg-red-50 rounded-xl">
                    <AlertTriangle className="w-16 h-16 mx-auto text-red-400 mb-4" />
                    <h3 className="text-xl font-semibold text-red-700 mb-2">Oops! Something went wrong.</h3>
                    <p className="text-red-600 mb-4">{jobsError}</p>
                    <Button onClick={fetchJobsWithCurrentFilters} className="bg-red-500 hover:bg-red-600 text-white">Try Reloading Jobs</Button>
                </Card>
            ) : displayedJobs.length > 0 ? (
              <>
                {displayedJobs.map((job) => (
                  <Card key={job._id || job.id} className="group hover:shadow-2xl transition-all duration-300 border border-gray-200 rounded-xl overflow-hidden bg-white">
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        <img
                          src={job.logo?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=random&size=128&font-size=0.33&bold=true&color=fff`}
                          alt={`${job.company} logo`}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-contain border border-gray-100 p-1 flex-shrink-0 bg-gray-50"
                          onError={(e) => (e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=EBF4FF&size=128&font-size=0.33&bold=true&color=0284C7`)}
                        />
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row justify-between items-start mb-1">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-sky-600 transition-colors">{job.title}</h3>
                            <div className="flex gap-1 mt-2 sm:mt-0 self-start sm:self-center">
                              <Button variant="ghost" size="icon" aria-label="Save job" className="text-gray-500 hover:text-sky-600 hover:bg-sky-50 rounded-full w-8 h-8" onClick={() => toast.info("Save job coming soon!")}><BookmarkPlus className="w-4 h-4" /></Button>
                              <Button variant="ghost" size="icon" aria-label="Share job" className="text-gray-500 hover:text-sky-600 hover:bg-sky-50 rounded-full w-8 h-8" onClick={() => toast.info("Share job coming soon!")}><Share2 className="w-4 h-4" /></Button>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-700 mb-3 text-sm font-medium">
                            <Building2 className="w-4 h-4 mr-1.5 flex-shrink-0 text-gray-500" />{job.company}
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-xs sm:text-sm text-gray-500">
                            <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1.5" />{job.location}</span>
                            <span className="flex items-center"><Briefcase className="w-3.5 h-3.5 mr-1.5" />{job.type}</span>
                            <span className="flex items-center"><DollarSign className="w-3.5 h-3.5 mr-1.5" />{job.salary}</span>
                            <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5" />{formatDatePosted(job.postedDate)}</span>
                            <span className="flex items-center"><Star className="w-3.5 h-3.5 mr-1 text-yellow-400 fill-yellow-400" />{job.rating?.toFixed(1)}</span>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">{job.description}</p>
                          <div className="flex flex-wrap gap-2 mb-5">
                            {job.skills?.slice(0, 5).map((skill, idx) => (<Badge key={idx} variant="outline" className="bg-slate-100 text-slate-700 border-slate-300 text-xs px-2 py-0.5 font-normal rounded">{skill}</Badge>))}
                            {job.skills?.length > 5 && <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-300 text-xs px-2 py-0.5 font-normal rounded">+{job.skills.length - 5} more</Badge>}
                          </div>
                          <div className="flex flex-col sm:flex-row items-center justify-between">
                            <span className="text-xs text-gray-500 mb-2 sm:mb-0">{job.applicants} applicant{job.applicants !== 1 ? 's' : ''}</span>
                            <Button className="bg-sky-500 hover:bg-sky-600 text-white w-full sm:w-auto rounded-lg text-sm py-2 px-4 shadow-sm" onClick={() => handleApplyNowClick(job)}>
                              Apply Now <ArrowRight className="ml-1.5 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                {isLoadingJobs && displayedJobs.length > 0 && (
                    <div className="flex justify-center py-4"><Loader2 className="h-8 w-8 animate-spin text-sky-500" /></div>
                )}
              </>
            ) : ( 
              <Card className="p-8 sm:p-12 text-center border-0 shadow-lg bg-white rounded-xl">
                <Search className="w-16 h-16 mx-auto text-gray-300 mb-5" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Jobs Found</h3>
                <p className="text-gray-500 max-w-md mx-auto">No jobs match your criteria. Try adjusting filters or check back later.</p>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-5 sm:p-6 border-0 shadow-xl rounded-xl bg-white">
              <h3 className="text-xl font-semibold text-gray-800 mb-5">Featured Companies</h3>
              {isLoadingCompanies ? (
                 <div className="space-y-4">{[...Array(3)].map((_,i) => (<div key={i} className="flex items-center gap-4"><div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div><div className="flex-1 space-y-2"> <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div> <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div> </div></div>))}</div>
              ) : featuredCompanies.length > 0 ? (
                <div className="space-y-4">
                  {featuredCompanies.map((company) => (
                    <div key={company._id || company.id} className="flex items-center gap-4 group cursor-pointer hover:bg-slate-50 p-2.5 rounded-lg transition-colors duration-200"
                      onClick={() => { setSearchQuery(company.name); toast.info(`Searching jobs at ${company.name}`); }} tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && setSearchQuery(company.name)} aria-label={`Search jobs from ${company.name}`}
                    >
                      <img src={company.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=random&size=128&font-size=0.33&bold=true&color=fff`}
                        alt={`${company.name} logo`} className="w-12 h-12 rounded-lg object-contain border border-gray-100 p-0.5 group-hover:scale-105 transition-transform bg-gray-50"
                        onError={(e) => (e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=EBF4FF&size=128&font-size=0.33&bold=true&color=0284C7`)}
                      />
                      <div>
                        <h4 className="font-medium text-gray-700 group-hover:text-sky-600 transition-colors text-base">{company.name}</h4>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /><span>{company.rating.toFixed(1)}</span>
                          <span className="text-gray-300">•</span><span>{company.jobs} open position{company.jobs !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : ( <p className="text-gray-500 text-sm">No featured companies available.</p> )}
            </Card>

            <Card className="p-5 sm:p-6 border-0 shadow-xl rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 text-white">
              <h3 className="text-xl font-semibold mb-3">Get Job Alerts</h3>
              <p className="text-sky-100 mb-5 text-sm">Subscribe to receive notifications for new jobs.</p>
              <form onSubmit={handleSubscribeAlerts} className="space-y-3">
                <Input type="email" aria-label="Email for job alerts" placeholder="Enter your email"
                  className="bg-white/90 text-gray-800 placeholder-gray-500 h-11 rounded-md focus:ring-2 focus:ring-white border-transparent"
                  value={alertEmail} onChange={(e: ChangeEvent<HTMLInputElement>) => setAlertEmail(e.target.value)}
                  required disabled={isSubscribing}
                />
                <Button type="submit" className="w-full bg-white text-sky-600 hover:bg-sky-50 font-semibold h-11 rounded-md shadow-sm" disabled={isSubscribing}>
                  {isSubscribing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {isSubscribing ? 'Subscribing...' : 'Subscribe Now'}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>

      {/* Render ApplyJobModal */}
      {selectedJobForApplication && (
        <ApplyJobModal
          isOpen={isApplyModalOpen}
          onClose={() => {
            setIsApplyModalOpen(false);
            setSelectedJobForApplication(null); 
          }}
          job={selectedJobForApplication}
        />
      )}
    </div>
  );
};

export default Vacancies;
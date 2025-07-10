import React, { useEffect, useState, FormEvent, ChangeEvent, useCallback } from "react";
import { Card } from "@/components/ui/card";
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
  Coins,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { ApplyJobModal } from "@/components/ApplyJobModal";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://silver-talent-backend-2.onrender.com/api";

export interface JobLogo {
  public_id?: string;
  url: string;
}


export interface Job {
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
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    categories: ["All Categories"], locations: ["All Locations"], jobTypes: ["All Types"]
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [selectedLocation, setSelectedLocation] = useState<string>("All Locations");
  const [selectedJobType, setSelectedJobType] = useState<string>("All Types");
  const [isLoadingJobs, setIsLoadingJobs] = useState<boolean>(true);
  const [isLoadingFilters, setIsLoadingFilters] = useState<boolean>(true);
  const [jobsError, setJobsError] = useState<string | null>(null);
  const [alertEmail, setAlertEmail] = useState<string>("");
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState<boolean>(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
  const [selectedJobForApplication, setSelectedJobForApplication] = useState<Job | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoadingFilters(true); setIsLoadingJobs(true); setJobsError(null);
      try {
        const [filtersResponse, jobsResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/filter-options`),
          fetch(`${API_BASE_URL}/jobs`),
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

      } catch (error: any) {
        console.error("Error fetching initial data:", error);
        toast.error(error.message || "Could not load initial page data.");
        if (!filterOptions.categories.length || filterOptions.categories[0] === "All Categories") setIsLoadingFilters(false);
        if (displayedJobs.length === 0) {
          setJobsError(error.message || "Failed to load jobs.");
          setDisplayedJobs([]); setIsLoadingJobs(false);
        }
      } finally {
        setInitialLoadComplete(true);
      }
    };
    fetchInitialData();
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
      const handler = setTimeout(() => { fetchJobsWithCurrentFilters(); }, 700);
      return () => clearTimeout(handler);
    }
  }, [searchQuery, selectedCategory, selectedLocation, selectedJobType, initialLoadComplete, fetchJobsWithCurrentFilters]);

  const handleSearchButtonClick = () => fetchJobsWithCurrentFilters();
  const handlePopularSearchClick = (searchTerm: string) => setSearchQuery(searchTerm);

  const handleSubscribeAlerts = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!alertEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(alertEmail)) {
      toast.error("Please enter a valid email address."); return;
    }
    setIsSubscribing(true);
    try {
      const response = await fetch(`${API_BASE_URL}/subscribe`, {
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

  const popularSearches: string[] = ["Sales", "Marketing", "Human Resource", "Finance", "Software", "Manufacturing", "Operations", "Others"];

  const handleApplyNowClick = (job: Job) => {
    setSelectedJobForApplication(job);
    setIsApplyModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-sky-200 selection:text-sky-900">
      <Toaster richColors position="top-center" duration={3000} />

      <div className="relative overflow-hidden bg-[#042c60] text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-soft-light"></div>
        <div className="container mx-auto px-4 py-14 sm:py-14 md:py-14 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm mb-6">
              <span className="text-sm font-medium text-[#fff]">
                {(isLoadingJobs && !initialLoadComplete && displayedJobs.length === 0) ? "Counting jobs..." : `${displayedJobs.length} Jobs Available`}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-[#fff]">
              Find Your <span className="text-indigo-500">Next Opportunity</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#fff] mb-8 leading-relaxed">
              Explore thousands of job openings from leading companies and discover your dream career.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text" aria-label="Search jobs by title, keywords, or company"
                  placeholder="Job title, keywords, or company"
                  className="pl-12 pr-4 py-3 bg-white text-gray-900 text-base rounded-full h-12 w-full shadow-sm focus:ring-2 focus:ring-sky-700 border-gray-300"
                  value={searchQuery} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchButtonClick()}
                />
              </div>
              <Button size="lg" aria-label="Search jobs" className="bg-sky-700 hover:bg-sky-600 text-white px-8 rounded-full h-12 shadow-md" onClick={handleSearchButtonClick} disabled={isLoadingJobs}>
                {isLoadingJobs ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5 sm:mr-2" />}
                <span className="hidden sm:inline">Search</span>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap justify-center items-center gap-2">
              <span className="text-white/70 text-sm mr-1">Popular:</span>
              {popularSearches.map((search) => (
                <Badge key={search} variant="secondary" className="bg-white/10 text-white hover:bg-white/20 cursor-pointer text-xs px-2.5 py-1 rounded-md"
                  onClick={() => handlePopularSearchClick(search)}>{search}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-10 ">
        <Card className="p-4 sm:p-6 shadow-xl border-gray-200 rounded-full bg-white">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-sky-600" />
            <h3 className="text-lg font-semibold text-gray-800">Filter Your Search</h3>
          </div>
          {isLoadingFilters ? (
            <div className="grid md:grid-cols-3 gap-4">{[...Array(3)].map((_, i) => <div key={i} className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>)}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory} disabled={isLoadingJobs}><SelectTrigger className="h-12 rounded-full text-base border-gray-300 focus:ring-sky-500"><SelectValue placeholder="Job Category" /></SelectTrigger><SelectContent>{filterOptions.categories.map((cat) => (<SelectItem key={cat} value={cat} className="text-base">{cat}</SelectItem>))}</SelectContent></Select>
              <Select value={selectedLocation} onValueChange={setSelectedLocation} disabled={isLoadingJobs}><SelectTrigger className="h-12 rounded-full text-base border-gray-300 focus:ring-sky-500"><SelectValue placeholder="Location" /></SelectTrigger><SelectContent>{filterOptions.locations.map((loc) => (<SelectItem key={loc} value={loc} className="text-base">{loc}</SelectItem>))}</SelectContent></Select>
              <Select value={selectedJobType} onValueChange={setSelectedJobType} disabled={isLoadingJobs}><SelectTrigger className="h-12 rounded-full text-base border-gray-300 focus:ring-sky-500"><SelectValue placeholder="Job Type" /></SelectTrigger><SelectContent>{filterOptions.jobTypes.map((jtype) => (<SelectItem key={jtype} value={jtype} className="text-base">{jtype}</SelectItem>))}</SelectContent></Select>
            </div>
          )}
        </Card>
      </div>

      <main className="container mx-auto px-4 py-10 sm:py-12 bg-blue-50">
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ">
            {displayedJobs.map((job) => (
              <Card key={job._id || job.id} className="group bg-[#fff] h-full flex flex-col border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-sky-300 hover:-translate-y-1">
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-start gap-4 mb-4">
                    {/* <img
                      src={job.logo?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=random&size=96&font-size=0.33&bold=true&color=fff`}
                      alt={`${job.company} logo`}
                      className="w-14 h-14 rounded-lg object-contain border border-gray-100 p-1 flex-shrink-0 bg-gray-50"
                      onError={(e) => (e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=EBF4FF&size=96&font-size=0.33&bold=true&color=0284C7`)}
                    /> */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">{job.title}</h3>
                      <div className="flex items-center text-gray-600 text-sm font-medium mt-1">
                        <Building2 className="w-4 h-4 mr-1.5 flex-shrink-0 text-gray-500" />{job.company}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" aria-label="Save job" className="text-gray-400 hover:text-indigo-700 hover:bg-sky-50 rounded-full w-8 h-8 flex-shrink-0" onClick={() => toast.info("Save job coming soon!")}><BookmarkPlus className="w-4 h-4" /></Button>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-xs text-gray-500">
                    <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" />{job.location}</span>
                    <span className="flex items-center"><Briefcase className="w-3.5 h-3.5 mr-1" />{job.type}</span>
                    <span className="flex items-center">
                      <span className="w-4 h-4 text-sm font-semibold">₹</span>
                      {job.salary}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">{job.description}</p>

                  <div className="flex-grow"></div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {job.skills?.slice(0, 4).map((skill) => (<Badge key={skill} variant="outline" className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 font-normal rounded">{skill}</Badge>))}
                    {job.skills?.length > 4 && <Badge variant="outline" className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 font-normal rounded">+{job.skills.length - 4} more</Badge>}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />{formatDatePosted(job.postedDate)}
                    </div>
                    <Button size="sm" className="bg-[#042c60] hover:bg-indigo-700 text-white rounded-md text-sm py-1.5 px-4 shadow-sm" onClick={() => handleApplyNowClick(job)}>
                      Apply Now <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 sm:p-12 text-center border-0 shadow-lg bg-white rounded-xl">
            <Search className="w-16 h-16 mx-auto text-gray-300 mb-5" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Jobs Found</h3>
            <p className="text-gray-500 max-w-md mx-auto">No jobs match your criteria. Try adjusting filters or check back later.</p>
          </Card>
        )}

        <div className="mt-16">
          <Card className="max-w-3xl mx-auto p-6 sm:p-8 border-0 shadow-xl rounded-xl bg-gradient-to-br bg-[#042c60] text-white">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-3 text-[#fff]">Get Job Alerts Directly to Your Inbox</h3>
              <p className="text-sky-100 mb-6 text-base">Be the first to know about new opportunities. Subscribe now!</p>
              <form onSubmit={handleSubscribeAlerts} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <Input type="email" aria-label="Email for job alerts" placeholder="Enter your email"
                  className="flex-1 bg-white/90 text-gray-800 placeholder-gray-500 h-12 rounded-md focus:ring-2 focus:ring-white border-transparent text-base"
                  value={alertEmail} onChange={(e: ChangeEvent<HTMLInputElement>) => setAlertEmail(e.target.value)}
                  required disabled={isSubscribing}
                />
                <Button type="submit" size="lg" className="w-full sm:w-auto bg-white text-sky-600 hover:bg-sky-50 font-semibold h-12 rounded-md shadow-sm" disabled={isSubscribing}>
                  {isSubscribing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </main>

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
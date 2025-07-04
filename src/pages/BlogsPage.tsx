import React, { useState, useEffect, ChangeEvent, useCallback, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, Clock, User, CalendarDays as Calendar, ChevronRight, Search, Tag, Loader2, AlertTriangle, X, UsersRound
} from 'lucide-react';
import { toast, Toaster } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://silver-talent-backend-2.onrender.com/api";

interface BlogImage {
  public_id?: string;
  url: string;
}

interface BlogCategoryRef {
  _id: string;
  name: string;
  slug: string;
}

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  author: string;
  publishDate: string;
  readTime: string;
  featuredImage?: BlogImage;
  category: BlogCategoryRef;
  tags: string[];
  views?: number;
}

interface BlogCategory {
    _id: string;
    name: string;
    slug: string;
    description?: string;
}

const FALLBACK_IMAGE_URL = `https://images.unsplash.com/photo-1505682499293-230dd9df9655?q=80&w=800&auto=format&fit=crop`;

const BlogsPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>("all-categories");
  
  const isInitialMount = useRef(true);

  useEffect(() => {
    document.title = "Blog | Silver Talent";
    const fetchInitialData = async () => {
      setIsLoadingPosts(true);
      setIsLoadingCategories(true);
      setError(null);
      try {
        const [postsResponse, categoriesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/blog/posts`),
          fetch(`${API_BASE_URL}/blog/categories`)
        ]);
        
        if (!postsResponse.ok) throw new Error(`Posts: ${postsResponse.statusText || postsResponse.status}`);
        const postsDataWrapper = await postsResponse.json();
        setBlogPosts(postsDataWrapper.posts || []);

        if (!categoriesResponse.ok) throw new Error(`Categories: ${categoriesResponse.statusText || categoriesResponse.status}`);
        const categoriesData: BlogCategory[] = await categoriesResponse.json();
        setCategories(categoriesData);

      } catch (err: any) {
        setError(err.message || "Failed to load blog content.");
        toast.error(err.message || "Failed to load blog content.");
        setBlogPosts([]);
      } finally {
        setIsLoadingPosts(false);
        setIsLoadingCategories(false);
      }
    };
    fetchInitialData();
  }, []);

  const fetchFilteredPosts = useCallback(async () => {
    setIsLoadingPosts(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (searchTerm.trim()) params.append('search', searchTerm.trim());
      if (selectedCategorySlug && selectedCategorySlug !== "all-categories") {
        params.append('category', selectedCategorySlug);
      }

      const response = await fetch(`${API_BASE_URL}/blog/posts?${params.toString()}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Filtered Posts: ${response.statusText || response.status}` }));
        throw new Error(errorData.message || `Filtered Posts: ${response.statusText || response.status}`);
      }
      const dataWrapper = await response.json();
      setBlogPosts(dataWrapper.posts || []);
    } catch (err: any) {
      setError(err.message || "Failed to load filtered blog posts.");
      toast.error(err.message || "Failed to load filtered posts.");
      setBlogPosts([]);
    } finally {
      setIsLoadingPosts(false);
    }
  }, [searchTerm, selectedCategorySlug]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    const handler = setTimeout(() => {
      fetchFilteredPosts();
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, selectedCategorySlug, fetchFilteredPosts]);
  
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (slug: string) => {
    setSelectedCategorySlug(slug);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const openBlogModal = async (slug: string) => {
    const existingPost = blogPosts.find(p => p.slug === slug);
    if (existingPost && existingPost.content?.length > 0) {
        setSelectedBlog(existingPost);
        return;
    }
    
    try {
        toast.loading("Loading article details...");
        const response = await fetch(`${API_BASE_URL}/blog/posts/${slug}`);
        if (!response.ok) throw new Error("Failed to load article details.");
        const postData: BlogPost = await response.json();
        setSelectedBlog(postData);
        setBlogPosts(prevPosts => prevPosts.map(p => p._id === postData._id ? {...p, views: postData.views} : p));
        toast.dismiss();
    } catch (err: any) {
        toast.dismiss();
        toast.error(err.message || "Could not load article.");
    }
  };

  const PostSkeleton = () => (
    <Card className="overflow-hidden animate-pulse">
      <div className="relative h-48 bg-gray-300"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-full mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
        <div className="h-8 bg-gray-300 rounded w-1/3"></div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-sky-100">
      <Toaster richColors position="top-center" />
      <div className="relative overflow-hidden bg-[#042c60] text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-soft-light"></div>
        <div className="container mx-auto px-4 py-14 sm:py-14 relative">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1.5 bg-white/10 rounded-full backdrop-blur-sm mb-6">
              <span className="text-xs sm:text-sm font-extrabold">Latest Insights & Trends</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-[#fff]">
              Talent & HR <span className="text-[#fff]">Solutions Blog</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#fff] mb-8 leading-relaxed">
              Stay updated with trends, strategies, and best practices in recruitment, HR management, and talent development.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12 sm:-mt-20 relative z-10">
        <Card className="p-4 sm:p-6 bg-white shadow-xl border-gray-200 rounded-full">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search articles by title, keyword, tag..."
                className="w-full pl-11 pr-4 py-2.5 h-11 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-base"
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search blog articles"
              />
            </div>
            <div className="w-full md:w-auto">
              {isLoadingCategories ? (
                <div className="h-11 bg-gray-200 rounded-lg animate-pulse w-full md:w-52"></div>
              ) : (
                <Select value={selectedCategorySlug} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-full md:w-52 h-11 border-gray-300 rounded-3xl text-base focus:ring-sky-500">
                    <SelectValue placeholder="Filter by Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-categories">All Categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat._id} value={cat.slug}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </Card>
      </div>

      <section className="py-16 sm:py-20 px-4 text-blue-100 bg-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Featured Articles
            </h2>
            <div className="w-24 h-1.5 bg-sky-500 mx-auto rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mt-6 text-base md:text-lg">
              Explore our latest insights and expert perspectives on talent management and HR solutions.
            </p>
          </div>

          {isLoadingPosts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => <PostSkeleton key={i} />)}
            </div>
          ) : error ? (
            <div className="text-center py-10 bg-red-50 rounded-lg shadow">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-600 text-lg">{error}</p>
            </div>
          ) : blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((blog) => (
                <Card key={blog._id} className="overflow-hidden group hover:shadow-xl transition-shadow duration-300 rounded-xl border-gray-200 flex flex-col">
                  <div className="relative h-52 sm:h-56 overflow-hidden">
                    <img
                      src={blog.featuredImage?.url || FALLBACK_IMAGE_URL}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE_URL)}
                    />
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                      <Badge variant="default" className="bg-sky-600 text-white text-xs sm:text-sm hover:bg-sky-700">
                        {blog.category.name}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{blog.author}</div>
                      <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{formatDate(blog.publishDate)}</div>
                      <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{blog.readTime}</div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 group-hover:text-sky-600 transition-colors leading-tight">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                      {blog.excerpt}
                    </p>
                    <Button
                      variant="link"
                      className="text-sky-600 hover:text-sky-700 p-0 group self-start mt-auto font-semibold"
                      onClick={() => openBlogModal(blog.slug)}
                      aria-label={`Read more about ${blog.title}`}
                    >
                      Read More
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 col-span-full">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Dialog open={!!selectedBlog} onOpenChange={(isOpen) => !isOpen && setSelectedBlog(null)}>
        <DialogContent className="max-w-3xl w-[95vw] max-h-[90vh] overflow-y-auto p-0 rounded-lg bg-blue-50">
          {selectedBlog && (
            <>
            <DialogHeader className="p-6 pb-4 border-b sticky top-0 bg-blue-50 z-10 rounded-t-lg">
              <DialogTitle className="text-2xl sm:text-3xl font-bold text-gray-800 pr-10">{selectedBlog.title}</DialogTitle>
              <DialogClose key="dialog-close-button" className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogHeader>
            <div className="p-6 pt-2">
              <div className="relative h-56 sm:h-72 md:h-80 mb-6 rounded-md overflow-hidden bg-gray-200">
                <img
                  src={selectedBlog.featuredImage?.url || FALLBACK_IMAGE_URL}
                  alt={selectedBlog.title}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE_URL)}
                />
              </div>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1.5"><User className="w-4 h-4" />{selectedBlog.author}</div>
                <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(selectedBlog.publishDate)}</div>
                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{selectedBlog.readTime}</div>
                {selectedBlog.views !== undefined && <div className="flex items-center gap-1.5"><UsersRound className="w-4 h-4" />{selectedBlog.views} views</div>}
              </div>

              <article className="prose prose-slate lg:prose-lg max-w-none text-gray-700 leading-relaxed">
                {selectedBlog.content.map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </article>

              {selectedBlog.tags && selectedBlog.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedBlog.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs sm:text-sm font-normal"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogsPage;
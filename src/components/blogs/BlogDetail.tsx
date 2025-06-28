import { useParams } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, BookmarkPlus, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const BlogDetail = () => {
  const { id } = useParams();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // This would typically come from an API or database
  const blogData = {
    title: "Recruitment Services",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    date: "March 15, 2024",
    author: "Silver Talent Team",
    readTime: "5 min read",
    content: [
      "Silver Talent is a trusted name in recruitment, specializing in both IT and Non-IT hiring solutions. Leveraging advanced technology and a client-first approach, we develop customized strategies tailored to your specific workforce needs.",
      "With deep expertise and insight into evolving market dynamics, we excel at identifying and recommending top-tier talent that aligns with your business goals. As a respected recruitment partner, we offer end-to-end solutions—including sourcing, screening, interviewing, and placement—ensuring efficient and impactful hiring to drive your company's success.",
      "As a leading placement consultancy, we go beyond the active job market to engage high-caliber professionals, ensuring that our clients connect with the right talent—not just those currently seeking new opportunities. Our process is private, efficient, cost-effective, and time-sensitive."
    ],
    relatedTopics: [
      "HR Management",
      "Talent Acquisition",
      "Workforce Planning",
      "Employee Engagement",
      "Career Development",
      "Professional Growth"
    ],
    relatedPosts: [
      {
        title: "Executive Search Strategies",
        image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop",
        date: "March 10, 2024"
      },
      {
        title: "Future of HR Technology",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
        date: "March 5, 2024"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Image with Gradient Overlay */}
      <div className="relative h-[500px] w-full">
        <img 
          src={blogData.image} 
          alt={blogData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 flex items-center justify-center">
          <div className="text-center max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {blogData.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{blogData.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{blogData.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{blogData.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button and Action Buttons */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/blogs">
          <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-100">
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <Share2 className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <BookmarkPlus className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="lg:w-1/4 space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Related Topics</h3>
              <div className="space-y-2">
                {blogData.relatedTopics.map((topic, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors border border-gray-100"
                  >
                    {topic}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Related Posts</h3>
              <div className="space-y-4">
                {blogData.relatedPosts.map((post, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="relative h-40 rounded-lg overflow-hidden mb-2">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="font-medium text-gray-800 group-hover:text-sky-600 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-sm text-gray-500">{post.date}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <Card className="p-8 shadow-lg">
              <div className="prose prose-lg max-w-none">
                {blogData.content.map((paragraph, index) => (
                  <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {blogData.relatedTopics.map((topic, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail; 
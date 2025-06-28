// src/pages/ServiceDetailPage.tsx
import { useEffect } from 'react';
import { useParams, Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { servicesContent } from './Services';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Share2, BookmarkPlus } from 'lucide-react';

// Type for Service item, ensure it matches the one in Services.tsx
interface ServiceItem {
  id: string;
  icon: React.ElementType;
  title: string;
  content: string[];
  delay?: string;
}

const ServiceDetailPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const service = servicesContent.find(s => s.id === serviceId);
  const IconComponent = service?.icon;

  // Get related services (excluding current service)
  const relatedServices = servicesContent
    .filter(s => s.id !== serviceId)
    .slice(0, 3); // Show only 3 related services

  useEffect(() => {
    window.scrollTo(0, 0);
    if (service) {
      document.title = `${service.title} | Services | Silver Talent`;
    } else {
      document.title = "Service Not Found | Silver Talent";
    }
  }, [service]);

  const handleGoBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else if (window.history.length > 1 && document.referrer.startsWith(window.location.origin)) {
      navigate(-1);
    } else {
      navigate('/services');
    }
  };

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-0 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Service Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">The service you are looking for does not exist.</p>
        <Button onClick={handleGoBack} className="bg-sky-600 hover:bg-sky-700 text-white">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section with Icon */}
      <div className="relative h-[500px] w-full bg-[#111827]">
        <div className="absolute inset-0 bg-[#111827] flex items-center justify-center">
          <div className="text-center max-w-4xl px-4">
            <div className="bg-sky-600 p-8 rounded-full mb-6 inline-block">
              {IconComponent && <IconComponent className="w-20 h-20 text-white" />}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-sky-600 mb-6">
              {service.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Back Button and Action Buttons */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center ">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 hover:bg-gray-100"
          onClick={handleGoBack}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Services
        </Button>
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
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Related Services</h3>
              <div className="space-y-4">
                {relatedServices.map((relatedService) => (
                  <RouterLink 
                    key={relatedService.id}
                    to={`/services/${relatedService.id}`}
                    className="group block"
                  >
                    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100">
                      <div className="flex items-center gap-3">
                        {relatedService.icon && (
                          <div className="bg-sky-100 p-2 rounded-full">
                            <relatedService.icon className="w-6 h-6 text-sky-600" />
                          </div>
                        )}
                        <h4 className="font-medium text-gray-800 group-hover:text-sky-600 transition-colors">
                          {relatedService.title}
                        </h4>
                      </div>
                    </div>
                  </RouterLink>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 border-gray-700">
            <Card className="p-8 shadow-2xl">
              <div className="prose prose-lg max-w-none">
                {service.content.map((paragraph, index) => (
                  <p key={index} className="mb-6 text-black leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {relatedServices.map((relatedService, index) => (
                    <RouterLink 
                      key={index}
                      to={`/services/${relatedService.id}`}
                    >
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer">
                        #{relatedService.title}
                      </span>
                    </RouterLink>
                  ))}
                </div>
              </div>
            </Card>

            <div className="mt-8 text-center">
              <RouterLink to="/contact">
                <Button size="lg" className="bg-[#111827] hover:bg-sky-700 text-white px-8 py-3">
                  Get in Touch
                </Button>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
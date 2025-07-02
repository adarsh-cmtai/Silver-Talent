import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Loader2 } from 'lucide-react';

const countryCodes = [
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+1", name: "USA", flag: "🇺🇸" },
  { code: "+44", name: "UK", flag: "🇬🇧" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+971", name: "UAE", flag: "🇦🇪" },
];

const ContactForm = () => {
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [formData, setFormData] = useState({
    yourName: "",
    yourEmail: "",
    phone: "",
    yourMessage: ""
  });
  const [formErrors, setFormErrors] = useState({
    yourName: false,
    yourEmail: false,
    phone: false,
    yourMessage: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("form-animated");
          }
        });
      },
      { threshold: 0.1 }
    );
    const elementsToObserve = document.querySelectorAll(".form-animate-on-scroll");
    elementsToObserve.forEach((el) => observer.observe(el));
    return () => elementsToObserve.forEach((el) => observer.unobserve(el));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
        setFormErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleCountryChange = (country: typeof countryCodes[0]) => {
    setSelectedCountry(country);
  };

  const validateForm = () => {
    const errors = {
      yourName: formData.yourName.trim().length < 2,
      yourEmail: !/^\S+@\S+\.\S+$/.test(formData.yourEmail),
      phone: !/^\d{7,15}$/.test(formData.phone.trim()),
      yourMessage: formData.yourMessage.trim().length < 10
    };
    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill out all required fields correctly.");
      return;
    }
    setIsSubmitting(true);

    const apiEndpoint = import.meta.env.VITE_API_CONTACT_ENDPOINT || "https://silver-talent-backend-2.onrender.com/api/contact-us";

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          yourName: formData.yourName,
          yourEmail: formData.yourEmail,
          phone: `${selectedCountry.code}${formData.phone}`,
          yourMessage: formData.yourMessage,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "An unknown error occurred.");
      
      toast.success(result.message || "Message sent successfully!");
      setFormData({ yourName: "", yourEmail: "", phone: "", yourMessage: "" });
      setFormErrors({ yourName: false, yourEmail: false, phone: false, yourMessage: false });

    } catch (error: any) {
      toast.error(error.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const baseInputClasses = "h-12 text-base bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 rounded-md";
  const errorInputClasses = "border-red-500 ring-red-500";
  
  return (
    <>
      <Toaster richColors position="top-center" />
      <section className="py-8 md:py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 bg-slate-50 rounded-2xl overflow-hidden">
            <div className="relative hidden lg:block form-animate-on-scroll">
              <img
                src="/image/Contact/image1.jpg"
                alt="Business meeting for contact"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-8 sm:p-12 form-animate-on-scroll">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Get in Touch
                </h2>
                <p className="mt-2 text-slate-600">
                  We’re here to help. Send us a message and we'll get back to you.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="yourName" className="block text-sm font-medium text-slate-700 mb-1.5">Your Name</label>
                    <Input id="yourName" name="yourName" value={formData.yourName} onChange={handleChange}
                      className={`${baseInputClasses} ${formErrors.yourName && errorInputClasses}`}
                      placeholder="John Doe" disabled={isSubmitting} autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="yourEmail" className="block text-sm font-medium text-slate-700 mb-1.5">Your Email</label>
                    <Input id="yourEmail" name="yourEmail" type="email" value={formData.yourEmail} onChange={handleChange}
                      className={`${baseInputClasses} ${formErrors.yourEmail && errorInputClasses}`}
                      placeholder="john.doe@example.com" disabled={isSubmitting} autoComplete="email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                  <div className="flex items-stretch">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-12 flex items-center px-3 bg-slate-200/60 border-r-0 rounded-r-none border-slate-200 hover:bg-slate-200" disabled={isSubmitting}>
                          <span className="text-xl">{selectedCountry.flag}</span>
                          <ChevronDown className="w-4 h-4 ml-2 text-slate-500" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="max-h-60 overflow-y-auto">
                        {countryCodes.map((country) => (
                          <DropdownMenuItem key={country.code + country.name} onSelect={() => handleCountryChange(country)} className="cursor-pointer text-base py-2">
                            <span className="text-xl mr-3">{country.flag}</span>
                            <span>{country.name} ({country.code})</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange}
                      className={`${baseInputClasses} rounded-l-none flex-grow ${formErrors.phone && errorInputClasses}`}
                      placeholder="9876543210" disabled={isSubmitting} autoComplete="tel-national"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="yourMessage" className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                  <textarea id="yourMessage" name="yourMessage" rows={5} cols={55} value={formData.yourMessage} onChange={handleChange}
                    className={`${baseInputClasses} h-auto resize-none ${formErrors.yourMessage && errorInputClasses}`}
                    placeholder="How can we help you today?" disabled={isSubmitting}
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" size="lg" className="w-full bg-[#042c60] hover:bg-indigo-700 text-white text-base font-semibold" disabled={isSubmitting}>
                    {isSubmitting ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>) : "Send Message"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
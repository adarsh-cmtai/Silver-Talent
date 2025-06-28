// components/ContactForm.tsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from '@heroicons/react/20/solid';

// Define country codes
const countryCodes = [
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+1", name: "USA", flag: "🇺🇸" },
  { code: "+44", name: "UK", flag: "🇬🇧" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  // ... add more countries
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleCountryChange = (country: typeof countryCodes[0]) => {
    setSelectedCountry(country);
  };

  const validateForm = () => {
    const errors = {
      yourName: formData.yourName.trim() === "",
      yourEmail: !/^\S+@\S+\.\S+$/.test(formData.yourEmail),
      phone: !/^\d{7,15}$/.test(formData.phone.trim()),
      yourMessage: formData.yourMessage.trim() === ""
    };
    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please correct the errors in the form.");
      return;
    }
    setIsSubmitting(true);

    const fullPhoneNumber = `${selectedCountry.code}${formData.phone}`;
    const dataToSubmit = {
      yourName: formData.yourName,
      yourEmail: formData.yourEmail,
      phone: formData.phone,
      yourMessage: formData.yourMessage,
      fullPhoneNumber: fullPhoneNumber,
      countryCode: selectedCountry.code,
      countryName: selectedCountry.name,
    };

    // --- THIS IS THE KEY AREA FOR THE ERROR ---
    // Accessing Next.js public environment variables
    // const apiEndpoint = process.env.NEXT_PUBLIC_CONTACT_API_ENDPOINT;
    // It's good practice to provide a fallback, but the primary check is if NEXT_PUBLIC_CONTACT_API_ENDPOINT is set
    const effectiveApiEndpoint = "https://silver-talent-backend-2.onrender.com/api/contact-us"; // Fallback

    // Log what apiEndpoint resolves to for debugging
    // console.log("Using API Endpoint:", effectiveApiEndpoint);
    // if (!apiEndpoint) { // Log if the env var itself was not found
    //     console.warn("Warning: NEXT_PUBLIC_CONTACT_API_ENDPOINT environment variable was not found. Using fallback URL.");
    // }


    if (!effectiveApiEndpoint) { // Should not happen if fallback is present, but good for sanity
        toast.error("API endpoint is not configured. Please contact support.");
        console.error("Critical Error: API endpoint could not be determined.");
        setIsSubmitting(false);
        return;
    }

    try {
      const response = await fetch(effectiveApiEndpoint, { // Use the determined endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success(result.message || "Message sent successfully!");
        setFormData({ yourName: "", yourEmail: "", phone: "", yourMessage: "" });
        setSelectedCountry(countryCodes[0]);
        setFormErrors({ yourName: false, yourEmail: false, phone: false, yourMessage: false });
      } else {
        toast.error(result.message || `Error: ${response.statusText}`);
        console.error("API Error:", response.status, result);
      }
    } catch (error: any) {
      console.error("Form Submission Error:", error);
      toast.error(error.message || "An unexpected network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... (rest of your component: styling classes and JSX)
  const inputContainerBaseClasses = "flex items-stretch overflow-hidden rounded-md bg-slate-100 border-2";
  const inputFocusWithinClasses = "focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500";
  const inputErrorClasses = "border-red-500 focus-within:ring-red-500";
  const inputNormalClasses = "border-slate-100";
  const singleInputBaseClasses = "w-full bg-slate-100 border-2 text-sm p-3 rounded-md placeholder:text-gray-500";
  const singleInputFocusClasses = "focus:border-sky-500 focus:ring-1 focus:ring-sky-500";

  return (
    <section className="py-12 md:py-16 bg-slate-50 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-10 md:mb-14 form-animate-on-scroll">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-gray-800">
            Leave A Message
          </h2>
          <div className="w-24 h-1 bg-sky-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="relative form-animate-on-scroll overflow-hidden rounded-lg p-6 md:p-8">
            <div className="absolute inset-0 -z-10" aria-hidden="true">
              <div
                className="h-full w-full bg-sky-100"
                style={{ clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 80%)" }}
              ></div>
            </div>
            <img
              src="/image/Contact/image1.jpg"
              alt="Contact us illustration"
              className="relative w-full h-auto max-w-md mx-auto rounded-lg object-contain"
            />
          </div>

          <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl border border-gray-700 form-animate-on-scroll">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="yourName" className="block text-sm font-medium text-gray-600 mb-1.5">
                    Your Name<span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="yourName" name="yourName" value={formData.yourName} onChange={handleChange}
                    className={`${singleInputBaseClasses} ${formErrors.yourName ? 'border-red-500 focus:ring-red-500' : inputNormalClasses} ${singleInputFocusClasses}`}
                    placeholder="Enter your full name" disabled={isSubmitting} autoComplete="name"
                  />
                  {formErrors.yourName && <p className="text-red-500 text-xs mt-1">Please enter your name.</p>}
                </div>
                <div>
                  <label htmlFor="yourEmail" className="block text-sm font-medium text-gray-600 mb-1.5">
                    Your Email<span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="yourEmail" name="yourEmail" type="email" value={formData.yourEmail} onChange={handleChange}
                    className={`${singleInputBaseClasses} ${formErrors.yourEmail ? 'border-red-500 focus:ring-red-500' : inputNormalClasses} ${singleInputFocusClasses}`}
                    placeholder="Enter your email address" disabled={isSubmitting} autoComplete="email"
                  />
                  {formErrors.yourEmail && <p className="text-red-500 text-xs mt-1">Please enter a valid email address.</p>}
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1.5">
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <div className={`${inputContainerBaseClasses} ${formErrors.phone ? inputErrorClasses : inputNormalClasses} ${inputFocusWithinClasses} ${isSubmitting ? 'opacity-70' : ''}`}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline"
                        className="flex items-center px-3 py-2.5 bg-slate-200/70 border-none rounded-r-none hover:bg-slate-300/70 focus:ring-0"
                        disabled={isSubmitting} type="button">
                        <span className="text-lg">{selectedCountry.flag}</span>
                        <span className="ml-2 text-sm text-gray-700">{selectedCountry.code}</span>
                        <ChevronDownIcon className="w-4 h-4 ml-1.5 text-gray-600" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="max-h-60 overflow-y-auto">
                      {countryCodes.map((country) => (
                        <DropdownMenuItem key={country.code + country.name} onSelect={() => handleCountryChange(country)} className="cursor-pointer">
                          <span className="text-lg mr-2">{country.flag}</span>
                          <span>{country.name} ({country.code})</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Input
                    id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange}
                    className="!p-3 !text-sm !flex-grow !bg-transparent !border-none focus:!ring-0 placeholder:!text-gray-400 rounded-l-none"
                    placeholder="Enter phone number" disabled={isSubmitting} autoComplete="tel-national"
                  />
                </div>
                {formErrors.phone && <p className="text-red-500 text-xs mt-1">Please enter a valid phone number (7-15 digits).</p>}
              </div>

              <div>
                <label htmlFor="yourMessage" className="block text-sm font-medium text-gray-600 mb-1.5">
                  Your Message<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="yourMessage" name="yourMessage" rows={5} value={formData.yourMessage} onChange={handleChange}
                  className={`${singleInputBaseClasses} resize-none ${formErrors.yourMessage ? 'border-red-500 focus:ring-red-500' : inputNormalClasses} ${singleInputFocusClasses}`}
                  placeholder="Type your message here..." disabled={isSubmitting}
                />
                {formErrors.yourMessage && <p className="text-red-500 text-xs mt-1">Please enter your message.</p>}
              </div>

              <div className="pt-4">
                <Button type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-base font-semibold transition-colors h-12 disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </div>
                  ) : "Submit Message"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
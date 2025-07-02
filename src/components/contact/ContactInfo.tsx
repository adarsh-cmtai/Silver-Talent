import React, { useState, useEffect, useRef } from "react";
import { Map, Phone, Mail, AlertTriangle, Loader } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://silver-talent-backend.onrender.com/api";

const ContactInfo = () => {
  const [contactDetails, setContactDetails] = useState({
    address: "",
    phone: "",
    email: "",
    locationMapUrl: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchContactData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/contact-info`);
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setContactDetails(data);
      } catch (e) {
        setError(e.message || "Failed to load contact information.");
        setContactDetails({
          address: "Not Available",
          phone: "Not Available",
          email: "Not Available",
          locationMapUrl: ""
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = [sectionRef.current, mapRef.current, ...itemsRef.current].filter(Boolean);
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [isLoading]);

  const infoItems = [
    {
      id: 1,
      title: "Our Address",
      details: contactDetails.address,
      icon: <Map className="w-9 h-9" />,
      link: contactDetails.locationMapUrl ? `https://www.google.com/maps?q=${encodeURIComponent(contactDetails.address)}` : null,
      target: "_blank"
    },
    {
      id: 2,
      title: "Call Us",
      details: contactDetails.phone,
      icon: <Phone className="w-9 h-9" />,
      link: `tel:${contactDetails.phone?.replace(/[^\d+]/g, '')}`
    },
    {
      id: 3,
      title: "Email Us",
      details: contactDetails.email,
      icon: <Mail className="w-9 h-9" />,
      link: `mailto:${contactDetails.email}`
    }
  ];

  if (isLoading) {
    return (
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-10 bg-slate-200 rounded-md w-1/2 mx-auto mb-4"></div>
            <div className="h-6 bg-slate-200 rounded-md w-3/4 mx-auto mb-16"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-slate-100 rounded-2xl h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error && !contactDetails.address) {
    return (
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center bg-red-50 p-10 rounded-2xl text-center">
            <AlertTriangle className="w-16 h-16 text-red-400 mb-5" />
            <h3 className="text-2xl font-semibold text-red-800 mb-2">Something Went Wrong</h3>
            <p className="text-red-600 max-w-md">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-8 bg-white">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="text-center mb-8 contact-animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We're here to help and answer any question you might have. We look forward to hearing from you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {infoItems.map((item, index) => {
            const isUnavailable = !item.details || item.details === "Not Available";
            const CardContent = () => (
              <>
                <div className={`w-20 h-20 flex items-center justify-center rounded-full transition-all duration-300 ${isUnavailable ? 'bg-slate-200 text-slate-400' : 'bg-sky-100 text-sky-600 group-hover:bg-sky-600 group-hover:text-white group-hover:scale-110'}`}>
                  {item.icon}
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{item.title}</h3>
                  <p className={`text-base break-words ${isUnavailable ? 'text-slate-400' : 'text-slate-600 group-hover:text-sky-600'}`}>{item.details}</p>
                </div>
              </>
            );

            return (
              <div
                key={item.id}
                ref={el => (itemsRef.current[index] = el)}
                className="contact-animate-on-scroll"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {item.link && !isUnavailable ? (
                  <a
                    href={item.link}
                    target={item.target || "_self"}
                    rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                    className="group text-center bg-slate-50 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:bg-white border border-transparent hover:border-slate-200 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center h-full"
                  >
                    <CardContent />
                  </a>
                ) : (
                  <div className="group text-center bg-slate-50 p-8 rounded-2xl shadow-sm transition-all duration-300 flex flex-col items-center h-full">
                    <CardContent />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {contactDetails.locationMapUrl && (
          <div ref={mapRef} className="mt-10 md:mt-10 contact-animate-on-scroll" style={{ transitionDelay: "300ms" }}>
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold text-slate-800">Our Location</h3>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-w-16 aspect-h-9">
              <iframe
                src={contactDetails.locationMapUrl}
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Company Location Map"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactInfo;
// src/components/ContactInfo.jsx
import React, { useState, useEffect, useRef } from "react"; // Added useRef
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://silver-talent-backend.onrender.com/api"; // Consistent API URL

/**
 * @typedef {Object} ContactDetails
 * @property {string} address
 * @property {string} phone
 * @property {string} email
 * @property {string} locationMapUrl
 */

const ContactInfo = () => {
  /** @type {[ContactDetails, React.Dispatch<React.SetStateAction<ContactDetails>>]} */
  const [contactDetails, setContactDetails] = useState({
    address: "Loading...",
    phone: "Loading...",
    email: "Loading...",
    locationMapUrl: ""
  });
  /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
  const [isLoading, setIsLoading] = useState(true);
  /** @type {[string | null, React.Dispatch<React.SetStateAction<string | null>>]} */
  const [error, setError] = useState(null);

  // Refs for elements that need observation
  const sectionRef = useRef(null);
  const itemsRef = useRef([]); // To store refs for individual info items
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
        console.error("Failed to fetch contact info:", e);
        setError(e.message || "Failed to load contact information. Please try again later.");
        // Set to N/A on fetch failure after initial "Loading..."
        setContactDetails({
          address: "N/A",
          phone: "N/A",
          email: "N/A",
          locationMapUrl: ""
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactData();
  }, []); // Empty dependency array, fetch once on mount


  // Intersection Observer for animations
  useEffect(() => {
    const currentSectionRef = sectionRef.current; // Capture current value of ref
    const currentMapRef = mapRef.current;
    
    // Create a new observer instance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            // observer.unobserve(entry.target); // Optional: stop observing after animation
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        // rootMargin: "-50px 0px -50px 0px" // Optional: adjust viewport
      }
    );

    // Observe the main section title
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    // Observe individual contact items
    itemsRef.current.forEach((itemEl) => {
      if (itemEl) {
        observer.observe(itemEl);
      }
    });
    
    // Observe the map
    if (currentMapRef) {
        observer.observe(currentMapRef);
    }

    // Cleanup function: unobserve all elements when the component unmounts or dependencies change
    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
      itemsRef.current.forEach((itemEl) => {
        if (itemEl) {
          observer.unobserve(itemEl);
        }
      });
      if (currentMapRef) {
        observer.unobserve(currentMapRef);
      }
    };
  }, [isLoading]); // Re-run observer setup if isLoading changes (elements might re-render)


  const infoItems = [
    {
      id: 1,
      title: "Address",
      details: contactDetails.address,
      icon: <MapPinIcon className="w-7 h-7 text-orange-600 group-hover:scale-110 transition-transform" />,
      iconBg: "bg-orange-100 group-hover:bg-orange-200",
    },
    {
      id: 2,
      title: "Call Us",
      details: contactDetails.phone,
      icon: <PhoneIcon className="w-7 h-7 text-yellow-600 group-hover:scale-110 transition-transform" />,
      iconBg: "bg-yellow-100 group-hover:bg-yellow-200",
    },
    {
      id: 3,
      title: "Email Us",
      details: contactDetails.email,
      icon: <EnvelopeIcon className="w-7 h-7 text-teal-600 group-hover:scale-110 transition-transform" />,
      iconBg: "bg-teal-100 group-hover:bg-teal-200",
    }
  ];

  // CSS for animations, injected via <style> tag
  // This is a common pattern for component-specific non-dynamic styles.
  // For more complex animations or global styles, use a CSS file.
  const animationStyles = `
    .contact-animate-on-scroll {
      opacity: 0;
      transform: translateY(30px); /* Start slightly lower */
      transition: opacity 0.6s cubic-bezier(0.645, 0.045, 0.355, 1), 
                  transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    .contact-animate-on-scroll.animated {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          {/* Basic Skeleton Loader */}
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded-md w-1/3 mx-auto mb-3"></div>
            <div className="h-4 bg-gray-300 rounded-md w-12 mx-auto mb-6"></div>
            <div className="h-5 bg-gray-300 rounded-md w-3/4 mx-auto mb-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-200 p-6 rounded-xl shadow-lg h-32"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error if data couldn't be fetched at all AND it's not just the initial "Loading..." state
  if (error && contactDetails.address === "N/A") {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center justify-center bg-red-50 p-8 rounded-lg shadow">
            <EnvelopeIcon className="w-16 h-16 text-red-400 mb-4" /> {/* Example icon */}
            <h3 className="text-2xl font-semibold text-red-700 mb-2">Oops! Something went wrong.</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <style>{animationStyles}</style>
      <section className="py-16 md:py-24 bg-slate-50"> {/* Changed background for better contrast */}
        <div className="container mx-auto px-4">
          <div 
            ref={sectionRef} 
            className="text-center mb-12 md:mb-16 contact-animate-on-scroll"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Get In Touch
            </h2>
            <div className="w-24 h-1.5 bg-sky-500 mx-auto rounded-full"></div> {/* Styled underline */}
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              We're here to help and answer any question you might have. We look forward to hearing from you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {infoItems.map((item, index) => (
              <div
                key={item.id}
                ref={el => itemsRef.current[index] = el} // Assign ref to each item
                className="contact-animate-on-scroll group bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-start space-x-5"
                style={{ transitionDelay: `${index * 0.1}s` }} // Stagger animation slightly
              >
                <div className={`p-3.5 sm:p-4 rounded-full ${item.iconBg} flex-shrink-0 transition-colors duration-300`}>
                  {item.icon}
                </div>
                <div className="flex-1"> {/* Allow text to take remaining space */}
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">{item.title}</h3>
                  {item.details === "N/A" || item.details === "Loading..." ? (
                     <p className="text-gray-500 text-sm">{item.details}</p>
                  ) : item.title === "Email Us" ? ( // Changed title slightly for clarity
                    <a href={`mailto:${item.details}`} className="text-gray-700 text-sm hover:text-sky-600 break-all transition-colors duration-300">
                      {item.details}
                    </a>
                  ) : item.title === "Call Us" ? (
                    <a href={`tel:${item.details.replace(/[^\d+]/g, '')}`} className="text-gray-700 text-sm hover:text-sky-600 transition-colors duration-300">
                      {item.details}
                    </a>
                  ) : (
                    <p className="text-gray-700 text-sm">{item.details}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {contactDetails.locationMapUrl && contactDetails.locationMapUrl !== "N/A" && contactDetails.locationMapUrl.trim() !== "" && (
            <div 
                ref={mapRef}
                className="mt-16 md:mt-20 contact-animate-on-scroll" 
                style={{ transitionDelay: `${infoItems.length * 0.1}s` }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">Our Location on Map</h3>
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-2xl border border-gray-200">
                <iframe
                  src={contactDetails.locationMapUrl}
                  width="100%"
                  height="450" // Standard height, can be responsive with CSS
                  style={{ border: 0 }}
                  allowFullScreen={true} // Standard boolean prop in JSX
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Company Location Map" // More descriptive title
                ></iframe>
              </div>
            </div>
          )}
          {/* Display error below map if it occurred but some data (like map URL) might still be valid */}
          {error && contactDetails.address !== "N/A" && (
            <p className="text-center text-red-500 mt-8">{error}</p>
          )}
        </div>
      </section>
    </>
  );
};

export default ContactInfo;
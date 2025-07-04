import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTelegramPlane,
  FaChevronUp,
  FaPhoneAlt
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // Using FaXTwitter for the X icon

const SocialLinks = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
        }
      });
    }, { threshold: 0.1 });
    
    const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
    elementsToAnimate.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elementsToAnimate.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  // Scroll-to-top button visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialMediaLinks = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      link: "https://facebook.com", // Replace with actual link
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      link: "https://instagram.com", // Replace with actual link
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      link: "https://linkedin.com", // Replace with actual link
    },
    {
      name: "X (Twitter)",
      icon: <FaXTwitter />,
      link: "https://twitter.com", // Replace with actual link
    },
    {
      name: "YouTube",
      icon: <FaYoutube />,
      link: "https://youtube.com", // Replace with actual link
    },
    // {
    //   name: "Telegram",
    //   icon: <FaTelegramPlane />,
    //   link: "https://telegram.org", // Replace with actual link
    // },
  ];

  // Define colors based on the image
  const navyColor = "#4338CA"; // Example: Tailwind's indigo-800 or a custom navy
  const yellowColor = "#042c60"; // Example: Tailwind's amber-500 or a custom gold/yellow

  return (
    <>
      <section className="py-16 px-4 bg-[#F0F4F8] animate-on-scroll"> {/* Full width light background */}
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: yellowColor }}>
            WE LOVE TO BE <span style={{ color: navyColor }}>Social!</span>
          </h2>
          <p className="text-lg md:text-xl mb-12" style={{ color: yellowColor }}>
            A World Full of Possibilities !
          </p>
          
          <div className="flex justify-center items-center space-x-3 sm:space-x-4 md:space-x-6">
            {socialMediaLinks.map((social, index) => (
              <a 
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform duration-300 ease-in-out hover:scale-110 rounded-lg"
                aria-label={`Follow us on ${social.name}`}
                style={{ backgroundColor: yellowColor }}
                // Adjust padding and size for responsiveness
                // w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl
              >
                <div 
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center text-2xl sm:text-3xl"
                  style={{ color: "white" }}
                >
                  {social.icon}
                </div>
                <span className="sr-only">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll-to-top button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-opacity duration-300 ease-in-out hover:opacity-80 z-50"
          style={{ backgroundColor: navyColor, color: 'white' }}
          aria-label="Scroll to top"
        >
          <FaChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {/* Optional: Call button (styled like the image's top right if it's part of this component's responsibility) */}
      {/* This is often a global element, but if needed here: */}
      {/* <a
        href="tel:+1234567890" // Replace with actual phone number
        className="fixed top-4 right-4 p-3 rounded-md shadow-lg z-50 text-xl"
        style={{ backgroundColor: yellowColor, color: navyColor }}
        aria-label="Call us"
      >
        <FaPhoneAlt />
      </a> */}
    </>
  );
};

export default SocialLinks;
import { useEffect } from "react";

// It's good practice to define a placeholder for the illustration if you don't have the asset yet.
// The user should replace the img src with their actual illustration.
const IllustrationPlaceholder = () => (
  <div className="w-full max-w-lg xl:max-w-lg mx-auto"> {/* Adjusted max-width for better scaling */}
    {/* 
      USER: Replace the src attribute with the path to your actual illustration.
      The illustration in the image is complex and contains:
      - A person with a headset at a computer.
      - Speech bubbles with icons: email, question mark, phone, calendar.
      - A light blue, organic/wavy background shape immediately behind these elements.
    */}
    <img 
      src="/image/Contact/image1.png" // Placeholder image
      alt="Contact us illustration showing a support agent" 
      className="w-full h-auto" 
    />
  </div>
);

const ContactHeader = () => {
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

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section className="relative pt-10 pb-20 md:pt-3 md:pb-36 bg-white overflow-x-hidden">
      {/* Light blue background shape for the right side */}
      {/* This attempts to mimic the curved background from the image. 
          For an exact match to an organic curve, an SVG or image asset would be better. */}
      <div
        className="absolute inset-y-0 right-0 w-full md:w-3/4 lg:w-2/3 xl:w-3/5 -z-0"
        aria-hidden="true"
      >
        <div
          className="h-full bg-sky-100" // Light blue background
          style={{
            clipPath:
              "polygon(20% 0%, 100% 0%, 100% 100%, 0% 80%)", // Creates a slanted left edge
              // On smaller screens, this might need adjustment or a different approach.
              // e.g. on mobile when layout is stacked. This polygon is more for desktop.
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:gap-8">
          {/* Left Column: Text Content */}
          <div className="md:w-5/12 lg:w-2/5 text-center md:text-left mb-12 md:mb-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-gray-900 mb-6 animate-on-scroll">
              Contact <span className="font-bold">Us</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-8 animate-on-scroll leading-relaxed">
              Get in touch to discuss how,we can collaborate to find the right talent for your organization. Feel free to share any current challenging requirement —our team is confident you’ll be impressed by the speed and quality of our recruitment solutions.
            </p>
            <p>
              We’re accessible across various digital and offline communication channels to assist you with any questions you may have. Here’s how you can connect with our experts.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 my-5 rounded-md text-sm md:text-base transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 animate-on-scroll">
              LEARN MORE
            </button>
          </div>

          {/* Right Column: Illustration */}
          <div className="md:w-7/12 lg:w-3/5 flex justify-center md:justify-end items-center pl-0 md:pl-4 lg:pl-8">
            <div className="animate-on-scroll w-full">
              <IllustrationPlaceholder />
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Vertical Buttons on the Right */}
      {/* <div className="fixed top-1/2 transform -translate-y-1/2 right-0 z-30 flex flex-col items-end">
        <button 
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 pl-3 pr-2 shadow-lg rounded-l-md mb-0.5 origin-bottom-right text-sm"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }} // Text reads bottom-to-top
        >
          QUERY NOW
        </button>
        <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 pl-3 pr-2 shadow-lg rounded-l-md origin-top-right text-sm flex items-center" // flex to align icon and text
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }} // Text reads bottom-to-top
        >
          {/* Phone icon. Rotated to appear upright in vertical text flow. */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2 transform rotate-90">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
          </svg>
          CALL NOW?
        </button>
      </div> */}

      {/* Fixed Chat Button at Bottom Right */}
      {/* <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-30 animate-on-scroll flex items-stretch shadow-xl rounded-lg">
        <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-5 rounded-l-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 text-sm sm:text-base">
          Get in touch and chat with us
        </button>
        <div className="bg-green-500 w-3 rounded-r-lg flex items-center justify-center">
          {/* This green part is an accent as seen in the image. */}
        {/* </div>
      </div> */} 
    </section>
  );
};

export default ContactHeader;

/* 
  NOTE for the user:
  1. Illustration: 
     Replace the `src` in the `<IllustrationPlaceholder />` component (or its `img` tag) 
     with the actual path to your illustration file (e.g., an SVG or PNG).
     The placeholder is currently https://via.placeholder.com/600x450/...

  2. Animations:
     The `animate-on-scroll` and `animated` classes are used. You need to provide
     the CSS definitions for these animations. For example:
     --------------------------------------------------
     .animate-on-scroll {
       opacity: 0;
       transform: translateY(20px);
       transition: opacity 0.6s ease-out, transform 0.6s ease-out;
     }
     .animate-on-scroll.animated {
       opacity: 1;
       transform: translateY(0);
     }
     --------------------------------------------------
     Add this CSS to your global stylesheet.

  3. Tailwind CSS:
     This code assumes you have Tailwind CSS set up in your project.
     Classes like `bg-sky-100`, `text-gray-900`, `md:w-5/12`, etc., are Tailwind classes.
     The `writing-mode` CSS property is applied via inline styles as Tailwind doesn't have default utilities for it.

  4. Background Shape:
     The light blue background on the right has a `clip-path` property to create a slanted edge.
     For a more organic, curved shape like in the original image, you would typically use an SVG
     as a background image or an SVG `clipPath` element. The current solution is a CSS-only approximation.
*/
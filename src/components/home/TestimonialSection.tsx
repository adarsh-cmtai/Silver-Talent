import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const initialTestimonials = [
  {
    id: 1,
    rating: 5,
    content: "With strong experience in leadership assessments, the Silver Talent team delivered impressive results on a crucial project by securing top-tier talent for all our executive positions.",
    name: "Associate Director Talent Acquisition",
    details: "Leading E-commerce Company",
    avatarUrl: "image/Home/ribbon.webp",
  },
  {
    id: 2,
    rating: 5,
    content: "Great job, Team Silver Talent! You delivered the best available talent in record time to meet our needs.",
    name: "Head of HR",
    details: "Global Facility Management Company",
    avatarUrl: "image/Home/ribbon.webp",
  },
  {
    id: 3,
    rating: 5,
    content: "Silver Talent has exceeded all expectations with their professionalism, prompt communication, and quality of candidates. They made the hiring process smooth and hassle-free.",
    name: "GM HR",
    details: "Leading Edtech Company",
    avatarUrl: "image/Home/ribbon.webp",
  },
  {
    id: 4,
    rating: 5,
    content: "I’d like to take a moment to acknowledge and appreciate the excellent work you do. You’ve been a dedicated, reliable, and approachable recruitment partner.",
    name: "—",
    details: "Leading Media Client",
    avatarUrl: "image/Home/ribbon.webp",
  },
  {
    id: 5,
    rating: 5,
    content: "I've worked closely with the HR team at Silver Talent, and they’ve consistently supported us in successfully filling several niche roles.",
    name: "Manager HR",
    details: "Leading Travel Company",
    avatarUrl: "image/Home/ribbon.webp",
  },
  {
    id: 6,
    rating: 5,
    content: "Silver Talent has consistently demonstrated genuine commitment to delivering talent across all levels. Their proactive involvement in understanding our requirements is truly commendable.",
    name: "Talent Acquisition Head",
    details: "Leading Real Estate Company",
    avatarUrl: "image/Home/ribbon.webp",
  },
];

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute top-1/2 -right-4 md:-right-10 transform -translate-y-1/2 z-10 cursor-pointer`}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black bg-white rounded-full shadow-md p-1 hover:bg-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute top-1/2 -left-4 md:-left-10 transform -translate-y-1/2 z-10 cursor-pointer`}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black bg-white rounded-full shadow-md p-1 hover:bg-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
    </div>
  );
}

const TestimonialSection = () => {
  const hoverBgColor = "hover:bg-sky-600";
  const hoverBorderColor = "hover:border-sky-600";

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-8 bg-blue-50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
            Our Use Kind Words
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto"></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <Slider {...settings}>
            {initialTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-3 h-80">
                <div className={`group bg-white rounded-2xl shadow-lg p-4 border border-blue-500 ${hoverBgColor} ${hoverBorderColor} h-full flex flex-col transition-all duration-300 ease-in-out cursor-pointer`}>
                  <div className="flex justify-start mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-blue-700 group-hover:text-blue-200 transition-colors duration-300 ease-in-out mb-1">
                    {testimonial.details}
                  </p>
                  <h3 className="text-gray-900 group-hover:text-white font-bold text-md transition-colors duration-300 ease-in-out mb-2">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-700 group-hover:text-white text-sm leading-relaxed mb-4 flex-grow">
                    {testimonial.content}
                  </p>
                  <div className="mt-auto pt-2">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-200 mr-3 flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <img src={testimonial.avatarUrl} alt={testimonial.name || "Testimonial Avatar"} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="mt-16 text-center">
          <Link
            to={{ pathname: "/contact" }}
            state={{ scrollToForm: true }}
            className="inline-block bg-[#0078D4] text-white text-2xl font-extrabold px-10 py-4 rounded-full shadow-lg transition-colors duration-300 hover:bg-[#005fa3]"
            style={{ minWidth: "300px", paddingLeft: "3rem", paddingRight: "3rem" }}
          >
            Get in touch and chat with us
          </Link>
        </div>
      </div>

      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <Link to={{ pathname: "/contact" }} state={{ scrollToForm: true }}>
          <div className="bg-yellow-400 text-black font-bold px-2 py-4 mb-1 cursor-pointer shadow-lg hover:bg-yellow-500 transition-colors" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
            QUERY NOW
          </div>
        </Link>
        <div className="bg-blue-600 text-white font-bold px-2 py-4 cursor-pointer shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
          <a href="tel:+919250051516" className="mr-1 text-white">
            CALL NOW?
          </a>
          <svg className="w-4 h-4 inline-block transform rotate-[-90deg]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

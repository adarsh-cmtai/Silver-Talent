import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Mail, Phone, Briefcase, Home, Info, Newspaper, PhoneCall, LogIn, Twitter, Facebook, Instagram, Linkedin, Building2, Youtube } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about", label: "About", icon: Info },
  { to: "/services", label: "Services", icon: Briefcase },
  { to: "/blog", label: "Blog", icon: Newspaper },
  { to: "/vacancies", label: "Vacancies", icon: Building2 },
  { to: "/contact", label: "Contact", icon: PhoneCall },
];

const socialLinks = [
  { href: "https://twitter.com", icon: Twitter },
  { href: "https://facebook.com", icon: Facebook },
  { href: "https://instagram.com", icon: Instagram },
  { href: "https://linkedin.com", icon: Linkedin },
  { href: "https://youtube.com", icon: Youtube },
];


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const buttonStyles = {
    primary: "bg-[#042c60] text-white hover:bg-sky-700 focus:ring-sky-500",
    common: "text-xs font-semibold h-10 px-5 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center gap-2"
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[#042c60] text-white"
        >
          <div className="container mx-auto px-4 flex justify-between items-center py-2 text-xs sm:text-sm">
            <div className="flex items-center gap-x-4">
              <span className="font-semibold">Employer Enquiry :</span>
              <a href="mailto:hr@silvertalent.in" className="flex items-center gap-1.5 hover:text-sky-400 transition-colors">
                <Mail size={15} />
                <span className="font-semibold">hr@silvertalent.in</span>
              </a>
              <a href="tel:+919250051516" className="hidden sm:flex items-center gap-1.5 hover:text-sky-400 transition-colors">
                <Phone size={15} />
                <span className="font-semibold">+91-9250051516</span>
              </a>
            </div>
            <div className="hidden md:flex items-center gap-x-4">
              <span className=" font-semibold">Follow Us:</span>
              <div className="flex items-center gap-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-400 transition-colors font-semibold"
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`transition-all duration-300 ${
            isScrolled ? "bg-white/90 backdrop-blur-lg shadow-md py-2" : "bg-white/95 backdrop-blur-md py-3"
          }`}
        >
          <div className="container mx-auto px-4 flex items-center justify-between h-16">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/">
                <img src="/image/Silver.png" alt="Silver Talent Services Logo" className="h-40 w-auto" />
              </Link>
            </motion.div>

            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <motion.div key={link.to} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to={link.to}
                    className={`text-sm uppercase font-bold tracking-wider pb-1.5 pt-1 relative group flex items-center gap-1.5 transform transition-colors duration-300 ${
                      location.pathname === link.to ? "text-sky-600" : "text-slate-700 hover:text-sky-600"
                    }`}
                  >
                    <link.icon size={16} className="transition-transform group-hover:rotate-[-5deg]" />
                    {link.label}
                    <span className={`absolute bottom-0 left-0 w-full h-[2.5px] bg-sky-500 transform transition-transform duration-300 ease-out ${
                      location.pathname === link.to ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="hidden lg:flex items-center space-x-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild className={`bg-[#042c60e1] ${buttonStyles.common}`}>
                  <Link to="/vacancies">
                    JOB SEEKER
                  </Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild className={`${buttonStyles.primary} ${buttonStyles.common}`}>
                  <Link to="/contact" state={{ scrollToForm: true }}>
                    Employer
                  </Link>
                </Button>
              </motion.div>
            </div>

            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-7 w-7 text-slate-800" /> : <Menu className="h-7 w-7 text-slate-800" />}
            </motion.button>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="p-5 flex justify-between items-center border-b">
                  <h2 className="font-bold text-lg text-slate-800">Menu</h2>
                  <button onClick={() => setIsOpen(false)}><X className="h-6 w-6 text-slate-600" /></button>
                </div>
                <div className="flex flex-col space-y-2 p-5 flex-grow">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`py-3 px-4 rounded-lg text-base font-medium transition-all duration-200 flex items-center gap-3 ${
                        location.pathname === link.to
                          ? "bg-sky-100 text-sky-700"
                          : "text-slate-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <link.icon size={20} /> {link.label}
                    </Link>
                  ))}
                </div>
                <div className="p-5 mt-auto border-t space-y-3">
                  <Button asChild className={`${buttonStyles.primary} ${buttonStyles.common} w-full justify-center`}>
                    <Link to="/vacancies" onClick={() => setIsOpen(false)}>
                      JOB SEEKER
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
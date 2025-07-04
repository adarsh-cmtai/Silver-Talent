import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Facebook, Linkedin, Twitter, Mail, Phone, MapPin, Instagram, Youtube, Clock, CalendarDays } from "lucide-react";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const servicesLinks = [
    { id: 'recruitment-services', title: 'Recruitment Services' },
    { id: 'executive-search', title: 'Executive Search' },
    { id: 'staffing-services', title: 'Staffing Services' },
    { id: 'hr-outsourcing', title: 'HR Outsourcing' },
    { id: 'payroll-services', title: 'Payroll Services' },
    { id: 'training-development', title: 'Training & Development' }
  ];

  return (
    <footer className="text-white pt-16 pb-6"
      style={{ backgroundColor: "#042c60" }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12"
        >
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Silver Talent<span className="text-sky-600">Services</span>
            </h3>
            <p className="mb-6 text-gray-200 leading-relaxed">
              Empowering businesses with exceptional recruitment solutions.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="text-gray-200 hover:text-sky-600 transition-colors bg-gray-800 p-2 rounded-full hover:bg-gray-700"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="text-gray-200 hover:text-sky-600 transition-colors bg-gray-800 p-2 rounded-full hover:bg-gray-700"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="text-gray-200 hover:text-sky-600 transition-colors bg-gray-800 p-2 rounded-full hover:bg-gray-700"
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="text-gray-200 hover:text-sky-600 transition-colors bg-gray-800 p-2 rounded-full hover:bg-gray-700"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="text-gray-200 hover:text-sky-600 transition-colors bg-gray-800 p-2 rounded-full hover:bg-gray-700"
              >
                <span className="sr-only">Youtube</span>
                <Youtube className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <span className="h-8 w-1 bg-sky-600 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Blog', 'Contact'].map((link) => (
                <motion.li
                  key={link}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link === 'Home' ? "/" : `/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-200 hover:text-sky-600 transition-colors flex items-center gap-2 group"
                  >
                    <span className="h-1 w-1 bg-sky-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <span className="h-8 w-1 bg-sky-600 rounded-full"></span>
              Services
            </h3>
            <ul className="space-y-3">
              {servicesLinks.map((service) => (
                <motion.li
                  key={service.id}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={`/services`}
                    state={{ expandedServiceId: service.id }}
                    className="text-gray-200 hover:text-sky-600 transition-colors flex items-center gap-2 group"
                  >
                    <span className="h-1 w-1 bg-sky-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {service.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <span className="h-8 w-1 bg-sky-600 rounded-full"></span>
              Contact Info
            </h3>
            <ul className="space-y-4">
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 text-gray-200"
              >
                <MapPin className="h-5 w-5 text-sky-600 mt-1 flex-shrink-0" />
                <span>123 Business Avenue, Corporate Park, Mumbai, 400001</span>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 text-gray-200"
              >
                <Phone className="h-5 w-5 text-sky-600 mt-1 flex-shrink-0" />
                <span>+91 9250051516</span>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 text-gray-200"
              >
                <Mail className="h-5 w-5 text-sky-600 mt-1 flex-shrink-0" />
                <span>hr@silvertalent.in</span>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <span className="h-8 w-1 bg-sky-600 rounded-full"></span>
              Working Hours
            </h3>
            <ul className="space-y-4">
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 text-gray-200"
              >
                <CalendarDays className="h-5 w-5 text-sky-600 mt-1 flex-shrink-0" />
                <span>Monday To Saturday</span>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 text-gray-200"
              >
                <Clock className="h-5 w-5 text-sky-600 mt-1 flex-shrink-0" />
                <span>9.30 AM to 6.30 PM</span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="border-t border-gray-700 pt-6 mt-6 text-center text-gray-300 text-sm"
        >
          <p>© {new Date().getFullYear()} Silver Talent Services. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
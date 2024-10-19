import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll"; // Import Link from react-scroll
import { Link } from "react-router-dom"; // For non-hash based routing
import hlogo from '../assets/header-logo.png';

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Framer Motion variants for mobile menu animations
  const mobileMenuVariants = {
    hidden: { opacity: 0, x: "-100%" },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "-100%" },
  };

  return (
    <header className="sticky top-0 z-40 bg-[#040024CC] backdrop-blur-lg p-4 flex justify-between items-center">
      <div className="w-full max-w-7xl flex justify-between items-center mx-auto">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center text-white text-2xl font-serif font-semibold">
          <img src={hlogo} alt="StageVibe Logo" className="mr-2 h-auto w-10" /> StageVibe
        </Link>
        {/* Hamburger Menu Icon for Mobile */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Navigation Links for Desktop */}
        <nav className="md:flex hidden md:flex-row md:items-center md:gap-4">
          <ul className="md:text-lg flex flex-col md:flex-row md:gap-4">
            {[
              { label: "Home", path: "/" },
              { label: "About", path: "about", isScroll: true },
              { label: "Agenda", path: "agenda", isScroll: true },
              { label: "Photos", path: "photos", isScroll: true },
              { label: "Team", path: "team", isScroll: true },
              { label: "Book Seat", path: "/booking" }, // Non-hash-based routing
              { label: "Rating", path: "/rating" },
              { label: "Login", path: "/login" }
            ].map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.isScroll ? (
                  <ScrollLink
                    to={item.path} // Use to scroll to section
                    smooth={true} // Enables smooth scrolling
                    offset={-80} // Adjust this value to align the section correctly
                    duration={500} // Scrolling animation duration
                    className="nav-link bg-transparent hover:bg-white hover:text-black font-semibold transition-all duration-300 rounded-md py-2 px-4 tracking-normal block"
                  >
                    {item.label}
                  </ScrollLink>
                ) : (
                  <Link
                    to={item.path}
                    className="nav-link bg-transparent hover:bg-white hover:text-black font-semibold transition-all duration-300 rounded-md py-2 px-4 tracking-normal block"
                  >
                    {item.label}
                  </Link>
                )}
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.nav
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            transition={{ duration: 0.4 }}
            className="absolute top-16 left-0 w-full bg-[#0b0b22FD] rounded-b-lg z-30"
          >
            <ul className="text-center flex flex-col space-y-4 p-6">
              {[
                { label: "Home", path: "/" },
                { label: "About", path: "about", isScroll: true },
                { label: "Agenda", path: "agenda", isScroll: true },
                { label: "Photos", path: "photos", isScroll: true },
                { label: "Book Seat", path: "/booking" },
                { label: "Team", path: "team", isScroll: true },
                { label: "Login", path: "/login" }
              ].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.isScroll ? (
                    <ScrollLink
                      to={item.path}
                      smooth={true}
                      offset={-80}
                      duration={500}
                      className="text-white font-semibold transition-all duration-300 bg-[#0b0b22FD] hover:bg-white hover:text-black py-2 px-4 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </ScrollLink>
                  ) : (
                    <Link
                      to={item.path}
                      className="text-white font-semibold transition-all duration-300 bg-[#0b0b22FD] hover:bg-white hover:text-black py-2 px-4 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </div>
    </header>
  );
};

export default Nav;

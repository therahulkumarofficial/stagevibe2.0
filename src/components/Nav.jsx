import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Importing hamburger and close icons
import { motion } from "framer-motion"; // Importing Framer Motion for animations
import hlogo from '../assets/header-logo.png';


const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Framer Motion variants for mobile menu animations
  const mobileMenuVariants = {
    hidden: { opacity: 0, x: "-100%" }, // Slide in from the left
    visible: { opacity: 1, x: 0 }, // Full visibility
    exit: { opacity: 0, x: "-100%" }, // Slide out to the left
  };

  return (
    <header className="sticky top-0 z-40 bg-[#040024CC] backdrop-blur-lg p-4 flex justify-between items-center">
      <div className="w-full max-w-7xl flex justify-between items-center mx-auto">
        {/* Brand / Logo */}
        <a href="/" className="flex items-center text-white text-2xl font-serif font-semibold">
          <img src={hlogo} alt="StageVibe Logo" className="mr-2 h-auto w-10" /> StageVibe
        </a>
        {/* Hamburger Menu Icon for Mobile */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Navigation Links */}
        <nav className="md:flex hidden md:flex-row md:items-center md:gap-4">
          <ul className="md:text-lg flex flex-col md:flex-row md:gap-4">
            {[
              { label: "Home", href: "/" },
              { label: "About", href: "#about" },
              { label: "Agenda", href: "#agenda" },
              { label: "Photos", href: "#photos" },
              { label: "Team", href: "#team" },
              { label: "Book Seat", href: "/booking" }, // New "Book Seat" button
              { label: "Rating", href: "/rating" },
              { label: "Login", href: "/login" }
            ].map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.1 }} // Hover animation to scale the link
                whileTap={{ scale: 0.95 }} // Tap animation
              >
                <a
                  href={item.href} // Correct href reference
                  className="nav-link bg-transparent hover:bg-white hover:text-black font-semibold transition-all duration-300 rounded-md py-2 px-4 tracking-normal block"
                >
                  {item.label}
                </a>
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
            className="absolute top-16 left-0 w-full bg-[#0b0b22FD] rounded-b-lg z-30 md:hidden"
          >
            <ul className="text-center flex flex-col space-y-4 p-6">
              {["About", "Agenda", "Photos", "Book Seat", "Team", "Login"].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.05 }} // Slight scale increase on hover
                  whileTap={{ scale: 0.95 }} // Slight scale decrease on tap
                >
                  <a
                    href={`#${item.toLowerCase().replace(" ", "-")}`} // Correct id reference
                    className="text-white font-semibold transition-all duration-300 bg-[#0b0b22FD] hover:bg-white hover:text-black py-2 px-4 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
                  >
                    {item}
                  </a>
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

import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Importing hamburger and close icons
import { motion } from "framer-motion"; // Importing Framer Motion for animations

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
        <a href="/" className="text-white text-2xl font-serif font-semibold">
          StageVibe
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
            {["About", "Agenda", "Photos", "Team"].map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.1 }} // Hover animation to scale the link
                whileTap={{ scale: 0.95 }} // Tap animation
              >
                <a
                  href={`#${item.toLowerCase().replace(" ", "-")}`} // Correct id reference
                  className="nav-link bg-transparent hover:bg-white hover:text-black font-semibold transition-all duration-300 rounded-md py-2 px-4 tracking-normal block"
                >
                  {item}
                </a>
              </motion.li>
            ))}
            {/* Book Seat Link - use Link for routing */}
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/booking" // Link to the /booking route
                className="nav-link bg-transparent hover:bg-white hover:text-black font-semibold transition-all duration-300 rounded-md py-2 px-4 tracking-normal block"
              >
                Book Seat
              </Link>
            </motion.li>
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

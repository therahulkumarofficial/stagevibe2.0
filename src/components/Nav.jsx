// src/components/Nav.jsx
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Importing hamburger and close icons

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#040024CC] backdrop-blur-lg p-4 flex justify-between items-center">
      <div className="w-full max-w-7xl flex justify-between items-center mx-auto">
        {/* Brand / Logo */}
        <a href="/" className="text-white text-2xl font-serif font-semibold">
          Fresher's 2024
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
        <nav
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } flex-col absolute top-16 left-0 w-full bg-[#0b0b22FD] rounded-b-lg md:static md:flex md:flex-row md:items-center md:bg-transparent md:w-auto md:rounded-none`}
        >
          <ul className="md:text-lg flex flex-col md:flex-row md:gap-4">
            {["Brochure", "Schedule", "Register for Events", "Register", "Login", "About"].map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="nav-link bg-[#0b0b22FD] hover:bg-white hover:text-black font-semibold transition-all duration-300 rounded-md py-2 px-4 shadow-none hover:shadow-lg tracking-normal hover:tracking-wider block"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Nav;

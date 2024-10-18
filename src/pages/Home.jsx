import React, { useEffect, useState } from 'react';
import backImg from '../assets/back3.jpg';
import animatedElement from '../assets/decorative-graphic.png';
import Modal from './Modal'; // Import your Modal component

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const heading = document.getElementById('hero-heading');
    heading.classList.add('animate__animated', 'animate__fadeInDown');
  }, []);

  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center h-full p-4 mb-16 md:mb-0">
        <h1
          id="hero-heading"
          className="text-6xl md:text-8xl font-bold text-white mb-4 mt-28 drop-shadow-lg"
        >
          Fresher's Party 2024
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-rose-500 mb-6 drop-shadow-lg">For MCA & BCA Fresher's</h2>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl font-medium leading-relaxed drop-shadow-lg">
          Join us for an unforgettable day at the{' '}
          <span className="text-yellow-300">College Auditorium</span> filled with laughter, music, and performances.
        </p>
        {/* Buttons Wrapper */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a href='/booking' className="py-3 px-8 bg-yellow-400 text-black font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition duration-300 ease-in-out transform hover:scale-105">
            Reserve Your Spot
          </a>
          <button 
            onClick={() => setModalOpen(true)} 
            className="py-3 px-8 bg-yellow-400 text-black font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Apply for Performance
          </button>
        </div>
      </div>

      {/* Animated Floating Element */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-40 md:bottom-20 animate-pulse">
        <img src={animatedElement} alt="Animated Element" className="h-24" />
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
};

export default Home;
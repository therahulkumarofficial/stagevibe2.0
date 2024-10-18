import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon from react-icons
import Nav from './components/Nav';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Rating from './pages/Rating';
import About from './components/About';
import Agenda from './components/Agenda';
import Photos from './components/Photos';
import Team from './components/Team';
import FAQ from './components/faq';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <Nav />

      {/* WhatsApp Floating Button */}
        <a
          href="https://chat.whatsapp.com/Csffzli2P1B2bOyO9x0Hhe" // Replace with your WhatsApp number
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-button"
          aria-label="Chat with us on WhatsApp"
        >
          <FaWhatsapp size={30} />
        </a>

      <Routes>
        <Route path="/" element={<><Home /> <About /> <Agenda /> <Photos /> <Team /> <FAQ /> </>} />
        <Route path='/rating' element={<Rating />} />
        <Route path='/booking' element={<Booking />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;

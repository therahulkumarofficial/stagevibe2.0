import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

const App = () => {
  return (
    <Router>
      <Nav />
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

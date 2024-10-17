import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 bg-gradient-to-b from-[#040024CC] to-[#0b0b22FD] text-white">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-5xl font-bold mb-6">Fresher's Party 2024</h2>
        <p className="text-xl mb-8 font-medium">
          Hosted by <span className="text-yellow-300">Nalanda College</span> - MCA & BCA Departments
        </p>
        <div className="text-left max-w-4xl mx-auto space-y-6">
          <p className="text-2xl font-semibold">
            🎉 A Day to Remember at the <span className="text-yellow-300">College Auditorium</span>
          </p>
          <p className="text-lg leading-relaxed">
            Step into a magical evening filled with energy, fun, and the spirit of celebration. The Fresher's Party 2024 is set to bring together our talented and enthusiastic freshers in a grand showcase of talent, music, and camaraderie. This event isn't just a party; it’s the beginning of lifelong memories and friendships.
          </p>
          <p className="text-lg leading-relaxed">
            Whether you're performing, cheering on your friends, or simply enjoying the vibe, this is your moment to shine. Get ready for a night of exciting performances, surprise acts, and, of course, the much-awaited performer rating system through StageVibe!
          </p>
          <p className="text-lg leading-relaxed">
            Don’t miss the opportunity to be a part of this amazing night where the entire college will come together to celebrate the start of your incredible journey!
          </p>
          <p className="text-xl font-semibold">
            📅 <span className="text-yellow-300">Date:</span> To be announced
          </p>
          <p className="text-xl font-semibold">
            📍 <span className="text-yellow-300">Venue:</span> Auditorium, Nalanda College
          </p>
        </div>
        <a href='/booking' className="mt-16 py-3 px-6 bg-yellow-300 text-black font-semibold rounded-full hover:bg-yellow-400 transition duration-300 ease-in-out shadow-lg">
          Book Your Seat Now
        </a>
      </div>
    </section>
  );
};

export default About;

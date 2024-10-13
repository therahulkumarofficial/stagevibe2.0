const Home = () => {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#040024CC] to-[#0b0b22FD] text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to Fresher's 2024 Party!</h1>
        <p className="text-lg mb-6">
          Join us for an unforgettable evening filled with fun, networking, and entertainment!
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Get Started
        </button>
      </main>
    );
  };

export default Home;
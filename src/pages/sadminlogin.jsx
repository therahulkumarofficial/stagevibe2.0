import React, { useState } from 'react';

const SAdminLogin = ({ onLogin }) => {
  const [superAdminUsername, setSuperAdminUsername] = useState('');
  const [superAdminPassword, setSuperAdminPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Example static login validation (replace with real API logic)
    if (superAdminUsername === 'superadmin' && superAdminPassword === 'superpassword') {
      onLogin(superAdminUsername); // Trigger login action passed as a prop
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 text-white mb-28 p-8 rounded-2xl shadow-lg w-auto max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6">Super Admin Login</h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="superAdminUsername" className="block text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="superAdminUsername"
              value={superAdminUsername}
              onChange={(e) => setSuperAdminUsername(e.target.value)}
              required
              className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="superAdminPassword" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="superAdminPassword"
              value={superAdminPassword}
              onChange={(e) => setSuperAdminPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-black font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SAdminLogin;
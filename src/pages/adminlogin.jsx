import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminLogin = ({ onLogin }) => {
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Example static login validation (you can replace it with real API login logic)
    if (adminUsername === 'admin' && adminPassword === 'password') {
      onLogin(adminUsername); // Call the onLogin function passed as a prop
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 rounded-2xl mb-28 text-white p-8 shadow-lg w-auto max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6">Admin Login</h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={adminUsername}
              onChange={(e) => setAdminUsername(e.target.value)}
              required
              className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Are you an admin? */}
        <div className="mt-8 text-center">
          <p className="text-gray-400">Are you an SuperAdmin?</p>
          <Link
            to="/sadminlogin"
            className="text-teal-400 hover:text-teal-500 font-medium transition duration-300"
          >
            Super Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
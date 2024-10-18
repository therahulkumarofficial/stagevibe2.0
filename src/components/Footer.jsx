import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'; // Importing icons

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center text-center px-4">
                <div className="mb-4 md:mb-0 mx-4">
                    <h2 className="text-2xl font-bold mb-1">StageVibe © 2024</h2>
                    <p className="text-sm">All Rights Reserved</p>
                    <p className="text-sm mt-2">Made with ❤️ by <a className='font-medium text-sky-600' href='https://instagram.com/ayushroyl'>Ayush</a></p>
                </div>

                <div className="mt-4 md:mt-0 mx-4">
                    <h3 className="font-semibold text-lg mb-2">Connect with Us</h3>
                    <div className="flex justify-center space-x-6 mt-2">
                        <a
                            href="https://instagram.com/ayushroyl"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-500 hover:text-blue-400 transition duration-300"
                        >
                            <FaInstagram size={24} />
                        </a>
                        <a
                            href="https://linkedin.com/in/ayushroyl"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-500 hover:text-blue-400 transition duration-300"
                        >
                            <FaLinkedin size={24} />
                        </a>
                        <a
                            href="https://github.com/ayushroyl"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-500 hover:text-blue-400 transition duration-300"
                        >
                            <FaGithub size={24} />
                        </a>
                        <a
                            href="https://twitter.com/ayushroyl"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-500 hover:text-blue-400 transition duration-300"
                        >
                            <FaTwitter size={24} />
                        </a>
                    </div>
                </div>

                <div className="mt-4 md:mt-0 mx-4">
                    <h3 className="font-semibold text-lg mb-2">About StageVibe</h3>
                    <p className="text-sm text-gray-300 mb-1">
                        StageVibe is dedicated to creating unforgettable experiences for students through engaging events and activities.
                    </p>
                    <p className="text-sm text-gray-300 mb-1">
                        Join us as we celebrate creativity, talent, and collaboration within our community.
                    </p>
                    <p className="text-sm text-gray-300 mb-1">
                        For business inquiries or collaborations, reach out to us at: <span className="text-orange-500">ayushroy.business.contact@gmail.com</span>
                    </p>
                    <p className="text-sm text-gray-300">
                        Connect with us on social media for updates on our events!
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

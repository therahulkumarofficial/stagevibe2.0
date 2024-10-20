import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    const socialLinks = [
        { icon: FaInstagram, href: "https://instagram.com/ayushroyl" },
        { icon: FaLinkedin, href: "https://linkedin.com/in/ayushroyl" },
        { icon: FaGithub, href: "https://github.com/ayushroyl" },
        { icon: FaTwitter, href: "https://twitter.com/ayushroyl" }
    ];

    return (
        <footer className="relative bg-gradient-to-b from-[#040024] to-[#0b0b22] text-white py-12 overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full filter blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full filter blur-[100px]" />
            </div>

            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center px-4 relative z-10">
                <motion.div 
                    className="mb-8 md:mb-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">StageVibe © 2024</h2>
                    <p className="text-sm text-blue-200">All Rights Reserved</p>
                    <p className="text-sm mt-2">Made with ❤️ by <a className='font-medium text-blue-400 hover:text-blue-300 transition-colors' href='https://instagram.com/ayushroyl'>Ayush</a></p>
                </motion.div>

                <motion.div 
                    className="mb-8 md:mb-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h3 className="font-semibold text-lg mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">Connect with Us</h3>
                    <div className="flex justify-center space-x-6">
                        {socialLinks.map((link, index) => (
                            <motion.a
                                key={index}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <link.icon size={24} />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                <motion.div 
                    className="max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h3 className="font-semibold text-lg mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">About StageVibe</h3>
                    <p className="text-sm text-blue-200 mb-2">
                        StageVibe is dedicated to creating unforgettable experiences for students through engaging events and activities.
                    </p>
                    <p className="text-sm text-blue-200 mb-2">
                        Join us as we celebrate creativity, talent, and collaboration within our community.
                    </p>
                    <p className="text-sm text-blue-200 mb-2">
                        For business inquiries or collaborations, reach out to us at: <span className="text-blue-400">ayushroy.business.contact@gmail.com</span>
                    </p>
                    <p className="text-sm text-blue-200">
                        Connect with us on social media for updates on our events!
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

import ayush from '../assets/team/ayush.png';
import shiva from '../assets/team/shiva.png';
import rahul from '../assets/team/rahul.png';

const teamMembers = [
    {
        name: 'Ayush Roy',
        role: (
            <>
              Technical Lead <br /> Full Stack Developer
            </>
        ),
        image: ayush,
        instagram: 'https://instagram.com/ayushroyl', 
        linkedin: 'https://www.linkedin.com/in/ayushroyl',
        github: 'https://github.com/ayushroyl',
        twitter: 'https://twitter.com/ayushroyl',
    },
    {
        name: 'Shiva',
        role: 'Backend Developer',
        image: shiva, 
        instagram: 'https://instagram.com/shivamsinghamrajput', 
        linkedin: 'https://www.linkedin.com/in/shivadhruva',
        github: 'https://github.com/shivaarajput',
        twitter: 'https://twitter.com/shivamsinghamrajput',
    },
    {
        name: 'Rahul Kumar',
        role: 'Frontend Developer',
        image: rahul,
        instagram: 'https://www.instagram.com/therahulkumar9',
        linkedin: 'https://www.linkedin.com/in/therahulkumar9',
        github: 'https://github.com/therahulkumar9',
        twitter: 'https://x.com/therahulkumar9',
    },
];

const Team = () => {
    return (
        <section id="team" className="relative py-16 md:py-24 bg-gradient-to-b from-[#040024] via-[#070733] to-[#0b0b22] overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full filter blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/20 rounded-full filter blur-[100px]" />
            </div>

            <div className="max-w-6xl mx-auto text-center relative z-10">
                <motion.h2 
                    className="text-4xl md:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Our Technical Team
                </motion.h2>
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            className="bg-[#0b0b22]/40 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl border border-blue-500/20 transition-all duration-300"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.img
                                src={member.image}
                                alt={member.name}
                                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-md"
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                            <h3 className="text-xl font-semibold text-yellow-300 mb-2">{member.name}</h3>
                            <p className="text-blue-200 mb-4">{member.role}</p>

                            <div className="flex justify-center space-x-4">
                                {member.instagram && (
                                    <SocialIcon href={member.instagram} icon={FaInstagram} color="text-pink-500" hoverColor="text-pink-400" />
                                )}
                                {member.linkedin && (
                                    <SocialIcon href={member.linkedin} icon={FaLinkedin} color="text-blue-500" hoverColor="text-blue-400" />
                                )}
                                {member.github && (
                                    <SocialIcon href={member.github} icon={FaGithub} color="text-gray-300" hoverColor="text-gray-100" />
                                )}
                                {member.twitter && (
                                    <SocialIcon href={member.twitter} icon={FaTwitter} color="text-blue-400" hoverColor="text-blue-300" />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const SocialIcon = ({ href, icon: Icon, color, hoverColor }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${color} hover:${hoverColor}`}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
    >
        <Icon className="h-6 w-6" />
    </motion.a>
);

export default Team;
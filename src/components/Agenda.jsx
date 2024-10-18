import React from 'react';
import { motion } from 'framer-motion';

const agendaItems = [
    {
        time: '🕙 10:00 AM - 10:30 AM',
        title: 'Registration and Networking',
        description: 'Check in at the entrance, enjoy refreshments, and receive your welcome kit.',
        icon: '🎟️', // Ticket emoji
    },
    {
        time: '🎉 10:30 AM - 11:00 AM',
        title: 'Opening Ceremony',
        description: 'Join us for the inaugural address and welcome song.',
        icon: '📢', // Megaphone emoji
    },
    {
        time: '🎭 11:00 AM - 1:00 PM',
        title: 'Cultural Performances',
        description: 'Enjoy performances by talented students showcasing music, dance, and drama.',
        icon: '🎶', // Music note emoji
    },
    {
        time: '🍽️ 1:00 PM - 1:30 PM',
        title: 'Lunch Break',
        description: 'Take a break and enjoy a delicious lunch while mingling with friends.',
        icon: '🥗', // Salad emoji
    },
    {
        time: '🎲 1:30 PM - 2:30 PM',
        title: 'Extra Enjoyment',
        description: 'Participate in fun games and interactive activities with fellow students.',
        icon: '🏆', // Trophy emoji
    },
    {
        time: '🎤 2:30 PM - 3:00 PM',
        title: 'Photo Session',
        description: 'Catch your memories & meet your seniours, teachers',
        icon: '💬', // Speech balloon emoji
    },
    {
        time: '🎊 3:00 PM - 4:30 PM',
        title: 'Closing Ceremony & Random Group Dance',
        description: 'Wrap up the day with closing remarks, thank you notes, and final celebrations with mix group dance.',
        icon: '🎆', // Fireworks emoji
    },
];

const Agenda = () => {
    return (
        <section id='agenda' className="bg-gradient-to-b from-[#040024CC] to-[#0b0b22FD] py-10">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-5xl font-bold mb-8 animate__animated animate__fadeInDown text-white">
                    Agenda
                </h2>
                <div className="relative">
                    {agendaItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="flex items-start mb-12 opacity-0 animate__animated animate__fadeIn"
                            initial={{ opacity: 0, transform: 'translateY(20px)' }}
                            animate={{ opacity: 1, transform: 'translateY(0)' }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Connecting Line, hidden on mobile */}
                            {index < agendaItems.length - 1 && (
                                <div className="absolute left-6 transform -translate-x-1/2 w-1 bg-yellow-400 h-full top-12 hidden md:block"></div>
                            )}

                            <span className="vertical-timeline-element-icon flex items-center justify-center h-10 w-14 rounded-full border-r-2 text-white shadow-lg">
                                {item.icon}
                            </span>

                            <div className="vertical-timeline-element-content ml-4 p-4 border-l-2 border-yellow-400 bg-gray-800 rounded-lg shadow-lg flex-grow">
                                <div className="flex gap-1 items-center text-yellow-300 mb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock h-4 w-4">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    <h3 className="vertical-timeline-element-title font-semibold text-lg">{item.time}</h3>
                                </div>
                                <h4 className="text-xl mt-1 font-semibold text-white">{item.title}</h4>
                                <p className="text-base text-gray-200 mt-1">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Agenda;

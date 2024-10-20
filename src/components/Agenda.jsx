import React from 'react';
import { motion } from 'framer-motion';

const agendaItems = [
    {
        time: '🕙 10:00 AM - 10:30 AM',
        title: 'Registration and Networking',
        description: 'Check in at the entrance, enjoy refreshments, and pick up your welcome kit.',
        icon: '🎟️',
    },
    {
        time: '🎉 10:30 AM - 11:00 AM',
        title: 'Opening Ceremony',
        description: 'Join us for the inaugural address and welcome song.',
        icon: '📢',
    },
    {
        time: '🎭 11:00 AM - 1:00 PM',
        title: 'Cultural Performances',
        description: 'Enjoy performances by talented students showcasing music, dance, and drama.',
        icon: '🎭',
    },
    {
        time: '🍽️ 1:00 PM - 1:30 PM',
        title: 'Lunch Break',
        description: 'Take a break and enjoy a delicious lunch while mingling with friends.',
        icon: '🥗',
    },
    {
        time: '🎲 1:30 PM - 2:30 PM',
        title: 'Extra Enjoyment',
        description: 'Join fun games and interactive activities with fellow students.',
        icon: '🏆',
    },
    {
        time: '🎤 2:30 PM - 3:00 PM',
        title: 'Photo Session',
        description: 'Capture memories and meet your seniors and teachers.',
        icon: '📸',
    },
    {
        time: '🎊 3:00 PM - 4:30 PM',
        title: 'Closing Ceremony & Group Dance',
        description: 'Wrap up the day with closing remarks, thank-you notes, and a final group dance celebration.',
        icon: '🎆',
    },
];

const Agenda = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <section id='agenda' className="relative py-16 md:py-24 px-4 bg-gradient-to-b from-[#040024] via-[#070733] to-[#0b0b22] overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full filter blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/20 rounded-full filter blur-[100px]" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.h2 
                    className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Event Timeline
                </motion.h2>

                <motion.div 
                    className="relative"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Timeline line */}
                    <div className="absolute left-6 top-0 w-0.5 h-full bg-gradient-to-b from-blue-400 to-blue-600 opacity-50"></div>

                    {agendaItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="flex gap-4 mb-8 relative"
                            variants={itemVariants}
                        >
                            {/* Icon circle with glow effect */}
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-[#0b0b22] rounded-full flex items-center justify-center border-2 border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                                    <span className="text-xl">{item.icon}</span>
                                </div>
                            </div>

                            {/* Content card */}
                            <div className="flex-1 bg-[#0b0b22]/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors duration-300">
                                <div className="flex items-center gap-2 text-blue-300 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    <span className="font-semibold text-sm md:text-base">{item.time}</span>
                                </div>
                                <h4 className="text-lg md:text-xl font-semibold text-white mb-2 bg-gradient-to-r from-blue-200 to-blue-100 bg-clip-text text-transparent">
                                    {item.title}
                                </h4>
                                <p className="text-sm md:text-base text-blue-100/80">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Agenda;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQData = [
    {
        question: 'What is StageVibe?',
        answer: 'StageVibe is a platform for online seat booking overall managing any party rating performances during college events, fostering community engagement and feedback.',
    },
    {
        question: 'How can I register for an event?',
        answer: 'You can register by clicking the "Book Seat" button on our website.',
    },
    {
        question: 'Is there an age limit for participants?',
        answer: 'No, there is no age limit. Everyone is welcome to participate in our events.',
    },
    {
        question: 'How do I contact the organizers?',
        answer: 'You can contact us directly in college. Otherwise connect us on social media',
    },
    {
        question: 'Where can I find the event photos?',
        answer: 'Event photos can be found in the "Photos" section of our website, or maybe will uploaded on google drive after party and sent link on whatsapp group.',
    },
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#040024] via-[#070733] to-[#0b0b22] overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full filter blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/20 rounded-full filter blur-[100px]" />
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.h2 
                    className="text-4xl md:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Frequently Asked Questions
                </motion.h2>
                <motion.div 
                    className="bg-[#0b0b22]/40 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-blue-500/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {FAQData.map((item, index) => (
                        <motion.div 
                            key={index} 
                            className="mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <motion.button
                                onClick={() => toggleAnswer(index)}
                                className="flex justify-between items-center w-full text-left text-lg font-semibold text-yellow-300 hover:text-white transition duration-300"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {item.question}
                                <motion.span
                                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    ▼
                                </motion.span>
                            </motion.button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-blue-100 mt-2 text-base overflow-hidden"
                                    >
                                        {item.answer}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;
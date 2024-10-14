import React, { useState } from 'react';

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
        <section className="bg-gradient-to-b from-[#040024CC] to-[#0b0b22FD] py-10">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-5xl font-bold mb-8 text-white">Frequently Asked Questions</h2>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    {FAQData.map((item, index) => (
                        <div key={index} className="mb-4">
                            <button
                                onClick={() => toggleAnswer(index)}
                                className="flex justify-between items-center w-full text-left text-lg font-semibold text-yellow-300 hover:text-white transition duration-300"
                            >
                                {item.question}
                                <span className={`ml-2 ${activeIndex === index ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`}>
                                    ▼
                                </span>
                            </button>
                            {activeIndex === index && (
                                <p className="text-gray-200 mt-2 text-base">{item.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;

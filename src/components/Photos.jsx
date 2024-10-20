import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

import img1 from '../assets/pictures/event1.jpg'; // Add your photos here
import img2 from '../assets/pictures/event2.jpg';
import img3 from '../assets/pictures/event3.jpg';
import img4 from '../assets/pictures/event4.jpg';
import img5 from '../assets/pictures/event5.jpg';
import img6 from '../assets/pictures/event6.jpg';


const eventPhotos = [
    { src: img1, alt: "Previous Event 1" },
    { src: img2, alt: "Previous Event 2" },
    { src: img3, alt: "Previous Event 3" },
    { src: img4, alt: "Previous Event 4" },
    { src: img5, alt: "Previous Event 5" },
    { src: img6, alt: "Previous Event 6" },

];

const Photos = () => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const openPhoto = (photo) => {
        setSelectedPhoto(photo);
    };

    const closePhoto = () => {
        setSelectedPhoto(null);
    };

    return (
        <section id="photos" className="relative py-16 md:py-24 bg-gradient-to-b from-[#040024] via-[#070733] to-[#0b0b22] overflow-hidden">
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
                    Previous Events Photos
                </motion.h2>
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >
                    {eventPhotos.map((photo, index) => (
                        <motion.div
                            key={index}
                            className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer backdrop-blur-sm bg-[#0b0b22]/40 border border-blue-500/10"
                            onClick={() => openPhoto(photo)}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <p className="text-white font-semibold text-lg">{photo.alt}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div 
                        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div 
                            className="relative max-w-4xl w-full p-4"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                        >
                            <img
                                src={selectedPhoto.src}
                                alt={selectedPhoto.alt}
                                className="w-full h-auto object-contain rounded-lg shadow-lg"
                            />
                            <motion.button
                                className="absolute top-4 right-4 text-white text-3xl hover:text-red-500 transition-colors"
                                onClick={closePhoto}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FiX />
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Photos;
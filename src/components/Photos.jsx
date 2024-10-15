import React, { useState } from 'react';
import { FiX } from 'react-icons/fi'; // Icon for the close button
import img1 from '../assets/pictures/event1.jpg'; // Add your photos here
import img2 from '../assets/pictures/event2.jpg';
import img3 from '../assets/pictures/event3.jpg';
import img4 from '../assets/pictures/event4.jpg';
import img5 from '../assets/pictures/event5.jpg';
import img6 from '../assets/pictures/event6.jpg';

// Photo data (Replace these with your actual images)
const eventPhotos = [
    { src: img1, alt: "Previous Event 1" },
    { src: img2, alt: "Previous Event 2" },
    { src: img3, alt: "Previous Event 3" },
    { src: img4, alt: "Previous Event 4" },
    { src: img5, alt: "Previous Event 5" },
    { src: img6, alt: "Previous Event 6" },
    // Add more photos as needed
];

const Photos = () => {
    const [selectedPhoto, setSelectedPhoto] = useState(null); // Track the clicked photo

    // Open the popup when a photo is clicked
    const openPhoto = (photo) => {
        setSelectedPhoto(photo);
    };

    // Close the popup
    const closePhoto = () => {
        setSelectedPhoto(null);
    };

    return (
        <section id="photos" className="bg-gradient-to-b from-[#0b0b22FD] to-[#0f1a3dFD] py-10">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-5xl font-bold mb-8 text-white">
                    Previous Events Photos
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
                    {eventPhotos.map((photo, index) => (
                        <div
                            key={index}
                            className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
                            onClick={() => openPhoto(photo)} // Handle click event to open photo
                        >
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <p className="text-white font-semibold text-lg">{photo.alt}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Fullscreen Popup for Image */}
            {selectedPhoto && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="relative max-w-4xl w-full p-4">
                        <img
                            src={selectedPhoto.src}
                            alt={selectedPhoto.alt}
                            className="w-full h-auto object-contain rounded-lg shadow-lg"
                        />
                        <button
                            className="absolute top-4 right-4 text-white text-3xl hover:text-red-500 transition-colors"
                            onClick={closePhoto} // Handle close button click
                        >
                            <FiX />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Photos;

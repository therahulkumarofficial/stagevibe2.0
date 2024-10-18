import React, { useState } from 'react';

const Modal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    classN: 'Choose',
    rollNo: '',
    mobileNo: '',
    act: 'Choose',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(''); // Reset error on change
  };

  const validateMobileNumber = (number) => {
    const regex = /^[0-9]{10}$/; // Simple validation for a 10-digit number
    return regex.test(number);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate mobile number
    if (!validateMobileNumber(formData.mobileNo)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setSubmitted(true); // Show thank you message
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {submitted ? (
          <div className="text-center">
            <h2 className="text-lg font-bold text-yellow-400 mb-4">Thank You!</h2>
            <p className='text-black font-bold'>Thank you for applying to participate in the Fresher's Party. We will contact you soon in the college</p>
            <button 
              onClick={onClose} 
              className="mt-4 py-2 px-4 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition duration-300"
            >
              OK
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-bold mb-4">Apply for Performance</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border p-2 mb-4 w-full rounded shadow"
            />
            <select
              name="classN"
              value={formData.classN}
              onChange={handleChange}
              className="border p-2 mb-4 w-full rounded shadow"
            >
              <option value="Choose">Choose Your Class</option>
              <option value="BCA1">BCA1</option>
              <option value="BCA2">BCA2</option>
              <option value="BCA3">BCA3</option>
              <option value="MCA1">MCA1</option>
              <option value="MCA3">MCA3</option>
              <option value="Other">Other Departments</option>
            </select>
            <input
              type="number"
              name="rollNo"
              placeholder="Roll No."
              value={formData.rollNo}
              onChange={handleChange}
              required
              className="border p-2 mb-4 w-full rounded shadow"
            />
            <input
              type="tel"
              name="mobileNo"
              placeholder="10-Digit Mobile No."
              value={formData.mobileNo}
              onChange={handleChange}
              required
              className="border p-2 mb-4 w-full rounded shadow"
            />
            <select
              name="act"
              value={formData.act}
              onChange={handleChange}
              className="border p-2 mb-4 w-full rounded shadow"
            >
              <option value="Choose">Choose Your Act</option>
              <option value="Dance">Dance</option>
              <option value="Singing">Singing</option>
              <option value="Instrumental Music">Instrumental Music</option>
              <option value="Drama">Drama</option>
              <option value="Stand-up Comedy">Stand-up Comedy</option>
              <option value="Other">Other (Show Your Talent)</option>
            </select>
            <button 
              type="submit" 
              className="mt-4 py-2 px-4 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition duration-300"
            >
              Submit
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="mt-4 py-2 px-4 bg-gray-300 text-black font-semibold rounded-full hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7); /* Dark overlay */
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000; /* Ensure it's above other content */
          backdrop-filter: blur(5px); /* Blur the background */
        }

        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          animation: modalFadeIn 0.3s ease-out forwards;
          width: 90%; /* Responsive width */
          max-width: 500px; /* Max width for larger screens */
        }

        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Modal;

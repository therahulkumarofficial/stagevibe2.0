import React, { useState } from 'react';

// Seat rows and their respective seat counts
const rows = [
  { row: 'A', seats: 10 },
  { row: 'B', seats: 10 },
  { row: 'C', seats: 12 },
  { row: 'D', seats: 12 },
  { row: 'E', seats: 16 },
  { row: 'F', seats: 16 },
  { row: 'G', seats: 16 },
  { row: 'H', seats: 16 },
  { row: 'I', seats: 16 },
  { row: 'J', seats: 16 },
  { row: 'K', seats: 20 },
  { row: 'L', seats: 20 },
];

const Booking = () => {
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [userDetails, setUserDetails] = useState({ name: '', class: '', rollNo: '', dob: '' });
  const [totalAmount, setTotalAmount] = useState(0);
  const [isBooking, setIsBooking] = useState(false);

  const handleSeatSelection = (seat) => {
    const updatedSelectedSeats = new Set(selectedSeats);
    if (updatedSelectedSeats.has(seat)) {
      updatedSelectedSeats.delete(seat);
    } else {
      updatedSelectedSeats.add(seat);
    }
    setSelectedSeats(updatedSelectedSeats);
    setTotalAmount(updatedSelectedSeats.size * 250); // Update total amount
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleBooking = () => {
    // Implement booking logic (save data to server or state)
    alert(`Booked ${selectedSeats.size} seats for ${userDetails.name}. Total: ₹${totalAmount}`);
    setSelectedSeats(new Set()); // Clear selection
    setUserDetails({ name: '', class: '', rollNo: '', dob: '' }); // Reset user details
    setTotalAmount(0); // Reset amount
    setIsBooking(false); // Close booking mode
  };

  const isSeatBooked = (seat) => {
    // Replace this logic with actual booking data
    return false; // Example, replace as needed
  };

  const renderSeat = (seat) => {
    const seatBooked = isSeatBooked(seat);
    const seatSelected = selectedSeats.has(seat);

    let seatClass = 'rounded-md w-8 h-8 flex items-center justify-center cursor-pointer text-xs mx-0.5 ';
    if (seatBooked) {
      seatClass += 'bg-gray-400';
    } else if (seatSelected) {
      seatClass += 'bg-green-500 text-white';
    } else {
      seatClass += 'border border-green-500 bg-transparent hover:bg-green-500';
    }

    return (
      <div
        key={seat}
        className={seatClass}
        onClick={() => !seatBooked && handleSeatSelection(seat)}
      >
        {seat}
      </div>
    );
  };

  const handleConfirmBooking = () => {
    setIsBooking(true);
  };

  return (
    <div className="p-5">
      <h1 className="text-center text-3xl font-bold mb-4">
        <i className="fas fa-film"></i> &nbsp; Book Your Seats Now!
      </h1>

      <div className="grid grid-cols-12 gap-2 mb-4">
        {rows.map(({ row, seats }) => (
          <div key={row} className="col-span-12 flex justify-center mb-2">
            <div className="flex items-center">
              {/* Right seats (reversed numbering) */}
              {Array.from({ length: Math.ceil(seats / 2) }, (_, index) => `${row}${seats - index}`).map(renderSeat)}

              {/* Middle space */}
              {seats % 2 === 0 && <div className="w-14" />}

              {/* Left seats */}
              {Array.from({ length: Math.floor(seats / 2) }, (_, index) => `${row}${seats - Math.floor(seats / 2) - index - 1}`).map(renderSeat)}
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center mr-4">
          <div className="w-4 h-4 border border-green-500 bg-transparent rounded mr-2"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center mr-4">
          <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-400 rounded mr-2"></div>
          <span>Booked</span>
        </div>
      </div>

      {/* Booking Summary */}
      {selectedSeats.size > 0 && (
        <div className="flex justify-center mb-4">
          <div className="border border-gray-300 rounded p-4">
            <h2 className="text-lg font-bold">Selected Seats:</h2>
            <p>{Array.from(selectedSeats).join(', ')}</p>
            <p>Total Amount: ₹{totalAmount}</p>
            <button onClick={handleConfirmBooking} className="bg-green-500 text-white px-4 py-2 rounded mt-2">
              Book Seats
            </button>
          </div>
        </div>
      )}

      {/* Booking Form Popup */}
      {isBooking && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-gray-800 p-5 rounded-lg shadow-xl font-black">
            <h2 className="text-xl mb-4">Booking Details</h2>
            <div className="mb-4">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                className="border border-white-300 rounded w-full p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label>Class:</label>
              <select
                name="class"
                value={userDetails.class}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full p-2"
                required
              >
                <option value="">Select Class</option>
                <option value="BCA1">BCA1</option>
                <option value="BCA2">BCA2</option>
                <option value="BCA3">BCA3</option>
                <option value="MCA1">MCA1</option>
                <option value="MCA3">MCA3</option>
              </select>
            </div>
            <div className="mb-4">
              <label>Roll No:</label>
              <input
                type="text"
                name="rollNo"
                value={userDetails.rollNo}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label>Date of Birth:</label>
              <input
                type="date"
                name="dob"
                value={userDetails.dob}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full p-2"
                required
              />
            </div>
            <p>Total Amount: ₹{totalAmount}</p>
            <div className="flex justify-end mt-4">
              <button onClick={handleBooking} className="bg-green-500 text-white px-4 py-2 rounded">
                Pay {totalAmount}
              </button>
              <button
                onClick={() => setIsBooking(false)}
                className="bg-red-500 text-white px-4 py-2 rounded ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;

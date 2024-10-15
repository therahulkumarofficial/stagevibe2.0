import React, { useState, useEffect, useRef } from 'react';
import './Booking.css';

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
  const [userDetails, setUserDetails] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [isBooking, setIsBooking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef(null);
  const scrollInterval = useRef(null);
  const isManualScroll = useRef(false);
  const autoScrollTimeout = useRef(null); // Ref for debounce timeout
  const bookedSeats = [
    'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10',
    'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10'
  ];

  const handleSeatSelection = (seat) => {
    const updatedSelectedSeats = new Set(selectedSeats);
    if (updatedSelectedSeats.has(seat)) {
      updatedSelectedSeats.delete(seat);
      const newUserDetails = { ...userDetails };
      delete newUserDetails[seat]; // Remove user details for the unselected seat
      setUserDetails(newUserDetails);
    } else {
      updatedSelectedSeats.add(seat);
    }
    setSelectedSeats(updatedSelectedSeats);
    setTotalAmount(updatedSelectedSeats.size * 250);
  };

  const handleInputChange = (seat, e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [seat]: {
        ...prevDetails[seat],
        [name]: value,
      },
    }));
  };

  const handleBooking = () => {
    const detailsList = Array.from(selectedSeats).map(seat => ({
      seat,
      ...userDetails[seat],
    }));
    alert(`Booked ${selectedSeats.size} seats for ${JSON.stringify(detailsList)}. Total: ₹${totalAmount}`);
    
    setSelectedSeats(new Set());
    setUserDetails({});
    setTotalAmount(0);
    setIsBooking(false);
  };
  

  const isSeatBooked = (seat) => {
    return bookedSeats.includes(seat);
  };

  const renderSeat = (seat) => {
    const seatBooked = isSeatBooked(seat);
    const seatSelected = selectedSeats.has(seat);

    let seatClass = 'rounded-md w-6 h-6 flex items-center justify-center cursor-pointer text-xs mx-0.5 ';
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

  const startAutoScrolling = () => {
    if (scrollRef.current && isMobile && !isManualScroll.current) {
      scrollRef.current.scrollLeft = 0; // Reset scroll position if needed
      scrollInterval.current = setInterval(() => {
        scrollRef.current.scrollBy({
          left: 1,
          behavior: 'smooth',
        });
      }, 30); // Adjust speed by changing the interval time
    }
  };

  const stopAutoScrolling = () => {
    clearInterval(scrollInterval.current);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check size on initial render
    handleResize();

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Start auto-scrolling when mobile
    if (isMobile) {
      startAutoScrolling();
    }

    return () => {
      stopAutoScrolling();
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  const handleTouchStart = () => {
    isManualScroll.current = true;
    stopAutoScrolling(); // Stop auto-scrolling
    clearTimeout(autoScrollTimeout.current); // Clear timeout if it exists
  };

  const handleTouchEnd = () => {
    isManualScroll.current = false;
    autoScrollTimeout.current = setTimeout(startAutoScrolling, 5000); // Restart auto-scrolling after 1 second of inactivity
  };

  const handleWheel = (e) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY; // Manual scroll on mouse wheel
      stopAutoScrolling(); // Stop auto-scrolling when user scrolls with the mouse
    }
  };

  return (
    <div className="p-5 bg-gradient-to-b from-[#0b0b22FD] to-[#0f1a3dFD] min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-center text-3xl font-bold mb-4">
        <i className="fas fa-film"></i> &nbsp; Book Your Seats Now!
      </h1>
      <div className="rounded-lg w-60 h-16 mb-8 flex text-center font-bold items-center justify-center text-lg text-red-500 mx-0.5 border border-yellow-500">
        All eyes this way please!
      </div>

      {/* Scrollable seat layout */}
      <div
        className="scrollable-container w-full overflow-x-scroll mb-4"
        ref={scrollRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel} // Listen for mouse wheel events
      >
        <div className="min-w-[800px]">
          <div className="grid grid-cols-12 gap-2">
            {rows.map(({ row, seats }) => (
              <div key={row} className="col-span-12 flex justify-center mb-2">
                <div className="flex items-center">
                  {/* Right seats (reversed numbering) */}
                  {Array.from({ length: Math.ceil(seats / 2) }, (_, index) => `${row}${seats - index}`).map(renderSeat)}

                  {/* Middle space */}
                  {seats % 2 === 0 && <div className="w-14" />}

                  {/* Left seats */}
                  {Array.from({ length: Math.floor(seats / 2) }, (_, index) => `${row}${seats - Math.floor(seats / 2) - index}`).map(renderSeat)}
                </div>
              </div>
            ))}
          </div>
        </div>
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
              <label>Phone:</label>
              <input
                type="number"
                name="phone"
                value={userDetails.name}
                onChange={handleInputChange}
                className="border border-white-300 rounded w-full p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label>Email:</label>
              <input
                type="email"
                name="email"
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
                type="number"
                name="rollNo"
                value={userDetails.rollNo}
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
                onClick={() => setIsBooking(false)} className="bg-red-500 text-white px-4 py-2 rounded ml-2" > Cancel </button> </div> </div> </div>)} </div>);
};

export default Booking;
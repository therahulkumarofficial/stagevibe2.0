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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentSeat, setCurrentSeat] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef(null);
  const scrollInterval = useRef(null);
  const isManualScroll = useRef(false);
  const autoScrollTimeout = useRef(null);
  const bookedSeats = [
    'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10',
    'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10'
  ];
  const [formData, setFormData] = useState({
    name: '',
    classN: '',  // Added class
    rollNo: '',   // Added roll number
    mobileNo: ''  // Added mobile number
  });
  

  const handleSeatSelection = (seat) => {
    if (!selectedSeats.has(seat) && !isSeatBooked(seat)) {
      setCurrentSeat(seat);
      setIsPopupOpen(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [currentSeat]: {
        ...prevDetails[currentSeat],
        [name]: value,
      },
    }));
  };

  const addSeatToBooking = () => {
    if (currentSeat && userDetails[currentSeat]) {
      setSelectedSeats((prev) => new Set(prev).add(currentSeat));
      setTotalAmount((prev) => prev + 250); // Assuming each seat costs ₹250
      setIsPopupOpen(false);
      setCurrentSeat('');
    }
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
        onClick={() => handleSeatSelection(seat)}
      >
        {seat}
      </div>
    );
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
      <div className="flex flex-wrap justify-center mb-4">
        <div className="flex items-center mr-4 mb-2">
          <div className="w-4 h-4 border border-green-500 bg-transparent rounded mr-2"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center mr-4 mb-2">
          <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center mr-4 mb-2">
          <div className="w-4 h-4 bg-gray-500 rounded mr-2"></div>
          <span>Booked</span>
        </div>
      </div>

      {/* Booking Summary */}
      {selectedSeats.size > 0 && (
        <div className="flex justify-center mb-4">
          <div className="border border-gray-300 rounded p-4">
            <h2 className="text-lg font-bold mb-2">Booking Summary</h2>
            <div>
              <strong>Total Seats:</strong> {selectedSeats.size}
            </div>
            <div>
              <strong>Total Amount:</strong> ₹{totalAmount}
            </div>
            <button
              className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
              onClick={handleBooking}
            >
              Pay ₹{totalAmount}
            </button>
          </div>
        </div>
      )}

      {/* Seat selection popup */}
      {isPopupOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded p-6">
            <h3 className="text-lg font-bold mb-4">Enter Details for {currentSeat}</h3>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="border border-gray-300 rounded p-2 mb-2 w-full"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="classN"
              placeholder="Class (BCA1, BCA2, etc.)"
              className="border border-gray-300 rounded p-2 mb-2 w-full"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="rollNo"
              placeholder="Roll Number"
              className="border border-gray-300 rounded p-2 mb-2 w-full"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="mobileNo"
              placeholder="Your Mobile Number"
              className="border border-gray-300 rounded p-2 mb-2 w-full"
              onChange={handleInputChange}
            />
            <div className="flex justify-between">
              <button
                className="bg-gray-300 text-gray-700 py-1 px-3 rounded"
                onClick={() => setIsPopupOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-1 px-3 rounded"
                onClick={addSeatToBooking}
              >
                Add Seat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
  
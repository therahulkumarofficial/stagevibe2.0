import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, set, push, onValue, remove } from 'firebase/database';
import database from '../firebase'; // Import Firebase instance

const AdminDashboard = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('currentAdmin') !== null;


    useEffect(() => {
        if (!isAdmin) {
            navigate('/adminlogin');
        }
    }, [isAdmin, navigate]);

  const [adminName, setAdminName] = useState('Admin');
  const [users, setUsers] = useState([]);
  const [performers, setPerformers] = useState([]);

  const [userForm, setUserForm] = useState({
    name: '',
    class: '',
    roll: '',
    mobile: '',
    seatNo: '',
    paymentMode: 'cash',
  });

  const [performerForm, setPerformerForm] = useState({
    name: '',
    imgUrl: '',
  });

  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  // Fetch data from Firebase on component mount
  useEffect(() => {
    const usersRef = ref(database, 'users');
    const performersRef = ref(database, 'performers');

    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      setUsers(data ? Object.values(data) : []);
    });

    onValue(performersRef, (snapshot) => {
      const data = snapshot.val();
      setPerformers(data ? Object.values(data) : []);
    });
  }, []);

  // Handler functions for form inputs
  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handlePerformerInputChange = (e) => {
    const { name, value } = e.target;
    setPerformerForm({ ...performerForm, [name]: value });
  };

  // Function to add user
  const handleAddUser = (e) => {
    e.preventDefault();
    const usersRef = ref(database, 'users');
    const newUserRef = push(usersRef);
    set(newUserRef, { ...userForm, id: newUserRef.key, approved: false });
    showPopup(`User ${userForm.name} added successfully.`);
    setUserForm({ name: '', class: '', roll: '', mobile: '', seatNo: '', paymentMode: 'cash' });
  };

  // Function to add performer
  const handleAddPerformer = (e) => {
    e.preventDefault();
    const performersRef = ref(database, 'performers');
    const newPerformerRef = push(performersRef);
    set(newPerformerRef, { ...performerForm, id: newPerformerRef.key });
    showPopup(`Performer ${performerForm.name} added successfully.`);
    setPerformerForm({ name: '', imgUrl: '' });
  };

  // Delete user
  const handleDeleteUser = (id) => {
    const userRef = ref(database, `users/${id}`);
    remove(userRef);
    showPopup('User deleted successfully.');
  };

  // Delete performer
  const handleDeletePerformer = (id) => {
    const performerRef = ref(database, `performers/${id}`);
    remove(performerRef);
    showPopup('Performer deleted successfully.');
  };

  // Function to show popup message
  const showPopup = (msg) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      setMessage('');
    }, 3000); // Show for 3 seconds
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
        <h2 className="text-xl font-semibold text-gray-600 mb-6">Welcome {adminName}</h2>

        {/* Display the message */}
        {showMessage && (
          <div className="bg-green-500 text-white p-4 rounded-md mb-4">
            {message}
          </div>
        )}

        {/* Add User Form */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold mb-4 text-blue-700">Add User</h3>
          <form onSubmit={handleAddUser} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={userForm.name}
              onChange={handleUserInputChange}
              placeholder="Name"
              className="p-2 border border-blue-300 rounded-md"
              required
            />
            <select
              name="class"
              value={userForm.class}
              onChange={handleUserInputChange}
              className="p-2 border border-blue-300 rounded-md"
              required
            >
              <option value="">Select Class</option>
              <option value="BCA1">BCA1</option>
              <option value="BCA2">BCA2</option>
              <option value="BCA3">BCA3</option>
              <option value="MCA1">MCA1</option>
              <option value="MCA3">MCA3</option>
            </select>
            <input
              type="text"
              name="roll"
              value={userForm.roll}
              onChange={handleUserInputChange}
              placeholder="Roll"
              className="p-2 border border-blue-300 rounded-md"
              required
            />
            <input
              type="text"
              name="mobile"
              value={userForm.mobile}
              onChange={handleUserInputChange}
              placeholder="Mobile"
              className="p-2 border border-blue-300 rounded-md"
              required
            />
            <input
              type="text"
              name="seatNo"
              value={userForm.seatNo}
              onChange={handleUserInputChange}
              placeholder="Seat No"
              className="p-2 border border-blue-300 rounded-md"
              required
            />
            <select
              name="paymentMode"
              value={userForm.paymentMode}
              onChange={handleUserInputChange}
              className="p-2 border border-blue-300 rounded-md"
            >
              <option value="cash">Cash</option>
              <option value="online">Online</option>
            </select>
            <button
              type="submit"
              className="col-span-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add User
            </button>
          </form>
        </div>

        {/* Add Performer Form */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold mb-4 text-blue-700">Add Performer</h3>
          <form onSubmit={handleAddPerformer} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={performerForm.name}
              onChange={handlePerformerInputChange}
              placeholder="Performer Name"
              className="p-2 border border-blue-300 rounded-md"
              required
            />
            <input
              type="text"
              name="imgUrl"
              value={performerForm.imgUrl}
              onChange={handlePerformerInputChange}
              placeholder="Image URL"
              className="p-2 border border-blue-300 rounded-md"
              required
            />
            <button
              type="submit"
              className="col-span-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add Performer
            </button>
          </form>
        </div>

        {/* Display Users */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold mb-4 text-blue-700">Users</h3>
          {users.length > 0 ? (
            <ul className="space-y-4">
              {users.map((user) => (
                <li
                  key={user.id}
                  className={`flex justify-between items-center p-4 rounded-md shadow-md ${user.approved ? 'bg-green-200' : 'bg-red-200'
                    }`}
                >
                  <div className='text-black'>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Class:</strong> {user.class}</p>
                    <p><strong>Roll:</strong> {user.roll}</p>
                    <p><strong>Mobile:</strong> {user.mobile}</p>
                    <p><strong>Payment Mode:</strong> {user.paymentMode}</p>
                    <p><strong>Approved:</strong> {user.approved ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No users available.</p>
          )}

        </div>

        {/* Display Performers */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-blue-700">Performers</h3>
          {performers.length > 0 ? (
            <ul className="space-y-4">
              {performers.map((performer) => (
                <li key={performer.id} className="flex justify-between items-center p-4 bg-gray-200 rounded-md shadow-md">
                  <div className='text-black'>
                    <p><strong>Name:</strong> {performer.name}</p>
                    <img src={performer.imgUrl} alt={performer.name} className="w-20 h-20 object-cover mt-2" />
                  </div>
                  <div>
                    <button
                      onClick={() => handleDeletePerformer(performer.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No performers available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

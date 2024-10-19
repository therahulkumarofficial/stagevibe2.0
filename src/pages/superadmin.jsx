import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, set, push, onValue, remove } from 'firebase/database';
import database from '../firebase'; // Import Firebase instance



const SuperAdminDashboard = () => {

    const navigate = useNavigate();
    const isSuperAdmin = localStorage.getItem('currentSuperAdmin') !== null;


    useEffect(() => {
        if (!isSuperAdmin) {
            navigate('/sadminlogin');
        }
    }, [isSuperAdmin, navigate]);


    const [superadminName, setSuperadminName] = useState('Super Admin');
    const [users, setUsers] = useState([]);
    const [performers, setPerformers] = useState([]);
    const [admins, setAdmins] = useState([]);

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

    const [adminForm, setAdminForm] = useState({
        username: '',
        password: '',
    });

    const [editingUser, setEditingUser] = useState(null);
    const [message, setMessage] = useState(''); // State to handle messages
    const [showMessage, setShowMessage] = useState(false); // State to control the visibility of the message

    // Fetch data from Firebase on component mount
    useEffect(() => {
        const usersRef = ref(database, 'users');
        const performersRef = ref(database, 'performers');
        const adminsRef = ref(database, 'admins');

        onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            setUsers(data ? Object.values(data) : []);
        });

        onValue(performersRef, (snapshot) => {
            const data = snapshot.val();
            setPerformers(data ? Object.values(data) : []);
        });

        onValue(adminsRef, (snapshot) => {
            const data = snapshot.val();
            setAdmins(data ? Object.values(data) : []);
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

    const handleAdminInputChange = (e) => {
        const { name, value } = e.target;
        setAdminForm({ ...adminForm, [name]: value });
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

    // Function to add admin
    const handleAddAdmin = (e) => {
        e.preventDefault();
        const adminsRef = ref(database, 'admins');
        const newAdminRef = push(adminsRef);
        set(newAdminRef, { ...adminForm, id: newAdminRef.key });
        showPopup(`Admin ${adminForm.username} added successfully.`);
        setAdminForm({ username: '', password: '' });
    };

    // Approve user
    const handleApproveUser = (id) => {
        const userRef = ref(database, `users/${id}`);
        const updatedUser = users.find((user) => user.id === id);
        set(userRef, { ...updatedUser, approved: true });
        showPopup(`User ${updatedUser.name} approved.`);
    };

    // Edit user
    const handleEditUser = (user) => {
        setEditingUser(user);
        setUserForm(user);
    };

    const handleSaveEditUser = () => {
        const userRef = ref(database, `users/${editingUser.id}`);
        set(userRef, { ...editingUser, ...userForm });
        showPopup(`User ${editingUser.name} updated successfully.`);
        setEditingUser(null);
        setUserForm({ name: '', class: '', roll: '', mobile: '', seatNo: '', paymentMode: 'cash' });
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

    // Delete admin
    const handleDeleteAdmin = (id) => {
        const adminRef = ref(database, `admins/${id}`);
        remove(adminRef);
        showPopup('Admin deleted successfully.');
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

    // Render approved users and pending users
    const approvedUsers = users.filter((user) => user.approved);
    const pendingUsers = users.filter((user) => !user.approved);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    SuperAdmin Dashboard
                </h1>
                <h2 className="text-xl font-semibold text-gray-600 mb-6">
                    Welcome {superadminName}
                </h2>

                {/* Display the message */}
                {showMessage && (
                    <div className="bg-green-500 text-white p-4 rounded-md mb-4">
                        {message}
                    </div>
                )}

                {/* Add User Form */}
                <div className="mb-10 ">
                    <h3 className="text-2xl font-bold mb-4 text-black">Add User</h3>
                    <form onSubmit={handleAddUser} className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="name"
                            value={userForm.name}
                            onChange={handleUserInputChange}
                            placeholder="Name"
                            className="p-2 border border-gray-300 rounded-md"
                            required
                        />
                        <select
                            name="class"
                            value={userForm.class}
                            onChange={handleUserInputChange}
                            placeholder="Class"
                            className="p-2 border border-gray-300 rounded-md"
                            required
                        >
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
                            className="p-2 border border-gray-300 rounded-md"
                            required
                        />
                        <input
                            type="text"
                            name="mobile"
                            value={userForm.mobile}
                            onChange={handleUserInputChange}
                            placeholder="Mobile"
                            className="p-2 border border-gray-300 rounded-md"
                            required
                        />
                        <input
                            type="text"
                            name="seatNo"
                            value={userForm.seatNo}
                            onChange={handleUserInputChange}
                            placeholder="Seat No (Pending)"
                            className="p-2 border border-gray-300 rounded-md"
                            required
                        />
                        <select
                            name="paymentMode"
                            value={userForm.paymentMode}
                            onChange={handleUserInputChange}
                            className="p-2 border border-gray-300 rounded-md"
                        >
                            <option value="cash">Cash</option>
                            <option value="online">Online</option>
                        </select>
                        <button
                            type="submit"
                            className="col-span-2 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                        >
                            Add User
                        </button>
                    </form>
                </div>

                {/* Add Performer Form */}
                <div className="mb-10">
                    <h3 className="text-2xl font-bold mb-4 text-black">Add Performer</h3>
                    <form onSubmit={handleAddPerformer} className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="name"
                            value={performerForm.name}
                            onChange={handlePerformerInputChange}
                            placeholder="Performer Name"
                            className="p-2 border border-gray-300 rounded-md"
                            required
                        />
                        <input
                            type="text"
                            name="imgUrl"
                            value={performerForm.imgUrl}
                            onChange={handlePerformerInputChange}
                            placeholder="Image URL"
                            className="p-2 border border-gray-300 rounded-md"
                            required
                        />
                        <button
                            type="submit"
                            className="col-span-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                        >
                            Add Performer
                        </button>
                    </form>
                </div>

                {/* Add Admin Form */}
                <div className="mb-10">
                    <h3 className="text-2xl font-bold mb-4 text-black">Add Admin</h3>
                    <form onSubmit={handleAddAdmin} className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="username"
                            value={adminForm.username}
                            onChange={handleAdminInputChange}
                            placeholder="Username"
                            className="p-2 border border-gray-300 rounded-md"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={adminForm.password}
                            onChange={handleAdminInputChange}
                            placeholder="Password"
                            className="p-2 border border-gray-300 rounded-md"
                            required
                        />
                        <button
                            type="submit"
                            className="col-span-2 bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition"
                        >
                            Add Admin
                        </button>
                    </form>
                </div>

                {/* Display Users */}
                <div className="mb-10">
                    <h3 className="text-2xl font-bold mb-4 text-black">Approved Users</h3>
                    {approvedUsers.length > 0 ? (
                        <ul className="space-y-4">
                            {approvedUsers.map((user) => (
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

                {/* Display Pending Users */}
                <div className="mb-10">
                    <h3 className="text-2xl font-bold mb-4 text-black">Pending Users</h3>
                    {pendingUsers.length > 0 ? (
                        <ul className="space-y-4">
                            {pendingUsers.map((user) => (
                                <li key={user.id} className={`flex justify-between items-center p-4 rounded-md shadow-md ${user.approved ? 'bg-green-200' : 'bg-red-200'
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
                                            onClick={() => handleApproveUser(user.id)}
                                            className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600 transition"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>) : (
                        <p className="text-black">No pending users.</p>
                    )}
                </div>

                {/* Display Performers */}
                <div className="mb-10">

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

                {/* Display Admins */}
                <div className="mb-10">
                    <h3 className="text-2xl font-bold mb-4 text-black">Admins</h3>
                    {admins.length > 0 ? (
                        <ul className="space-y-4">
                            {admins.map((admin) => (
                                <li key={admin.id} className="bg-gray-200 p-4 rounded-md flex justify-between items-center">
                                    <span className="text-black">user: {admin.username}</span>
                                    <span className='text-black'>pass: {admin.password}</span>
                                    <button
                                        onClick={() => handleDeleteAdmin(admin.id)}
                                        className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>) : (
                        <p className="text-black">No Admins.</p>
                    )}
                </div>
            </div>
        </div>
    );


};

export default SuperAdminDashboard;

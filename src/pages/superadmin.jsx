import React, { useState } from 'react';

const SuperAdminDashboard = () => {
    const [superadminName, setSuperadminName] = useState('Super Admin'); // Change to dynamic data if needed
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
        setUsers([...users, { ...userForm, id: users.length + 1, approved: false }]);
        setUserForm({ name: '', class: '', roll: '', mobile: '', seatNo: '', paymentMode: 'cash' });
    };

    // Function to add performer
    const handleAddPerformer = (e) => {
        e.preventDefault();
        setPerformers([...performers, { ...performerForm, id: performers.length + 1 }]);
        setPerformerForm({ name: '', imgUrl: '' });
    };

    // Function to add admin
    const handleAddAdmin = (e) => {
        e.preventDefault();
        setAdmins([...admins, { ...adminForm, id: admins.length + 1 }]);
        setAdminForm({ username: '', password: '' });
    };

    // Approve user
    const handleApproveUser = (id) => {
        const updatedUsers = users.map((user) => (user.id === id ? { ...user, approved: true } : user));
        setUsers(updatedUsers);
    };

    // Edit user
    const handleEditUser = (user) => {
        setEditingUser(user);
        setUserForm(user);
    };

    const handleSaveEditUser = () => {
        const updatedUsers = users.map((user) =>
            user.id === editingUser.id ? { ...editingUser, ...userForm } : user
        );
        setUsers(updatedUsers);
        setEditingUser(null);
        setUserForm({ name: '', class: '', roll: '', mobile: '', seatNo: '', paymentMode: 'cash' });
    };

    // Delete user
    const handleDeleteUser = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    // Render approved users
    const approvedUsers = users.filter((user) => user.approved);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    SuperAdmin Dashboard
                </h1>
                <h2 className="text-xl font-semibold text-gray-600 mb-6">
                    Welcome {superadminName}
                </h2>

                {/* Add User Form */}
                <div className="mb-10">
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
                            placeholder="Name"
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
                    <h3 className="text-2xl font-bold text-black mb-4">Add Admin</h3>
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
                {/* Show Admins */}
                <div className="mb-10">
                    <h3 className="text-2xl font-bold mb-4 text-black">Admins:</h3>
                    <ul>
                        {admins.map((admin) => (
                            <li key={admin.id} className="mb-4 p-4 bg-gray-600 font-medium rounded-md">
                                <p>Username: {admin.username}</p>
                                <p>Password: {admin.password}</p>
                                <button
                                    onClick={() => handleDeleteAdmin(admin.id)} // Assuming a delete function
                                    className="bg-red-500 text-white py-1 px-3 rounded-md"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Show Performers */}
                <div className="mb-10">
                    <h3 className="text-2xl font-bold mb-4 text-black">Performers:</h3>
                    <ul>
                        {performers.map((performer) => (
                            <li key={performer.id} className="mb-4 p-4 bg-gray-600 font-medium rounded-md">
                                <p>Name: {performer.name}</p>
                                <img src={performer.imgUrl} alt={performer.name} className="w-16 h-16 rounded-full" />
                                <button
                                    onClick={() => handleDeletePerformer(performer.id)} // Assuming a delete function
                                    className="bg-red-500 text-white py-1 px-3 rounded-md"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Pending Users */}
                <div className="mb-10">
                    <h3 className="text-2xl font-bold text-slate-950 mb-4">Pending Users:</h3>
                    <ul>
                        {users
                            .filter((user) => !user.approved)
                            .map((user) => (
                                <li key={user.id} className="mb-4 p-4 bg-gray-800 rounded-lg">
                                    <p>Name: {user.name}</p>
                                    <p>Class: {user.class}</p>
                                    <p>Roll: {user.roll}</p>
                                    <p>Mobile: {user.mobile}</p>
                                    <p>Seat No: {user.seatNo}</p>
                                    <p>Payment Mode: {user.paymentMode}</p>
                                    <button
                                        onClick={() => handleApproveUser(user.id)}
                                        className="bg-green-500 text-white py-1 px-3 rounded-md mr-2"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleEditUser(user)}
                                        className="bg-yellow-500 text-white py-1 px-3 rounded-md mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="bg-red-500 text-white py-1 px-3 rounded-md"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                    </ul>
                </div>

                {/* Approved Users */}
                <div>
                    <h3 className="text-2xl font-bold mb-4 text-black">Approved Users:</h3>
                    <ul>
                        {approvedUsers.map((user) => (
                            <li key={user.id} className="mb-4 p-4 bg-green-500 font-medium rounded-md">
                                <p>Name: {user.name}</p>
                                <p>Class: {user.class}</p>
                                <p>Roll: {user.roll}</p>
                                <p>Mobile: {user.mobile}</p>
                                <p>Seat No: {user.seatNo}</p>
                                <p>Payment Mode: {user.paymentMode}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;

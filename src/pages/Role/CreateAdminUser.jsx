import { useState, useEffect } from "react";
import { FaPen, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const CreateAdminUser = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        user_id: null,
        email: "",
        phone_number: "",
        password: "",
        name: "",
        gender: "",
        roleId: "",
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const itemsPerPage = 5;

    const API_URL = "/api/auth";

    // Fetch roles
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get(`/api/roles`);
                setRoles(response.data);
            } catch (err) {
                setError("Failed to fetch roles.");
                console.error("Error fetching roles:", err);
            }
        };
        fetchRoles();
    }, []);

    // Fetch admin users
    const fetchUsers = async (page = 1, query = "") => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/users/admin`, {
                params: { page, itemsPerPage, search: query },
            });
            setUsers(response.data.users || []);
            setTotalPages(response.data.totalPages || 1);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch users.");
            console.error("Error fetching users:", err);
            setLoading(false);
        }
    };

    // Debounced search
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setCurrentPage(1);
            fetchUsers(1, searchQuery);
        }, 300);
        return () => clearTimeout(delayDebounce);
    }, [searchQuery]);

    // Fetch users on page change
    useEffect(() => {
        fetchUsers(currentPage, searchQuery);
    }, [currentPage]);

    // Open modal for adding new user
    const openAddModal = () => {
        setCurrentUser({
            user_id: null,
            email: "",
            phone_number: "",
            password: "",
            name: "",
            gender: "",
            roleId: roles.length > 0 ? roles[0].id : "",
        });
        setIsEditMode(false);
        setModalVisible(true);
        setError("");
        setSuccess("");
    };

    // Open modal for editing user
    const openEditModal = (user) => {
        setCurrentUser({
            user_id: user.user_id,
            email: user.email,
            phone_number: user.phone_number,
            password: "",
            gender: user.gender,
            name: user.name,
            roleId: user.roleId || (roles.length > 0 ? roles[0].id : ""),
        });
        setIsEditMode(true);
        setModalVisible(true);
        setError("");
        setSuccess("");
    };

    // Handle form changes
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser((prev) => ({ ...prev, [name]: value }));
    };

    // Save user (create or update)
    const saveUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const payload = {
                email: currentUser.email,
                phone_number: currentUser.phone_number,
                name: currentUser.name,
                roleId: currentUser.roleId,
                gender: currentUser.gender,
                user_type: "admin",
            };
            if (!isEditMode || (isEditMode && currentUser.password)) {
                payload.password = currentUser.password;
            }

            if (isEditMode) {
                await axios.put(`${API_URL}/users/admin/${currentUser.user_id}`, payload);
                setSuccess("User updated successfully!");
            } else {
                await axios.post(`${API_URL}/users/admin`, payload);
                setSuccess("User created successfully!");
            }

            fetchUsers(currentPage, searchQuery);
            setModalVisible(false);
        } catch (err) {
            setError("Failed to save user.");
            console.error("Error saving user:", err);
        } finally {
            setLoading(false);
        }
    };

    // Delete user
    const deleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await axios.delete(`${API_URL}/users/admin/${userId}`);
            setSuccess("User deleted successfully!");
            fetchUsers(currentPage, searchQuery);
        } catch (err) {
            setError("Failed to delete user.");
            console.error("Error deleting user:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
            <div style={{ flexGrow: 1, backgroundColor: "#f9fafb" }}>
                <div className="p-6 bg-gray-50 min-h-screen w-full">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-black">Admin User Management</h1>
                        <button
                            onClick={openAddModal}
                            className="bg-slate-600 text-white px-6 py-2 rounded shadow hover:bg-slate-700 transition duration-300"
                        >
                            Add Admin User
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-4 flex items-center gap-2">
                        <div className="relative w-full max-w-md">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name or email..."
                                className="w-full border border-gray-300 rounded px-10 py-2 focus:outline-none focus:ring-2"
                            />
                        </div>
                    </div>

                    {/* Error/Success Messages */}
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    {success && <div className="text-green-500 mb-4">{success}</div>}

                    {/* Users Table */}
                    <table className="w-full border-collapse bg-white rounded shadow-lg">
                        <thead className="bg-slate-600 text-white">
                            <tr>
                                <th className="border-b px-6 py-3 text-left">ID</th>
                                <th className="border-b px-6 py-3 text-left">Name</th>
                                <th className="border-b px-6 py-3 text-left">Email</th>
                                <th className="border-b px-6 py-3 text-left">Phone</th>
                                <th className="border-b px-6 py-3 text-left">Gender</th>
                                <th className="border-b px-6 py-3 text-left">Role</th>
                                <th className="border-b px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        Loading...
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user, i) => (
                                    <tr key={user.user_id} className="hover:bg-gray-100">
                                        <td className="border-b px-6 py-3">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                                        <td className="border-b px-6 py-3">{user.name}</td>
                                        <td className="border-b px-6 py-3">{user.email}</td>
                                        <td className="border-b px-6 py-3">{user.phone_number}</td>
                                        <td className="border-b px-6 py-3">{user.gender}</td>
                                        <td className="border-b px-6 py-3">
                                            {roles.find((role) => role.id === user.roleId)?.name || "N/A"}
                                        </td>
                                        <td className="border-b px-6 py-3 flex gap-4">
                                            <button
                                                onClick={() => openEditModal(user)}
                                                className="text-slate-600 hover:text-slate-800"
                                            >
                                                <FaPen />
                                            </button>
                                            <button
                                                onClick={() => deleteUser(user.user_id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <MdDelete />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="bg-gray-300 text-black px-4 py-2 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="bg-gray-300 text-black px-4 py-2 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>

                    {/* Modal for Add/Edit User */}
                    {modalVisible && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                                <h2 className="text-2xl font-bold mb-4 text-center text-black">
                                    {isEditMode ? "Edit Admin User" : "Add Admin User"}
                                </h2>
                                <form onSubmit={saveUser} className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={currentUser.name}
                                            onChange={handleFormChange}
                                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2"
                                            placeholder="Enter name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={currentUser.email}
                                            onChange={handleFormChange}
                                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2"
                                            placeholder="Enter email"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            id="phone_number"
                                            name="phone_number"
                                            value={currentUser.phone_number}
                                            onChange={handleFormChange}
                                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2"
                                            placeholder="Enter phone number"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                                            Gender
                                        </label>
                                        <select
                                            id="gender"
                                            name="gender"
                                            value={currentUser.gender}
                                            onChange={handleFormChange}
                                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2"
                                            required
                                        >
                                            <option value=''>Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>

                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Password {isEditMode ? "(Leave blank to keep unchanged)" : ""}
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={currentUser.password}
                                            onChange={handleFormChange}
                                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2"
                                            placeholder="Enter password"
                                            required={!isEditMode}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="roleId" className="block text-sm font-medium text-gray-700">
                                            Role
                                        </label>
                                        <select
                                            id="roleId"
                                            name="roleId"
                                            value={currentUser.roleId}
                                            onChange={handleFormChange}
                                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2"
                                            required
                                        >
                                            {roles.map((role) => (
                                                <option key={role.id} value={role.id}>
                                                    {role.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex justify-end gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setModalVisible(false)}
                                            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className={`bg-slate-600 text-white px-4 py-2 rounded shadow hover:bg-slate-700 transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""
                                                }`}
                                        >
                                            {loading ? "Saving..." : "Save"}
                                        </button>
                                    </div>
                                </form>
                                <button
                                    onClick={() => setModalVisible(false)}
                                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateAdminUser;
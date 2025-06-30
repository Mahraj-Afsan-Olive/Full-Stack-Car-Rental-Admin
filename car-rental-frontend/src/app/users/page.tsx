"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import { FaEdit, FaKey, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const Modal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode }> = ({
  title,
  onClose,
  children,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 text-2xl font-bold transition-colors duration-200"
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-2">{title}</h2>
        {children}
      </div>
    </div>
  );
};

const UsersPage = () => {
  const [username, setUsername] = useState("Admin");
  const [users, setUsers] = useState<any[]>([]);
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "" });
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [modalType, setModalType] = useState<"username" | "password" | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [searchUsername, setSearchUsername] = useState("");
  const [searchResult, setSearchResult] = useState<any | null>(null);
  const [searchError, setSearchError] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed?.username) setUsername(parsed.username);
      } catch (error) {
        console.error("Failed to parse userInfo from localStorage", error);
      }
    }
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/users", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setUsers(res.data);
      setSearchResult(null);
      setSearchError("");
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError("");
    if (!searchUsername.trim()) {
      fetchUsers();
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:3000/users/find-by-username/${encodeURIComponent(searchUsername)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setSearchResult(res.data);
      setUsers([]);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setSearchError("User not found");
        toast.error("User not found");
      } else {
        setSearchError("Error searching user");
        toast.error("Error searching user");
      }
      setSearchResult(null);
      setUsers([]);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3000/users/add-user", newUser, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      toast.success("User added successfully!");
      setNewUser({ username: "", email: "", password: "" });
      fetchUsers();
    } catch (err) {
      console.error("Error adding user", err);
      toast.error("Failed to add user");
    }
  };

  const handleDeleteUserConfirmed = async () => {
    if (deleteUserId === null) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/users/delete-user/${deleteUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      toast.success("User deleted successfully!");
      setDeleteUserId(null);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user", err);
      toast.error("Failed to delete user");
    }
  };

  const handleCancelDelete = () => {
    setDeleteUserId(null);
  };

  const handleUpdateUsername = async () => {
    if (!selectedUserId) return;
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3000/users/update-username/${selectedUserId}`,
        { username: editUsername },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      toast.success("Username updated successfully!");
      setEditUsername("");
      setSelectedUserId(null);
      setModalType(null);
      fetchUsers();
    } catch (err) {
      console.error("Error updating username", err);
      toast.error("Failed to update username");
    }
  };

  const handleUpdatePassword = async () => {
    if (!selectedUserId) return;
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3000/users/update-password/${selectedUserId}`,
        { password: editPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      toast.success("Password updated successfully!");
      setEditPassword("");
      setSelectedUserId(null);
      setModalType(null);
      fetchUsers();
    } catch (err) {
      console.error("Error updating password", err);
      toast.error("Failed to update password");
    }
  };

  const displayedUsers = searchResult ? [searchResult] : users;

  const renderModal = () => {
    if (modalType === "username" && selectedUserId !== null) {
      return (
        <Modal title="Edit Username" onClose={() => setModalType(null)}>
          <input
            type="text"
            value={editUsername}
            onChange={(e) => setEditUsername(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setModalType(null)}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateUsername}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </Modal>
      );
    }

    if (modalType === "password" && selectedUserId !== null) {
      return (
        <Modal title="Edit Password" onClose={() => setModalType(null)}>
          <input
            type="password"
            value={editPassword}
            onChange={(e) => setEditPassword(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setModalType(null)}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdatePassword}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
            >
              Save
            </button>
          </div>
        </Modal>
      );
    }

    if (deleteUserId !== null) {
      return (
        <Modal title="Confirm Delete" onClose={() => setDeleteUserId(null)}>
          <p className="mb-6">Are you sure you want to delete this user?</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleCancelDelete}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              No
            </button>
            <button
              onClick={handleDeleteUserConfirmed}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              Yes
            </button>
          </div>
        </Modal>
      );
    }

    return null;
  };

  return (
    <div className="flex bg-gray-100 h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-60">
        <div className="fixed top-0 left-60 right-0 z-50 shadow-md bg-white">
          <Header username={username} />
        </div>

        <div className="fixed bottom-0 left-60 right-0 z-50 shadow-inner bg-white">
          <Footer />
        </div>

        <main className="flex-1 pt-20 pb-16 px-8 overflow-y-auto mb-[60px]">
          <div className="max-w-6xl mx-auto space-y-10">
            {/* Modified section for label + search bar */}
            <div className="flex items-center justify-start gap-6 flex-wrap">
              <h1 className="text-3xl font-extrabold text-gray-800 border-b border-gray-300 pb-3">
                User Management
              </h1>

              <form onSubmit={handleSearch} className="flex space-x-4 max-w-lg flex-grow min-w-[280px] ml-80">
                <input
                  type="text"
                  placeholder="Search username"
                  value={searchUsername}
                  onChange={(e) => setSearchUsername(e.target.value)}
                  className="flex-grow border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-4 py-2 rounded-lg font-semibold transition"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearchUsername("");
                    setSearchResult(null);
                    setSearchError("");
                    fetchUsers();
                  }}
                  className="bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                >
                  Clear
                </button>
              </form>
            </div>

            {searchError && <p className="text-red-600 font-medium">{searchError}</p>}

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-3">
                Add User
              </h2>
              <form onSubmit={handleAddUser} className="space-y-6">
                <input
                  type="text"
                  placeholder="Username"
                  autoComplete="off"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="off"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  Add User
                </button>
              </form>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-3">
                All Users
              </h2>
              <ul className="divide-y divide-gray-200">
                {displayedUsers.length > 0 ? (
                  displayedUsers.map((user: any) => (
                    <li
                      key={user.id}
                      className="py-4 flex justify-between items-center hover:bg-gray-50 rounded-lg px-4 transition"
                    >
                      <span className="font-medium text-gray-800">
                        {user.username} <span className="text-gray-500">({user.email})</span>
                      </span>
                      <div className="space-x-3 flex items-center">
                        <button
                          onClick={() => {
                            setSelectedUserId(user.id);
                            setEditUsername(user.username);
                            setModalType("username");
                            setEditPassword("");
                          }}
                          className="bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white px-3 py-2 rounded-lg flex items-center space-x-2 transition"
                          title="Edit Username"
                        >
                          <FaEdit />
                          <span>Edit Username</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUserId(user.id);
                            setModalType("password");
                            setEditPassword("");
                            setEditUsername("");
                          }}
                          className="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white px-3 py-2 rounded-lg flex items-center space-x-2 transition"
                          title="Edit Password"
                        >
                          <FaKey />
                          <span>Edit Password</span>
                        </button>
                        <button
                          onClick={() => {
                            setDeleteUserId(user.id);
                          }}
                          className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-3 py-2 rounded-lg flex items-center space-x-2 transition"
                          title="Delete User"
                        >
                          <FaTrash />
                          <span>Delete</span>
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-600 italic">No users found.</p>
                )}
              </ul>
            </div>
          </div>
        </main>

        {renderModal()}
      </div>
    </div>
  );
};

export default UsersPage;

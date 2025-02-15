import React, { useEffect, useState } from 'react';
import axios from 'axios';
import H from "../H&F/Header";
import F from "../H&F/Footer";
import { useNavigate } from 'react-router-dom';

const PengurusApprove = () => {
    const [approvals, setApprovals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'NAMA_LENGKAP', direction: 'asc' });
    const [jobFilter, setJobFilter] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [actionType, setActionType] = useState('');
    const navigate = useNavigate();
    const role = localStorage.getItem('UUID_MS_JOB');

    if (role === '1') {  
        navigate('/'); 
        return null; 
      }

    const fetchApprovals = async () => {
        try {
            const response = await axios.get("http://localhost:5000/approval");
            setApprovals(response.data);
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error fetching approvals:", error);
        }
    };

    const handleApprove = async () => {
        try {
            await axios.put(`http://localhost:5000/approve/${selectedUser}`);
            alert("User approved successfully!");
            setApprovals(prev => prev.filter(user => user.UUID_MS_USER !== selectedUser));
            setSearchResults(prev => prev.filter(user => user.UUID_MS_USER !== selectedUser));
            setShowModal(false);
        } catch (error) {
            console.error("Error approving user:", error);
            alert("Failed to approve user. Please try again.");
            setShowModal(false);
        }
    };

    const handleReject = async () => {
        try {
            await axios.delete(`http://localhost:5000/reject/${selectedUser}`);
            alert("User rejected successfully!");
            setApprovals(prev => prev.filter(user => user.UUID_MS_USER !== selectedUser));
            setSearchResults(prev => prev.filter(user => user.UUID_MS_USER !== selectedUser));
            setShowModal(false);
        } catch (error) {
            console.error("Error rejecting user:", error);
            alert("Failed to reject user. Please try again.");
            setShowModal(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setIsSearching(true);

        if (!searchTerm.trim()) {
            setSearchResults(approvals);
            return;
        }

        const filteredData = approvals.filter((user) => {
            const searchTermLower = searchTerm.toLowerCase();
            return user.NAMA_LENGKAP.toLowerCase().includes(searchTermLower);
        });

        setSearchResults(filteredData);
    };

    const handleJobFilter = (e) => {
        setJobFilter(e.target.value);
    };

    const filteredByJob = (data) => {
        if (!jobFilter) return data;
        return data.filter((user) => {
            return (Number(user.UUID_MS_JOB) === 1 && jobFilter === 'Anggota') || 
                   (Number(user.UUID_MS_JOB) === 2 && jobFilter === 'Pengurus') ||
                   (Number(user.UUID_MS_JOB) === 3 && jobFilter === 'Admin');
        });
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = () => {
        const data = isSearching ? searchResults : approvals;
        const filteredData = filteredByJob(data);
        return filteredData.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    };

    useEffect(() => {
        fetchApprovals();
    }, []);

    const displayedData = sortedData();

    return (
        <div className="flex flex-col min-h-screen">
            <H />
            <main className="flex-grow container mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Manajemen Persetujuan Pengguna</h2>
                <form onSubmit={handleSearch} className="mb-6 flex flex-col md:flex-row items-center justify-center space-x-4">
                    <select
                        className="border border-gray-300 rounded-lg px-4 py-2 mb-4 md:mb-0"
                        value={jobFilter}
                        onChange={handleJobFilter}
                    >
                        <option value="">All Jobs</option>
                        <option value="Anggota">Anggota</option>
                        <option value="Pengurus">Pengurus</option>
                        <option value="Admin">Admin</option>
                    </select>

                    <input
                        type="text"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md mb-4 md:mb-0"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="ml-4 bg-gradient-to-b from-[#2e86c1] to-[#21618c] text-white px-4 py-2 rounded hover:bg-gray-300"
                    >
                        Search
                    </button>
                </form>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg text-center">
                        <thead>
                            <tr className="bg-gray-100">
                                <th
                                    className="px-4 py-2 border-b font-semibold text-gray-700 cursor-pointer"
                                    onClick={() => handleSort('NAMA_LENGKAP')}
                                >
                                    Nama
                                </th>
                                <th
                                    className="px-4 py-2 border-b font-semibold text-gray-700 cursor-pointer"
                                    onClick={() => handleSort('EMAIL')}
                                >
                                    Email
                                </th>
                                <th
                                    className="px-4 py-2 border-b font-semibold text-gray-700 cursor-pointer"
                                    onClick={() => handleSort('NOMOR_TELP')}
                                >
                                    Phone
                                </th>
                                <th
                                    className="px-4 py-2 border-b font-semibold text-gray-700 cursor-pointer"
                                    onClick={() => handleSort('UUID_MS_JOB')}
                                >
                                    Role
                                </th>
                                <th className="px-4 py-2 border-b font-semibold text-gray-700 text-center">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedData.length > 0 ? (
                                displayedData.map((user) => (
                                    <tr key={user.UUID_MS_USER} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border-b text-gray-800 text-center">{user.NAMA_LENGKAP}</td>
                                        <td className="px-4 py-2 border-b text-gray-800 text-center">{user.EMAIL}</td>
                                        <td className="px-4 py-2 border-b text-gray-800 text-center">{user.NOMOR_TELP}</td>
                                        <td className="px-4 py-2 border-b text-gray-800 text-center">
                                        {Number(user.UUID_MS_JOB) === 1 ? "Anggota" : Number(user.UUID_MS_JOB) === 2 ? "Pengurus" : "Admin"}
                                        </td>
                                        <td className="px-4 py-2 border-b text-center">
                                            <div className="flex flex-col sm:flex-row justify-center">
                                                <button
                                                    onClick={() => { 
                                                        setSelectedUser(user.UUID_MS_USER);
                                                        setActionType('approve');
                                                        setShowModal(true);
                                                    }}
                                                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 mb-2 sm:mb-0 sm:mr-2"
                                                >
                                                    Terima
                                                </button>
                                                <button
                                                    onClick={() => { 
                                                        setSelectedUser(user.UUID_MS_USER);
                                                        setActionType('reject');
                                                        setShowModal(true);
                                                    }}
                                                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                                >
                                                    Tolak
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-4 py-2 border-b text-center text-gray-500">No users found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
            {showModal && (
                    <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto sm:mt-12 sm:mb-12">
                            <h3 className="text-lg font-semibold">Konfirmasi</h3>
                            <p>Apakah Anda yakin ingin {actionType === 'approve' ? 'menerima' : 'menolak'} pengguna ini?</p>
                            <div className="mt-4 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                                <button
                                    onClick={actionType === 'approve' ? handleApprove : handleReject}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    {actionType === 'approve' ? 'Iya, Terima' : 'Iya, Tolak'}
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    Batalkan
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            <F />
        </div>
    );
};

export default PengurusApprove;

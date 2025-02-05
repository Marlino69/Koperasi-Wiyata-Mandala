import React, { useState, useEffect } from 'react';
import axios from 'axios';
import H from "../H&F/Header";
import F from "../H&F/Footer";
import { useNavigate } from 'react-router-dom';

const BeritaMenu = () => {
    const [berita, setBerita] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [beritaToDelete, setBeritaToDelete] = useState(null);
    const navigate = useNavigate();
    const role = localStorage.getItem('UUID_MS_JOB');

    
    useEffect(() => {
        if (role === '1') {  
            navigate('/'); 
        } else {
        const fetchBerita = async () => {
            try {
                const response = await axios.get('http://localhost:5000/berita');
                console.log("Fetched berita:", response.data);
                setBerita(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBerita();
    }
    }, [role, navigate]);

    const getImageSrc = (lobBerita) => {
        if (lobBerita && lobBerita.LOB && lobBerita.LOB.startsWith("data:image/")) {
            return lobBerita.LOB;
        }
        return "http://localhost:5000/uploads/" + lobBerita;
    };
    
    const deleteBerita = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/deleteBerita/${id}`);
            setBerita(berita.filter((item) => item.UUID_BERITA !== id));
            setShowModal(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteClick = (id) => {
        setBeritaToDelete(id);
        setShowModal(true);l
    };

    const handleCancelDelete = () => {
        setShowModal(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <H />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-center bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] text-white py-2 mb-4">Berita</h1>
                <div className="mb-4">
                    <a href="/FormBuatBerita" className="bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] text-white py-2 px-4 rounded-md">Membuat berita baru</a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {berita.map((item) => {
                        return (
                            <div key={item.UUID_BERITA} className="bg-white rounded-md overflow-hidden shadow-md">
                                <div className="image-container">
                                    <img
                                        src={getImageSrc(item.lobBerita)}
                                        alt={item.JUDUL_BERITA}
                                        className="w-full h-48 object-cover cursor-pointer"
                                    />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-800">{item.JUDUL_BERITA}</h2>
                                    <p className="text-sm text-gray-600 mb-2">Written on {new Date(item.DTM_CRT).toLocaleDateString()}</p>
                                    <p className="text-gray-700">{item.ISI_BERITA.substring(0, 150)}...</p>
                                    <div className="mt-4">
                                        <a href={`/showBerita/${item.UUID_BERITA}`} className="text-yellow-500 font-semibold">Detail berita</a>
                                        <a href={`/editBerita/${item.UUID_BERITA}`} className="text-blue-600 ml-2">EDIT</a>
                                        <button onClick={() => handleDeleteClick(item.UUID_BERITA)} className="text-red-600 ml-2">DELETE</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

                {showModal && (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/3 md:w-1/4 lg:w-1/3">
            <h3 className="text-lg font-semibold">Konfirmasi Penghapusan</h3>
            <p className="mt-4">Apakah Anda yakin ingin menghapus berita ini?</p>
            <div className="flex flex-col sm:flex-row sm:justify-between mt-6">
                <button
                    onClick={() => deleteBerita(beritaToDelete)}
                    className="bg-teal-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 sm:mr-2"
                >
                    Konfirmasi
                </button>
                <button
                    onClick={handleCancelDelete}
                    className="bg-gray-400 text-white px-4 py-2 rounded sm:ml-2"
                >
                    Batal
                </button>
            </div>
        </div>
    </div>
)}
            <F />
        </>
    );
};

export default BeritaMenu;
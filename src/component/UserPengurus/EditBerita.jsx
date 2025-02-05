import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import H from "../H&F/Header";
import F from "../H&F/Footer";
import { BackButton } from '../../utils/components'

const EditBerita = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        judulBerita: '',
        penulis: '',
        kontenBerita: '',
        fotoBerita: null,
        fotoBeritaBase64: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const role = localStorage.getItem('UUID_MS_JOB');

    useEffect(() => {
        if (role === '1') {  
            navigate('/'); 
        } else{
        const fetchBerita = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/showBerita/${id}`);
                setFormData({
                    judulBerita: response.data.JUDUL_BERITA,
                    penulis: response.data.USER_UPD,
                    kontenBerita: response.data.ISI_BERITA,
                    fotoBerita: null,
                    fotoBeritaBase64: response.data.FOTO_BERITA || '',
                });
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBerita();
    }
    }, [id]);

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = (error) => reject(error);
        });
    };
    
    const handleChange = async (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            const file = files[0];
            setFormData({ ...formData, fotoBerita: file });
            const base64String = await convertToBase64(file);
            setFormData((prevData) => ({ ...prevData, fotoBeritaBase64: base64String }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleConfirmSubmit = async () => {
        const beritaData = {
            judulBerita: formData.judulBerita,
            penulis: formData.penulis,
            kontenBerita: formData.kontenBerita,
            fotoBerita: formData.fotoBeritaBase64,
        };

        try {
            const response = await axios.patch(`http://localhost:5000/updateBerita/${id}`, beritaData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            alert('Berita Updated Successfully');
            navigate('/BeritaMenu');
        } catch (error) {
            alert(`Failed to update Berita: ${error.message}`);
        }

        setShowConfirmation(false); // Close the popup after submission
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmation(true); // Show the confirmation popup
    };

    const handleCancel = () => {
        setShowConfirmation(false); // Close the popup without submitting
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <H />
            <div className="flex justify-center mt-10">
                <div className="w-full sm:w-2/3 md:w-2/3 lg:w-1/2 xl:w-2/3 px-4">
                    <h2 className="text-2xl font-semibold text-center mb-6">Edit Berita</h2>
                    <BackButton nav="/BeritaMenu"/>
                    <div className="bg-gray-200 p-6 sm:p-8 rounded-lg shadow-md">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block mb-1">Judul Berita</label>
                                <input
                                    type="text"
                                    name="judulBerita"
                                    value={formData.judulBerita}
                                    onChange={handleChange}
                                    placeholder="Judul Berita"
                                    className="w-full p-3 border rounded bg-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Penulis</label>
                                <input
                                    type="text"
                                    name="penulis"
                                    value={formData.penulis}
                                    onChange={handleChange}
                                    placeholder="Penulis"
                                    className="w-full p-3 border rounded bg-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Konten Berita</label>
                                <textarea
                                    name="kontenBerita"
                                    value={formData.kontenBerita}
                                    onChange={handleChange}
                                    placeholder="Konten Berita"
                                    className="w-full p-3 border rounded bg-white h-48"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Foto Berita</label>
                                <input
                                    type="file"
                                    name="fotoBerita"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded bg-white"
                                />
                            </div>
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="bg-teal-500 text-white w-full px-6 py-3 rounded shadow hover:bg-teal-600"
                                >
                                    Update Berita
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/3 max-w-full">
                        <h3 className="text-lg font-semibold">Konfirmasi Pengiriman</h3>
                        <p className="mt-4">Apakah Anda yakin ingin memperbarui berita ini?</p>
                        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
                            <button
                                onClick={handleConfirmSubmit}
                                className="bg-teal-500 text-white px-6 py-2 rounded w-full sm:w-auto"
                            >
                                Konfirmasi
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-400 text-white px-6 py-2 rounded w-full sm:w-auto"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <F />
        </div>
    );
};

export default EditBerita;

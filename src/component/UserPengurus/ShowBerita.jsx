import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import H from "../H&F/Header";
import F from "../H&F/Footer";

const ShowBerita = () => {
    const { id } = useParams();
    const [berita, setBerita] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const role = localStorage.getItem('UUID_MS_JOB');

    // Function to get the image source, checking if it's base64
    const getImageSrc = (lobBerita) => {
        // Check if lobBerita contains base64 image data
        if (lobBerita && lobBerita.LOB && lobBerita.LOB.startsWith("data:image/")) {
            return lobBerita.LOB; // Return the base64 image if it's valid
        }
        return "http://localhost:5000/uploads/" + lobBerita; // Fallback to default path if no base64 image
    };

    useEffect(() => {
        if (role === '1') { 
            navigate('/'); 
        } else {
            const fetchBerita = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/showBerita/${id}`);
                    console.log(response.data); // Check the structure of response
                    setBerita(response.data);
                    setLoading(false);
                } catch (err) {
                    setError(err.message);
                    setLoading(false);
                }
            };
   
            fetchBerita();
        }
    }, [id]);
   

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!berita) {
        return <div>No news found.</div>;
    }

    return (
        <>
            <H />
            <div className="container mx-auto py-8">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-8">
                        <h2 className="text-3xl font-bold text-center text-[#00AD9C] mb-4">{berita.JUDUL_BERITA}</h2>
                        <div className="flex items-center justify-center text-sm text-gray-600 mb-4">
                            Written on {new Date(berita.DTM_CRT).toLocaleDateString()} by
                        </div>
                        <div className="flex justify-center mb-4">
                            {berita.lobBerita && (
                                <img 
                                    className="rounded-md max-w-full h-auto"
                                    src={getImageSrc(berita.lobBerita)} // Use lobBerita for image
                                    alt={berita.JUDUL_BERITA} 
                                />
                            )}
                        </div>
                        <p className="text-lg text-gray-800 leading-relaxed font-bold text-center">{berita.ISI_BERITA}</p>
                    </div>
                    <div className="flex items-center justify-center bg-[#00AD9C] py-4">
                        <a className="back-button text-white hover:text-gray-200 mx-2" href="/BeritaMenu">Kembali ke menu berita</a>
                    </div>
                </div>
            </div>
            <F />
        </>
    );
};

export default ShowBerita;

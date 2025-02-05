import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import H from "../H&F/Header";
import F from "../H&F/Footer";
import {
  BackButton
} from '../../utils/components';

function FormBuatBerita() {
  const [formData, setFormData] = useState({
    judulBerita: '',
    penulis: '',
    kontenBerita: '',
    fotoBerita: null,
    fotoBeritaBase64: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem('UUID_MS_JOB');

  if (role === '1') {  
    navigate('/'); 
    return null; 
  }

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

  const handleSubmitClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    const beritaData = {
      judulBerita: formData.judulBerita,
      penulis: formData.penulis,
      kontenBerita: formData.kontenBerita,
      fotoBerita: formData.fotoBeritaBase64,
    };

    try {
      const response = await axios.post('http://localhost:5000/berita', beritaData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Berita Created:', response.data);
      alert('Berita Created Successfully');
      navigate('/BeritaMenu');
      setFormData({
        judulBerita: '',
        penulis: '',
        kontenBerita: '',
        fotoBerita: null,
        fotoBeritaBase64: '',
      });
    } catch (error) {
      console.error('Error creating berita:', error);
      alert('Failed to create Berita');
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
    }
  };

  const handleRejectSubmit = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <H />
      <div className="flex justify-center mt-10 px-4">
        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-2/5 pl-10">
          <h2 className="text-2xl font-semibold text-center mb-6">Formulir Tambah Berita</h2>
          <BackButton nav="/BeritaMenu"/>
          <div className="bg-gray-200 p-10 rounded-lg shadow-md">
            <form onSubmit={handleSubmitClick} id="form-tambah-berita" className="grid grid-cols-1 gap-6">
              <div>
                <label className="block mb-1">Judul Berita</label>
                <input
                  type="text"
                  name="judulBerita"
                  value={formData.judulBerita}
                  onChange={handleChange}
                  placeholder="Judul Berita"
                  className="w-full p-2 border rounded bg-white"
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
                  className="w-full p-2 border rounded bg-white"
                />
              </div>
              <div>
                <label className="block mb-1">Konten Berita</label>
                <textarea
                  name="kontenBerita"
                  value={formData.kontenBerita}
                  onChange={handleChange}
                  placeholder="Konten Berita"
                  className="w-full p-2 border rounded bg-white h-48"
                />
              </div>
              <div>
                <label className="block mb-1">Foto Berita</label>
                <input
                  type="file"
                  name="fotoBerita"
                  onChange={handleChange}
                  className="w-full p-2 border rounded bg-white"
                />
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  type="submit"
                  className="bg-teal-500 text-white w-full px-6 py-2 rounded shadow hover:bg-teal-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Tambah Berita'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {isModalOpen && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/3 max-w-full">
      <h3 className="text-lg font-semibold">Konfirmasi Submit</h3>
      <p className="mt-4">Apakah Anda yakin ingin mengsubmit formulir ini?</p>
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
        <button
          onClick={handleConfirmSubmit}
          className="px-6 py-2 bg-teal-500 text-white rounded w-full sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sedang Submit...' : 'Konfirmasi'}
        </button>
        <button
          onClick={handleRejectSubmit}
          className="px-6 py-2 bg-gray-500 text-white rounded w-full sm:w-auto"
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
}

export default FormBuatBerita;

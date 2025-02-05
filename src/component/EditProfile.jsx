import React, { useEffect, useState } from 'react';
import H from "./H&F/Header";
import F from "./H&F/Footer";  
import foto from './Foto/Koperasi_profile.png';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode }  from 'jwt-decode';
import axios from 'axios';


export default function Profile() {

    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [alamat, setAlamat] = useState('');
    const [lahir, setLahir] = useState('');
    const [unitKerja, setUnitKerja] = useState('');
    const [noAnggota, setNoAnggota] = useState('');
    const [expire, setExpire] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('accessToken');
      console.log(token); // Debugging untuk memastikan token terdeteksi
      if (token) {
        setIsLoggedIn(true); // Menandakan pengguna sudah login
      } else {
        setIsLoggedIn(false); // Pengguna belum login
        navigate('/'); // Redirect ke halaman login
      }
    }, [navigate]);
    

    useEffect(() => {
      refreshToken();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get("http://localhost:5000/users");
            localStorage.setItem('accessToken', response.data.accessToken);
            // setToken(response.data.accessToken);

            // Misalnya di dalam fungsi Anda
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setPhone(decoded.noTelp);
            setEmail(decoded.email);
            setAlamat(decoded.alamat);
            setLahir(decoded.tanggalLahir);
            setExpire(decoded.exp);
            setNoAnggota(decoded.noAnggota);
            setUnitKerja(decoded.unitKerja);
        } catch (error) {
            if(error.response){
                navigate("/");
            }
        }
    }

  //   const handleUpdate = async () => {
  //     try {
  //         const response = await axios.put(`http://localhost:5000/users/${id}`, {
  //             name,
  //             email,
  //             password,
  //             confPassword: confirmPassword,
  //             noTelp,
  //             alamat,
  //             role
  //         });

  //         alert(response.data.msg);

  //         // Perbarui state user setelah update berhasil
  //         setUser(prevUser => ({
  //           ...prevUser, // Mengambil nilai sebelumnya untuk menjaga data lain yang tidak berubah
  //           name,
  //           email,
  //           noTelp,
  //           alamat,
  //           role
  //         }));
  //     } catch (error) {
  //         alert(error.response?.data?.msg || "Terjadi kesalahan saat memperbarui profil.");
  //     }
  // };

    const Logout  = async () => {
      try {
        await axios.delete("http://localhost:5000/logout");
        localStorage.removeItem('accessToken');
        localStorage.removeItem('UUID_MS_JOB');
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div className="min-h-screen flex flex-col">
      <H />

      <div className="flex-grow flex bg-gray-50">
        <div className="hidden md:flex md:w-1/2 h-full items-center justify-center">
          <img 
            src={foto} 
            className="w-[600px] h-[850px] object-cover rounded-lg shadow-lg mt-16" 
            alt="Koperasi Logo" 
          />
        </div>
        <div className="flex-grow md:w-1/2 p-8 md:p-16 flex items-center justify-center bg-white">
          <div className="w-full max-w-lg p-6 rounded-lg shadow-lg bg-gray-200">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                <span className="text-gray-500 text-4xl">👤</span>
              </div>
              <h2 className="text-xl font-semibold">{name}</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-lg">👤</span>
                <div className="flex-grow bg-white rounded-lg shadow px-4 py-2">
                  <p className="text-gray-700 font-medium">Nama Lengkap</p>
                  <p>{name}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-lg">📞</span>
                <div className="flex-grow bg-white rounded-lg shadow px-4 py-2">
                  <p className="text-gray-700 font-medium">No.Telpon</p>
                  <p>{phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-lg">✉️</span>
                <div className="flex-grow bg-white rounded-lg shadow px-4 py-2">
                  <p className="text-gray-700 font-medium">Email</p>
                  <p>{email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-lg">📍</span>
                <div className="flex-grow bg-white rounded-lg shadow px-4 py-2">
                  <p className="text-gray-700 font-medium">Alamat</p>
                  <p>{alamat}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-lg">🏢</span>
                <div className="flex-grow bg-white rounded-lg shadow px-4 py-2">
                  <p className="text-gray-700 font-medium">Unit Kerja</p>
                  <p>{unitKerja}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-lg">🔢</span>
                <div className="flex-grow bg-white rounded-lg shadow px-4 py-2">
                  <p className="text-gray-700 font-medium">Nomor Anggota</p>
                  <p>{noAnggota}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-lg">📅</span>
                <div className="flex-grow bg-white rounded-lg shadow px-4 py-2">
                  <p className="text-gray-700 font-medium">Tanggal Lahir</p>
                  <p>{lahir}</p>
                </div>
              </div>
            </div>

            <div className="mt-6  text-center">
                <button className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition">
                <Link to="/edtprf">EDIT</Link>
                </button>

                <button
                onClick={Logout}
                className="bg-white text-black rounded-lg ml-[10px] px-4 py-2 mt-4 "
                >
                Logout
                </button>
            </div>
          </div>
        </div>
      </div>
      <F />
    </div>
  );
}
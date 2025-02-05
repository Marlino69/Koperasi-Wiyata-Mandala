import { Link } from "react-router-dom"
import bgkpr from "../Foto/Koperasi_Logo.png"
import hijo from '../Foto/Foto_Login/hijo.jpg';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [alamat, setAlamat] = useState('');
    const [lahir, setLahir] = useState('');
    const [password, setPassword] = useState('');
    const [unitKerja, setUnitKerja] = useState('');
    const [noAnggota, setNoAnggota] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Register = async(e) => {
        e.preventDefault();
        if (!name || !email || !phone || !password || !confirmPassword || !role || !alamat || !lahir || !unitKerja || !noAnggota) {
            setMsg("Semua field harus diisi");
            return;
        }
    
        if (password !== confirmPassword) {
            setMsg("Password dan Confirm Password tidak cocok");
            return;
        }
        try {
            await axios.post("http://localhost:5000/users", {
                name: name,
                email: email,
                password: password,
                confPassword: confirmPassword,
                noTelp: phone,
                alamat: alamat,
                tanggalLahir: lahir,
                unitKerja: unitKerja,
                noAnggota: noAnggota,
                role: role 
            });
            navigate("/login");
        } catch (error) {
                if(error.reponse){
                    setMsg(error.reponse.data);
                }
            }

    }

    return(
        <>
        <section class="bg-white dark:bg-gray-900">
            <div class="flex justify-center min-h-screen">
                <div class="hidden bg-cover lg:block lg:w-2/5" style={{ backgroundImage: `url(${hijo})` }} ></div>
                <div class="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                    <div class="w-full">
                        <h1 class="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                            Daftarkan Akun Anda.
                        </h1>

                        <p class="mt-4 text-gray-500 dark:text-gray-400">
                            Mari Buat AkunMu Sekarang.
                        </p>

                        <div class="mt-6">
                            <h1 class="text-gray-500 dark:text-gray-300">Pilih Role Anda</h1>

                            <div className="mt-3 md:flex md:items-center md:-mx-2">
                    <button 
                    value={role}
                        onClick={() => setRole('ANGGOTA')} 
                        className={`flex justify-center w-full px-6 py-3 rounded-lg md:w-auto md:mx-2 focus:outline-none ${role === 'ANGGOTA' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-blue-500'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="mx-2">Anggota</span>
                    </button>
                    <button 
                    value={role}
                        onClick={() => setRole('PENGURUS')}  
                        className={`flex justify-center w-full px-6 py-3 mt-4 rounded-lg md:mt-0 md:w-auto md:mx-2 focus:outline-none ${role === 'PENGURUS' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-blue-500'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="mx-2">Pengurus</span>
                    </button>
                    <button 
                    value={role}
                        onClick={() => setRole('ADMIN')}  
                        className={`flex justify-center w-full px-6 py-3 mt-4 rounded-lg md:mt-0 md:w-auto md:mx-2 focus:outline-none ${role === 'ADMIN' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-blue-500'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="mx-2">Admin</span>
                    </button>
                </div>
            </div>

            <form onSubmit={ Register } className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                <div class="md:col-span-2">
                    <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">First Name</label>
                    <input
                        name="name"
                        value={name} 
                        onChange={(e) => setName( e.target.value)} 
                        type="text" 
                        placeholder="Nama" 
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
                <div>
                    <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Phone number</label>
                    <input 
                    value={phone} 
                    type="text"
                    onChange={(e) => setPhone( e.target.value)} 
                    placeholder="XXX-XX-XXXX-XXX" 
                    class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
                <div>
                    <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                    <input
                        name="email"
                        value={email} 
                        onChange={(e) => setEmail( e.target.value)}  
                        type="email"
                        placeholder="johnsnow@example.com" 
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
                <div>
                    <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                    <input 
                        type="password"
                        value={password} 
                        onChange={(e) => setPassword( e.target.value)}  
                        placeholder="Enter your password" 
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
                <div>
                    <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Confirm password</label>
                    <input 
                        name="confirmPassword"
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password" 
                        placeholder="Enter your password" 
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
                <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Alamat</label>
                    <textarea
                        name="alamat"
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                        placeholder="Masukkan Alamat Anda"
                        className="block w-full h-[54px] px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>  

                <div>
                    <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Tanggal Lahir</label>
                    <input 
                        name="Lahir"
                        value={lahir}   
                        onChange={(e) => setLahir(e.target.value)}
                        type="date"
                        placeholder="Masukkan Tanggal Lahir Anda" 
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
                <div>
                    <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Unit Kerja</label>
                    <input 
                        name="Unit Kerja"
                        value={unitKerja}   
                        onChange={(e) => setUnitKerja(e.target.value)}
                        type="text"
                        placeholder="Masukkan Unit Kerja Anda" 
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
                <div>
                    <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Nomor Anggota</label>
                    <input 
                        name="Nomor Anggota"
                        value={noAnggota}   
                        onChange={(e) => setNoAnggota(e.target.value)}
                        type="text"
                        placeholder="Masukkan Nomor Anggota Anda" 
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
                    <button
                        class="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        <span>Buat Akun</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                            <path 
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd" 
                            />
                        </svg>
                    </button>
                    {msg && <p className="text-red-500 text-sm mt-2">{msg}</p>}
                </form>
            </div>
        </div>
    </div>
</section>
        </>
    )
}

export default Register
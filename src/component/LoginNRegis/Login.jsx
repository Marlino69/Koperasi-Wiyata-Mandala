import { Link, useNavigate } from 'react-router-dom';
import foto from '../Foto/Foto_Login/Koperasi_Logo 3.png';
import hijo from '../Foto/Foto_Login/hijo.jpg';
import { useState } from 'react'; 
import axios from 'axios'; // Pastikan axios terinstal\


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');

//   const getUser = async () => {
//     const response = await axios.get("http://localhost:5000/users", {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//   });
//   console.log(response.data);
// }


  const Auth = async (e) => {
    e.preventDefault();
    if (!email || !password) {
        setMsg("Semua field harus diisi");
        return;
    }
    try {
        const response = await axios.post("http://localhost:5000/login", {
            email: email,
            password: password
        });

        const { accesstoken, role } = response.data; 
        localStorage.setItem('accessToken', accesstoken);
        localStorage.setItem('UUID_MS_JOB', role);
        navigate("/");
        // if (role === '1') { 
        //     navigate("/BerandaAnggota");
        // } else if (role === '2') {
        //     navigate("/BerandaPengurus");
        // } else {
        //     setMsg("Role tidak dikenali");
        // }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        setMsg(error.response.data.msg); // "Wrong Password"
    } else if (error.response && error.response.data && error.response.data.message) {
        setMsg(error.response.data.message); // "Email not found"
    } else {
        setMsg("Terjadi kesalahan pada server");
    }
    }
};
  
  return (
    <>
      <div style={{ backgroundImage: `url(${hijo})` }} className=' sm:bg-cover h-screen'>
        <div className="font-[sans-serif] max-w-4xl flex items-center mx-auto md:h-screen p-4">
          <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
            <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] lg:px-8 px-4 py-4">
              <img src={foto} alt="logo" className="md:col-span-2 col-span-3 md:mx-auto w-[900px]" />
            </div>
            <form onSubmit={Auth} className="md:col-span-2 w-full py-6 px-6 sm:px-16 bg-white">
              <div className="mb-6">
                <h3 className="text-gray-800 text-2xl font-bold">Login</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
                  <input 
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email" required className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter email" />
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Password</label>
                  <input 
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password" required className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter password" />
                </div>

                <div className="!mt-[28px] mb-[10px]">
                  <button 
                  // onSubmit={getUser}
                   type="submit" className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none">
                    Submit
                  </button>
                  {msg && <p className="text-red-500 text-sm mt-2">{msg}</p>}
                </div>
                <Link to="/register" className="text-gray-800 text-sm mt-6 text-center">Belum punya akun? <span className="text-blue-600 font-semibold hover:underline ml-1">Daftar disini</span></Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

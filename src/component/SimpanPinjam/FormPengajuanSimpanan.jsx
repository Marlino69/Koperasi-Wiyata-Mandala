import React, { 
  useEffect, 
  useState 
} from 'react';
import H from "../H&F/Header";
import F from "../H&F/Footer";
import foto from '../Foto/Koperasi_Logo.png';
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { 
  formatRupiah,
  deformatRupiah,
  getCurrentLoggedInData,
  isBetween,
 } from "../../utils/utils"
import axios from "axios";

function FormPengajuanSimpanan() {
 const navigate = useNavigate(); // Create navigate function for navigation
 const userData = getCurrentLoggedInData();
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
 const [formData, setFormData] = useState({
  maksimalSimpanan: '0',
  minimalSimpanan: '0',
  nominalSimpanan: '0',
  typeSimpanan: '',
  setuju: false,
  typeSimpananID: '',
 });

 const [typeSimpanan, setTypeSimpanan] = useState([]);
 useEffect(() => {
  const fetchTypeSimpanan = async () => {
      try {
          const response = await axios.post('http://localhost:5000/getType/SIMPANAN', {
            "IS_MANDATORY": "0"
          }); // Update with your actual endpoint
          setTypeSimpanan(response.data);
      } catch (error) {
          console.error('Error fetching type simpanan:', error);
      }
  };

  fetchTypeSimpanan();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const handlers = {
      nominalSimpanan: () => {
        const numericValue = value.replace(/\D/g, ''); // Only accepts digit 0-9 inputs
        return formatRupiah(numericValue);
      },
      checkbox: () => checked,
      default: () => value,
    };

    const formattedValue = handlers[name] ? handlers[name]() : (type === 'checkbox' ? checked : value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = typeSimpanan.find(item => item.TYPE_NAME === selectedValue);
    setFormData((prevData) => ({
      ...prevData,
      typeSimpanan: selectedValue, // Update formData with selected type
      minimalSimpanan: selectedOption && selectedOption.MINIMUM_SIMPANAN ? formatRupiah(selectedOption.MINIMUM_SIMPANAN) : '0',
      maksimalSimpanan: selectedOption && selectedOption.MAXIMUM_SIMPANAN ? formatRupiah(selectedOption.MAXIMUM_SIMPANAN) : '0',
      typeSimpananID: selectedOption ? selectedOption.UUID_TYPE_SIMPANAN : '',
      autoApprove: selectedOption ? selectedOption.IS_AUTO_APPROVE : '',
    }))
  };

  const [invalidFields, setInvalidFields] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const invalidFields = isSubmitable();
    if (Object.keys(invalidFields).length > 0) {
      setInvalidFields(invalidFields);  // Set invalid fields state to highlight them
      return;  // Stop form submission if validation fails
    }
  
    const dataSubmit = 
    {
      "UUID_MS_USER": userData?.UUID_MS_USER,
      "UUID_MS_STATUS_SIMPANAN": 1,
      "UUID_MS_TYPE_SIMPANAN": formData.typeSimpananID,
      "USR_CRT": userData?.EMAIL,
      "NOMINAL": deformatRupiah(formData.nominalSimpanan)
    }
    try {
      const response = await axios.post('http://localhost:5000/createPengajuan/SIMPANAN', dataSubmit);
      if (formData.autoApprove == "1") {
        await axios.patch("http://localhost:5000/updateStatusPengajuan", {
          "PENGAJUAN": "SIMPANAN",
          "id": response.data.UUID_PENGAJUAN_SIMPANAN,
          "status": "APPROVED"
        });
      }
      console.log('Form Submitted:', dataSubmit);
      navigate(`/ProsesPengajuan/SIMPANAN/${response.data.UUID_PENGAJUAN_SIMPANAN}`);
    } catch (error) {
      console.log('Error submitting form:', error);
      alert(error.response ? error.response.data.message : 'An unexpected error occurred.');
    }
 };

 const isSubmitable = () => {
  const invalidFields = {};
  const checkNominal = !isBetween(
      parseInt(deformatRupiah(formData.nominalSimpanan)),
      parseInt(deformatRupiah(formData.minimalSimpanan)),
      parseInt(deformatRupiah(formData.maksimalSimpanan))
    )
  if (formData.typeSimpanan === '') invalidFields.typeSimpanan = true;
  if ((formData.nominalSimpanan.trim() === '0') || checkNominal) invalidFields.nominalSimpanan = true;
  if (formData.setuju === false) invalidFields.setuju = true;

  return invalidFields; // Return the invalid fields
  };

 return (
  <>
  <div className='min-h-screen flex flex-col'>
  <H />
  <div className="flex justify-center space-x-8 mt-10 my-4 container mx-auto p-4 flex-grow">
    <div className="w-2/3">
    <h2 className="text-2xl font-semibold text-center mb-6">Formulir Pengajuan Simpanan</h2>

    <div className="bg-gray-200 p-10 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} id="form-pengajuan" className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Vertical group for Nama Lengkap, Nomor Telepon, and Nomor Anggota */}
      <div className="grid grid-cols-1 gap-6">
        <div>
        <label className="block mb-1 font-medium">Nama Lengkap</label>
        <input
          type="text"
          name="namaLengkap"
          value={userData?.NAMA_LENGKAP}
          onChange={handleChange}
          placeholder="Nama Lengkap"
          className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
          maxLength={70}
          readOnly
          required
        />
        </div>
        <div>
        <label className="block mb-1 font-medium">Nomor Telepon</label>
        <input
          type="text"
          name="nomorTelepon"
          value={userData?.NOMOR_TELP}
          onChange={handleChange}
          placeholder="Nomor Telepon"
          className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
          maxLength={15}
          readOnly
          required
        />
        </div>
      </div>

      {/* Address in a separate vertical column with combined height */}
      <div>
        <label className="block mb-1 font-medium">Alamat</label>
        <textarea
        name="alamat"
        value={userData?.ALAMAT}
        onChange={handleChange}
        placeholder="Alamat tidak ditemukan."
        className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
        style={{height:"140px"}}
        readOnly
        required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Unit Kerja</label>
        <input
          type="text"
          name="unitKerja"
          value={userData?.UNIT_KERJA}
          onChange={handleChange}
          placeholder="Unit kerja tidak ditemukan."
          className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
          readOnly
          required
        />
        </div>

        <div>
        <label className="block mb-1 font-medium">Nomor Anggota</label>
        <input
          type="text"
          name="nomorAnggota"
          value={userData?.NOMOR_ANGGOTA}
          onChange={handleChange}
          placeholder="Nomor anggota tidak ditemukan"
          className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
          readOnly
          required
        />
        </div>
        
      <div className='flex flex-col justify-end'>
        <label className="block mb-1 font-medium">Tipe Simpanan 
          {invalidFields.typeSimpanan && (<p className='text-red-500 text-sm'>Mohon pilih tipe simpanan.</p>)}
        </label>
        <select
        name="typeSimpanan"
        value={formData.typeSimpanan}
        onChange={handleSelectChange}
        className={`w-full p-2 border rounded bg-white focus:outline-none focus:ring focus:ring-blue-300 shadow-md ${invalidFields.typeSimpanan ? 'bg-red-100' : ''}`}
        required
        >
        <option value="">Pilih Tipe Simpanan</option>

          {typeSimpanan.map((item) => (
            <option key={item.UUID_TYPE_SIMPANAN} value={item.TYPE_NAME}>
              {item.TYPE_NAME}
            </option>
          ))}

        </select>
      </div>
      <div className='flex flex-col justify-end'>
        <label className="block mb-1 font-medium">Nominal Uang <br /> {formData.maksimalSimpanan != 0 && (<span className='font-normal'>(minimal: Rp {formData.minimalSimpanan}, 
          maksimal: Rp {formData.maksimalSimpanan})</span>)}
          {invalidFields.nominalSimpanan && (<p className='text-red-500 text-sm'>Mohon isi nominal dengan benar.</p>)}
        </label>
        <div className='flex items-center'>
        <input
        type="text"
        name="nominalSimpanan"
        value={formData.nominalSimpanan}
        onChange={handleChange}
        placeholder="Nominal Uang Simpanan"
        className={`w-full p-2 border rounded bg-white focus:outline-none focus:ring focus:ring-blue-300 shadow-md ${invalidFields.nominalSimpanan ? 'bg-red-100' : ''}`}
        required
        />
        </div>
      </div>
      </form>
    </div>
    </div>

    <div className=" flex flex-col space-y-6">
      <div className="justify-start mt-10">
        <label className={`flex items-center space-x-2 ${invalidFields.setuju ? 'bg-red-200 p-2 rounded-sm  ' : ''}`}>
        <input
          type="checkbox"
          name="setuju"
          checked={formData.setuju}
          onChange={handleChange}
          className={`form-checkbox`}
          required
        />
        <span className="text-sm">Saya sudah baca dan setuju atas ketentuan dan syarat yang sudah ditentukan.</span>
        </label>
      </div>

      <div className="mt-6">
        <button
        type="button"
        onClick={handleSubmit} // Call handleSubmit to submit form
        className="bg-blue-500 text-white w-full px-6 py-2 rounded shadow hover:bg-blue-600 transition duration-200"
        >
        Ajukan
        </button>
        <button
        type="button"
        onClick={() => navigate('/HalamanAwalSimpanPinjam')} // Navigate back to SimpanPinjam
        className="bg-gray-300 text-black w-full px-6 py-2 rounded shadow hover:bg-gray-400 transition duration-200 mt-2"
        >
        Kembali
        </button>
      </div>

      <div className="border p-4 rounded-lg text-center text-gray-700 bg-gray-100">
        <strong>PERHATIAN</strong>
        <p>Mohon mengisi formulir pengajuan dengan baik dan tepat.</p>
        <p>Jika ada kesulitan, mohon baca syarat & ketentuan</p>
        <p>Untuk melaporkan kesalahan mohon kontak : 0812299378</p>
      </div>
    </div>
  </div>

  <F />
  </div>
</>
);
}

export default FormPengajuanSimpanan;

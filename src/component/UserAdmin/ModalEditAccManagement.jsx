import { useState, useEffect } from "react";
import axios from "axios";
import { EyeSlashIcon, EyeIcon, InformationCircleIcon } from "@heroicons/react/24/solid";

function ModalEditAccManagement({ setIsEditModalOpened, setSelectedUser, selectedUser, isEditModalOpened }) {
  const [name, setName] = useState("");
  const [alamat, setAlamat] = useState("");
  const [tglLahir, setTglLahir] = useState("");
  const [email, setEmail] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [uuidJob, setUuidJob] = useState("");
  const [jobCode, setJobCode] = useState("");
  const [tglRegis, setTglRegis] = useState("");
  const [isActive, setIsActive] = useState("");
  const [jobData, setJobData] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordUpdated, setIsPasswordUpdated] = useState("");
  const [showPasswordValue, setshowPasswordValue] = useState(false);
  const [showConfirmPasswordValue, setshowConfirmPasswordValue] = useState(false);
  const [formError, setFormError] = useState({});


  useEffect(() => {
    setName(selectedUser.NAMA_LENGKAP);
    setAlamat(selectedUser.ALAMAT);
    const formattedDate = new Date(selectedUser.TANGGAL_LAHIR).toISOString().slice(0, 16);
    setTglLahir(formattedDate);
    setEmail(selectedUser.EMAIL);
    setNoTelp(selectedUser.NOMOR_TELP);
    setUuidJob(selectedUser.UUID_MS_JOB);
    setJobCode(selectedUser.MS_JOB.JOB_CODE);
    setTglRegis(selectedUser.createdAt);
    setIsActive(selectedUser.IS_ACTIVE);

    initJobSelect();
  }, [selectedUser]);

  useEffect(()=> {
    if(password.length <= 0){
      setIsPasswordUpdated(false);
    }
  },[password]);

  const closeModal = () => {
    setIsEditModalOpened(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    if (isEditModalOpened) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isEditModalOpened]);

  const initJobSelect = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getdistinctjobcode");
      setJobData(response.data);
      console.log("job data", jobData);
    } catch (e) {
      console.log(e);
    }
  };

  const validateForm = async (data) => {
    const errors = {};
    const validationRules = {
      NAMA_LENGKAP: (value) => value && value.trim() !== "",
      ALAMAT: (value) => value && value.trim() !== "",
      TANGGAL_LAHIR: (value) => !isNaN(new Date(value).getTime()) && new Date() >= new Date(value) ,
      EMAIL: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      NOMOR_TELP: (value) => /^(08[1-9][0-9]{6,10}|0[2-9][0-9]{7,9})$/.test(value),
      CONFIRM_PASSWORD: (value) => value === password,
      PASSWORD: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value),
    };

    for(const key in data){
      if(validationRules[key]){
        const isValid = validationRules[key](data[key]);
        if(!isValid){
          errors[key] = true;
        }
      }
    }

    if(Object.keys(errors).length > 0){
      setFormError(errors);
      return true;
    }

    return false;
  };

  const saveHandler = async () => {
    let reqbody = {
      NAMA_LENGKAP: name,
      ALAMAT: alamat,
      TANGGAL_LAHIR: tglLahir,
      EMAIL: email,
      NOMOR_TELP: noTelp,
      UUID_JOB: uuidJob,
      IS_ACTIVE: isActive ? 1 : 0
    };

    if(isPasswordUpdated){
      reqbody = {
        ...reqbody,
        PASSWORD: password,
      }
    }

    const dataToBeValidated = {
      ...reqbody,
      CONFIRM_PASSWORD: confirmPassword,
    };

    const isError = await validateForm(dataToBeValidated);
    if(isError){
      return;
    }
    const filteredReqBody = Object.fromEntries(
      Object.entries(reqbody).filter(([key, value]) => value !== "" && value !== null)
    );
    console.log(filteredReqBody);
    try {
      await axios.put(`http://localhost:5000/updateuseradm/${selectedUser.UUID_MS_USER}`, filteredReqBody);
    } catch (e) {
      console.log(e);
    }
    setIsEditModalOpened(false);
    setSelectedUser(null);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg overflow-y-auto">
        <h4 className="font-semibold text-2xl text-center text-teal-600">Update Data Akun</h4>
        <form className="my-6 space-y-5">
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Nama</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-teal-500"
              placeholder="Enter full name"
            />
            {formError.NAMA_LENGKAP && <span className="text-red-500 text-xs">Nama lengkap tidak boleh kosong.</span>}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">No. Telepon</label>
            <input
              id="phone"
              value={noTelp}
              onChange={(e) => setNoTelp(e.target.value)}
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-teal-500"
              placeholder="Enter phone number"
            />
            {formError.NOMOR_TELP && <span className="text-red-500 text-xs">Nomor telepon tidak valid (awali dengan 08).</span>}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-teal-500"
              placeholder="Enter email address"
            />
            {formError.EMAIL && <span className="text-red-500 text-xs">Email tidak valid.</span>}
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <div className="flex items-center">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">New Password</label>
              <InformationCircleIcon 
                className="w-4 h-4 text-gray-700 ml-1"
                title="Password harus memiliki minimal 8 karakter, mengandung setidaknya satu huruf besar, satu huruf kecil, satu angka, dan satu karakter khusus (@$!%*?&)." 
              />
            </div>
            <div className="flex flex-1">
              <input
                id="password"
                type={showPasswordValue ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setIsPasswordUpdated(true)
                }}
                className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-teal-500 flex-grow"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setshowPasswordValue(!showPasswordValue)}
                className="ml-2 text-gray-500"
              >
                {showPasswordValue ? (
                  <EyeSlashIcon className="w-6 h-6" />
                ) : (
                  <EyeIcon className="w-6 h-6" />
                )}
              </button>
            </div>
            {isPasswordUpdated && formError.PASSWORD && (
              <span className="text-red-500 text-xs">Password harus memenuhi syarat.</span>
            )}
          </div>

          {/* Confirm Password */}
          {isPasswordUpdated && (
            <div className="mt-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="flex flex-1">
                <input
                  id="confirmPassword"
                  type={showConfirmPasswordValue ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-teal-500 flex-grow"
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  onClick={() => setshowConfirmPasswordValue(!showConfirmPasswordValue)}
                  className="ml-2 text-gray-500"
                >
                  {showConfirmPasswordValue ? (
                    <EyeSlashIcon className="w-6 h-6" />
                  ) : (
                    <EyeIcon className="w-6 h-6" />
                  )}
                </button>
              </div>
              {formError.CONFIRM_PASSWORD && (
                <span className="text-red-500 text-xs">Konfirmasi password tidak cocok.</span>
              )}
            </div>
          )}

          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="address" className="text-sm font-medium text-gray-700">Alamat</label>
            <textarea
              id="address"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-teal-500"
              placeholder="Enter address"
            />
            {formError.ALAMAT && <span className="text-red-500 text-xs">Alamat tidak boleh kosong.</span>}
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <label htmlFor="role" className="text-sm font-medium text-gray-700">Role</label>
            <select
              id="role"
              value={uuidJob}
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-teal-500"
              onChange={(e) => setUuidJob(e.target.value)}
            >
              {jobData.map((job) => (
                <option key={job.uuidJob} value={job.uuidJob}>
                  {job.JOB_CODE}
                </option>
              ))}
            </select>
            {formError.UUID_JOB && <span className="text-red-500 text-xs">Role harus dipilih.</span>}
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label htmlFor="dob" className="text-sm font-medium text-gray-700">Tanggal Lahir</label>
            <input
              id="dob"
              type="datetime-local"
              value={tglLahir}
              onChange={(e) => setTglLahir(e.target.value)}
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-teal-500"
            />
            {formError.TANGGAL_LAHIR && <span className="text-red-500 text-xs">Tanggal lahir tidak valid.</span>}
          </div>

          <div className="flex items-center pt-1">
            <input
              id="active-checkbox"
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="mx-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="active-checkbox" className=" text-md">          
              User Aktif
            </label>
          </div>

          <div className="w-full bg-gray-200 h-px my-5" />
        </form>

        {/* Modal Buttons */}
        <div className="flex justify-end gap-4">
          <button
            className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-400 transition-all duration-300"
            onClick={saveHandler}
          >
            Save
          </button>
          <button
            className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-500 transition-all duration-300"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalEditAccManagement;
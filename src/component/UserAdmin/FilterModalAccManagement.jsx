import { useState, useEffect } from "react";
import axios from "axios";
function FilterModalAccManagement({ setAdvancedFilterData, setIsFilterOpened, advancedFilterData }){

  const [isActive, setIsActive] = useState('');
  const [jobCode, setJobCode] = useState('');
  const [startTglLahir, setStartTglLahir] = useState('');
  const [endTglLahir, setEndTglLahir] = useState('');
  const [startTglRegis, setStartTglRegis] = useState('');
  const [endTglRegis, setEndTglRegis] = useState('');
  const [selectJobData, setSelectJobData] = useState([]);

  useEffect(() => {
    setJobCode(advancedFilterData.JOB_CODE || '');
    setIsActive(advancedFilterData.IS_ACTIVE || '');
    setStartTglLahir(advancedFilterData.TGL_LAHIR?.startTglLahir || '');
    setEndTglLahir(advancedFilterData.TGL_LAHIR?.endTglLahir || '');
    setStartTglRegis(advancedFilterData.createdAt?.startTglRegis || '');
    setEndTglRegis(advancedFilterData.createdAt?.endTglRegis || '');
    
    initJobSelect();
  },[])
  
  const initJobSelect = async () => {
    try{
      const response = await axios.get('http://localhost:5000/getdistinctjobcode');
      setSelectJobData(response.data);
      console.log("job data", selectJobData)
    }catch(e){
      console.log(e);
    }
  }

  const closeModal = () => {
    setIsFilterOpened(false);
    setAdvancedFilterData({});
  };

  const saveFilterHandler = () => {

    if(startTglLahir && endTglLahir){
      if(startTglLahir > endTglLahir){
        alert("Tanggal lahir tidak valid");
        return;
      }
    }
    if(startTglRegis && endTglRegis){
      if(startTglRegis > endTglRegis){
        alert("Tanggal registrasi tidak valid");
        return;
      }
    }
    
    setAdvancedFilterData({
      IS_ACTIVE: isActive,
      JOB_CODE: jobCode,
      TGL_LAHIR: {
        startTglLahir: startTglLahir,
        endTglLahir: endTglLahir
      },
      createdAt: {
        startTglRegis: startTglRegis,
        endTglRegis: endTglRegis
      }
    });

    setIsFilterOpened(false);
  }
  return(
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[600px] space-y-6">
        <h4 className="font-bold text-2xl text-center">Advanced Search</h4>

        <form>
          {/* Filter Is Active */}
          <div className="space-y-4">
            <div className="flex flex-1 w-full space-x-6">
              <div className="w-full flex flex-col">
                <h5 className="text-lg font-semibold">User Aktif</h5>
                <select
                  value={isActive}
                  className="border border-gray-300 py-2 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  onChange={(e) => setIsActive(e.target.value)}
                >
                  <option value="">Semua</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filter Job */}
          <div className="space-y-4">
            <div className="w-full flex flex-col">
              <h5 className="text-lg font-semibold mt-3">Role Anggota</h5>
              <select
                value={jobCode}
                className="border border-gray-300 py-2 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                onChange={(e) => setJobCode(e.target.value)}
              >
                <option value="">All</option>
                {selectJobData.map((jobData) => (
                  <option key={jobData.JOB_CODE} value={jobData.JOB_CODE}>
                    {jobData.JOB_CODE}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Tanggal Lahir*/}
          <div className="space-y-1">
            <h5 className="text-lg font-semibold mt-5">Tanggal Lahir</h5>
            <div className="flex space-x-6 border p-5 rounded-md">
              <div className="w-full">
              <label className="text-sm font-medium mb-1">Dari Tanggal</label>
                <input
                  type="date"
                  className="border border-gray-300 py-2 rounded-md w-full px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  name="DARI_TANGGAL"
                  value={startTglLahir}
                  onChange={(e)=>{setStartTglLahir(e.target.value)}}
                />
              </div>
              <div className="w-full">
                <label className="text-sm font-medium mb-1">Sampai Tanggal</label>
                <input
                  type="date"
                  className="border border-gray-300 py-2 rounded-md w-full px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  name="SAMPAI_TANGGAL"
                  value={endTglLahir}
                  onChange={(e)=>{setEndTglLahir(e.target.value)}}
                />
              </div>
            </div>
          </div>

          {/* Filter Tanggal Daftar */}
          <div className="space-y-1">
            <h5 className="text-lg font-semibold mt-5">Tanggal Pendaftaran Akun</h5>
            <div className="flex space-x-6 border p-5 rounded-md">
              <div className="w-full">
              <label className="text-sm font-medium mb-1">Dari Tanggal</label>
                <input
                  type="date"
                  className="border border-gray-300 py-2 rounded-md w-full px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  name="DARI_TANGGAL"
                  value={startTglRegis}
                  onChange={(e)=>{setStartTglRegis(e.target.value)}}
                />
              </div>
              <div className="w-full">
                <label className="text-sm font-medium mb-1">Sampai Tanggal</label>
                <input
                  type="date"
                  className="border border-gray-300 py-2 rounded-md w-full px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  name="SAMPAI_TANGGAL"
                  value={endTglRegis}
                  onChange={(e)=>{setEndTglRegis(e.target.value)}}
                />
              </div>
            </div>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            className="bg-teal-500 text-white rounded-full py-2 px-6 hover:bg-teal-400 transition-all duration-300"
            onClick={saveFilterHandler}
          >
            Add Filter
          </button>
          <button
            className="bg-red-700 text-white rounded-full py-2 px-6 hover:bg-red-600 transition-all duration-300"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

)}

export default FilterModalAccManagement;
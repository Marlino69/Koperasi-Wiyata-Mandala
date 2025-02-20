import { useState, useEffect } from "react";

function ModalFilterGenset({ setAdvancedFilterData, setIsFilterOpened, advancedFilterData }){

  const [isActive, setIsActive] = useState('');
  const [dataType, setDataType] = useState('');

  useEffect(() => {
    setDataType(advancedFilterData.DATA_TYPE);
    setIsActive(advancedFilterData.IS_ACTIVE);
  },[])

  const closeModal = () => {
    setIsFilterOpened(false);
    setAdvancedFilterData({});
  };

  const saveFilterHandler = () => {
    setAdvancedFilterData({
      IS_ACTIVE: isActive,
      DATA_TYPE: dataType
    });

    setIsFilterOpened(false);
  }
  return(
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
        <h4 className="font-bold text-xl text-center">Advanced Search</h4>
        <form className="my-4">
          <div className='flex flex-1 w-full space-x-6'>
            <div className='w-full flex flex-col'>
              <label className='mx-2'>Setting Aktif</label>
                <select
                value={isActive} 
                className="border border-gray-200 py-2 rounded-md px-3"
                onChange={(e) => setIsActive(e.target.value)}>
                  <option value="">Semua</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
            </div>

            <div className='w-full flex flex-col'>
              <label className='mx-2'>Jenis Data</label>
              <select 
              value={dataType} 
              className="border border-gray-200 py-2 rounded-md px-3"
              onChange={(e) => setDataType(e.target.value)}>
                  <option value="">All</option>
                  <option value="BIG INTEGER">Big Integer</option>
                  <option value="INTEGER">Integer</option>
                  <option value="STRING">String</option>
                </select>
            </div>
          </div>

          <div className='w-full bg-gray-100 h-[3px] my-5' />

        </form>
        <div className='flex flex-1 justify-end mt-8'>
          <button
            className="bg-teal-500 text-white rounded-full py-2 mx-1 w-[130px] hover:bg-teal-400 transition-all duration-300"
            onClick={saveFilterHandler}
          >
            Add Filter
          </button>
          <button
            className="bg-red-700 text-white rounded-full px-6 py-2 mx-1 w-[100px] hover:bg-red-600 transition-all duration-300"
            onClick={closeModal}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
)}

export default ModalFilterGenset;
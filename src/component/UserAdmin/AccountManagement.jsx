import H from "../H&F/Header";
import F from "../H&F/Footer";
import Sidebar from "./SideBar";
import axios from 'axios';
import ModalEditAccManagement from "./ModalEditAccManagement";
import FilterModalAccManagement from "./FilterModalAccManagement";
import { formatDate } from "../../utils/utils";
import { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  PencilSquareIcon,
  XMarkIcon
} from "@heroicons/react/24/solid";

const AccountManagement = () => {

  const [datas, setData] = useState([]);
  const [searchBy, setSearchBy] = useState('NAMA_LENGKAP');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  const [isEditModalOpened, setIsEditModalOpened] = useState(false);
  const [advancedFilterData, setAdvancedFilterData] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isInit, setIsInit] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (Object.keys(advancedFilterData).length > 0) {
      setPage(1); 
      handleSearch(1); 
    }else{
      setPage(1); 
      initUserList(1);
    }
  }, [advancedFilterData, selectedUser]);

  useEffect(() => {
    if (searchQuery.trim() || Object.keys(advancedFilterData).length > 0) {
        handleSearch(page);
    } else {
        initUserList(page);
    }
  }, [page]);
  
  useEffect(() => {
    const event = {
      target: document.querySelector('#searchTable'), // the scrollable div
      scrollTop: 0,
      scrollHeight: 1,
      clientHeight: 1
    };
    
    handleScroll(event);
  }, []);

  const initUserList = async (pageNumber) => {
    setIsLoading(true);
    if(pageNumber===1){
      setData([]);
      setIsInit(false);
    }
    try{
      const limit = 10;
      const offset = (pageNumber-1) * limit;

      const response = await axios.get('http://localhost:5000/getallusers',{
        params:{
          limit,
          offset
        }
      });
      console.log("current page:", pageNumber);
      if(pageNumber+1 > response.data.totalPages ){
        setHasMore(false);
      }else{
        setHasMore(true);
      }
      setData((prevData) => pageNumber === 1 ? response.data.body : [...prevData, ...response.data.body]);
    } catch(e){
      console.log(e)
    }finally{
      setIsLoading(false);
    }
  };

  const handleSearch = async (pageNumber) => {
    try{
      if(pageNumber===1){
        setData([]);
        setIsInit(false);
      }
      console.log("page:",pageNumber);
      setIsLoading(true);
      const reqBody = {};
      const limit = 10;
      
      if (searchBy) {
        reqBody.searchByValue = searchBy;
      }
      if (searchQuery) {
        reqBody.searchQueryValue = searchQuery;
      }
      if (Object.keys(advancedFilterData).length > 0) {
        reqBody.advancedFilters = advancedFilterData;
      }
      reqBody.limit=limit;
      reqBody.offset=(pageNumber-1)*limit;
      const response = await axios.post('http://localhost:5000/getuserfiltered', reqBody);
      console.log("current page:", pageNumber, "total pages:", response.data.totalPages);
      console.log("getOneUserData:",response.data.body);
      if(pageNumber+1 > response.data.totalPages ){
        setHasMore(false);
        console.log("finish loading");
      }else{
        console.log("more to come");
        setHasMore(true);
      }
      setData((prevData) => pageNumber === 1 ? response.data.body : [...prevData, ...response.data.body]);
    }catch(e){
      console.log(e);
    }finally{
      setIsLoading(false);
    }
  };

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };
  
  const handleScroll = debounce((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop === clientHeight && !isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, 300);

  return (
    <div className="bg-[#F1F1F1]">
      <H />
      <div className="flex flex-grow">
        <Sidebar />
        {/* MAIN CONTENT */}
        <div className="flex flex-col w-full mx-[50px] h-screen">
          {/* SEARCH BUTTONS */}
          <div className="relative">
            <div className="rounded-md flex items-center justify-between pt-5 pb-3">
              <div className="flex items-center">
                <select
                  name="searchBy"
                  value={searchBy}
                  className="bg-[rgb(255,255,255)] shadow-[1px_3px_1px_rgba(0,0,0,0.1)] p-2 rounded-md h-[40px] text-[18px]"
                  onChange={(e) => setSearchBy(e.target.value)}
                >
                  <option value="NAMA_LENGKAP">Nama</option>
                  <option value="EMAIL">Email</option>
                  <option value="NO_TELP">No. Telp</option>
                  <option value="ALAMAT">Alamat</option>
                </select>
                <div className="shadow-[1px_3px_1px_rgba(0,0,0,0.1)] bg-white rounded-lg p-[5px] h-full mx-4">
                  <input
                    type="text"
                    name="search"
                    value={searchQuery}
                    placeholder=""
                    className="p-[10px] rounded-lg bg-gray-100 h-[29px]"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button 
                  className="bg-[#74ccc3] shadow-[1px_3px_1px_rgba(0,0,0,0.1)] text-white rounded p-2 w-[40px] h-[39px]"
                  onClick={()=>{
                    handleSearch(1);
                    setIsInit(true);
                    setPage(1);
                  }}
                >
                  <MagnifyingGlassIcon className="w-full h-full" />
                </button>
              </div>
              <div className="flex items-center">
                <button 
                className="bg-gray-700 text-white px-4 py-2 rounded-md ml-4 w-[100px] h-[40px] flex items-center"
                onClick={() => setIsFilterOpened(true)}>
                  Filter
                  <AdjustmentsHorizontalIcon className="ml-1 h-full" />
                </button>
                <button 
                className=" bg-red-500 p-2 rounded-md ml-1 w-[40px] h-[40px] flex items-center"
                title="Hapus Filter"
                onClick={(e) => setAdvancedFilterData({})}>
                  <XMarkIcon className=" h-full" />
                </button>
              </div>
            </div>
            {/* {LIST FILTER} */}
            <div className = "flex item-center justify-between">
              <span className="rounded-tl-lg bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] flex px-2 pt-2 pb-2 item-center text-[#ffffff] font-bold">Active Filters:</span>
              <div className="rounded-tr-lg py-2 flex items-center justify-center flex-1 bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] space-x-5">
                {Object.keys(advancedFilterData).length > 0 && Object.entries(advancedFilterData)
                  .filter(([key, value]) => value !== "" && value !== undefined && value !== null)  // This ensures no empty filters are shown
                  .map(([key, value], index) => {
                    if (typeof value === "object" && value !== null) {
                      return (
                        Object.entries(value)
                          .filter(([subKey, subValue]) => subValue !== "" && subValue !== undefined && subValue !== null)
                          .map(([subKey, subValue], subIndex) => (
                            <span key={`${index}-${subIndex}`} className="bg-[#63dab6] shadow-md text-white rounded-full px-6 py-1 text-sm">
                              {subKey}: {subValue}
                            </span>
                          ))
                      );
                    }else if(value !== null && typeof value !== "object"){
                      return (
                        <span key={index} className="bg-[#63dab6] shadow-md text-white rounded-full px-6 py-1 text-sm">
                          {key}: {value}
                        </span>
                      );
                  }})}
              </div>
            </div>
        
            {/* SEARCH TABLE */}
            <div id = "searchTable" className="bg-[#FAFAFAFF] flex-1 shadow-lg overflow-y-auto max-h-[650px]"
            onScroll={handleScroll}>
              <table className="table-auto min-w-full bg-white rounded-lg shadow-md w-full">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="w-[60px] px-6 py-3 text-left font-extrabold border">No.</th>
                    <th className="px-6 py-3 text-left font-extrabold border">Nama</th>
                    <th className="px-6 py-3 text-left font-extrabold border">Alamat</th>
                    <th className="w-[200px] px-6 py-3 text-left font-extrabold border">Tgl. Lahir</th>
                    <th className="w-[220px] px-6 py-3 text-left font-extrabold border">Email</th>
                    <th className="px-6 py-3 text-left font-extrabold border">No. Telepon</th>
                    <th className="px-6 py-3 text-left font-extrabold border">Role Akun</th>
                    <th className="w-[220px] px-6 py-3 border">Tgl. Pendaftaran Akun</th>
                    <th className="w-[90px] px-6 py-3 border">Aktif</th>
                    <th className="w-[90px] px-6 py-3 border"></th>
                  </tr>
                </thead>
                <tbody className="max-h-[300px]">
                  {datas.length > 0 ? (
                    datas.map((data,index) => (
                        <tr key={data.UUID_MS_USER} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                          <td className="px-6 py-4 border">{index + 1}</td>
                          <td className="px-6 py-4 border">{data.NAMA_LENGKAP}</td>
                          <td className="px-6 py-4 border">{data.ALAMAT}</td>
                          <td className="px-6 py-4 border">{formatDate(data.TANGGAL_LAHIR)}</td> 
                          <td className="px-6 py-4 border break-words">{data.EMAIL}</td>
                          <td className="px-6 py-4 border">{data.NOMOR_TELP}</td>
                          <td className="px-6 py-4 border">{data.MS_JOB.JOB_CODE}</td>
                          <td className="px-6 py-4 border">{formatDate(data.createdAt)}</td> 
                          <td className="px-6 py-4 border">{data.IS_ACTIVE === 1 ? "Yes" : "No"}</td>
                          <td className="px-6 py-4 border text-center" >
                            <button                        
                            onClick= {() =>{
                              setIsEditModalOpened(true); 
                              setSelectedUser(data);
                            }}>
                              <PencilSquareIcon className="h-5 w-5 text-gray-600 cursor-pointer" />
                            </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                      <tr>
                        <td colSpan={10} className="px-6 py-4 border text-red-500 font-bold text-lg text-center">No User Found</td>
                      </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* LOAD MORE */}
            {isLoading && 
                <div className="flex items-center justify-center w-full bg-gray-100 p-1">
                  <p className="font-extrabold">Loading Data...</p>
                </div>
            }

            {/* FILTER MODAL BOX */}
            {isFilterOpened && (
              <FilterModalAccManagement
              setAdvancedFilterData={setAdvancedFilterData}
              advancedFilterData={advancedFilterData}
              setIsFilterOpened={setIsFilterOpened}/>
            )}
            {/* EDiT MODAL BOX */}
            {isEditModalOpened && (
              <ModalEditAccManagement
              setIsEditModalOpened={setIsEditModalOpened}
              setSelectedUser={setSelectedUser}
              selectedUser={selectedUser}
              isEditModalOpened={isEditModalOpened}
              />
            )}
          </div>
        </div>
      </div>
      <F />
    </div>
  );
};

export default AccountManagement;
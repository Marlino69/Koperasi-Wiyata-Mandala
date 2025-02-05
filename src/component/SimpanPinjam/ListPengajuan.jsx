import React, {
  useEffect,
  useState,
} from 'react';
import H from "../H&F/Header";
import F from "../H&F/Footer";
import axios from 'axios';
import { 
  deformatRupiah,
  formatDate,
  formatRupiah,
  getCurrentLoggedInData
} from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import {
  Search_icon,
  Filter_icon
} from "../../assets/icons"
import {
  BackButton
} from '../../utils/components'
import { Checkbox } from "@material-tailwind/react";
import { Input } from 'postcss';

const getProcessColor = (process) => {
  switch (process) {
    case 'ACTIVE':
      return 'bg-gray-500 text-white'; 
    case 'ABORTED':
      return 'bg-orange-500 text-white'; 
    case 'APPROVED':
      return 'bg-green-500 text-white'; 
    case 'DECLINED':
      return 'bg-red-500 text-white'; 
    default:
      return '';
  }
};

const LoanData = ({ filters, isFetchMore }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [last, setLast] = useState({
    lastId: "",
    lastColumn: ""
  })
  const navigate = useNavigate();
  const userData = getCurrentLoggedInData();

  useEffect(() => {
    if (!userData || isFetchMore) return;
    const fetchLoanData = async (filters = {}) => {
      setLoading(true);
      try {
        let UUID_MS_USER = ``;
        if (userData.MS_JOB.JOB_CODE !== 'PENGURUS') {
          UUID_MS_USER = userData.UUID_MS_USER;
        }
        const response = await axios.post(`http://localhost:5000/getFilteredPengajuan`, {
          UUID_MS_USER: UUID_MS_USER,
          orderBy: "DESC",
          sortBy: "DATE",
          ...filters, // Spread filters to the request body
        });
        const formattedData = response.data.data.map(item => ({
          id: item.UUID_PENGAJUAN,
          pengajuan: item.PENGAJUAN,
          name: item.NAMA_LENGKAP,
          nominal: 'Rp ' + formatRupiah(item.NOMINAL),
          date: formatDate(item.createdAt),
          type: item.TYPE_NAME,
          status_code: item.STATUS_CODE,
          status_name: item.STATUS_NAME,
          deskripsi: item.REASON,
        }));
        setLast({lastId: response.data.lastId, lastColumn: response.data.lastColumn})
        setData(formattedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanData(filters); // Pass the filterData here
  }, [userData, filters]);

  useEffect(() => {
    if(!userData || !isFetchMore || !last.lastId) {
      return
    };
    const fetchMoreData = async () => {
      let UUID_MS_USER = ``;
      if (userData.MS_JOB.JOB_CODE !== 'PENGURUS') {
        UUID_MS_USER = userData.UUID_MS_USER;
      }
      const response = await axios.post(`http://localhost:5000/getFilteredPengajuan`, {
        UUID_MS_USER: UUID_MS_USER,
        lastId: last.lastId,
        lastColumn: last.lastColumn,
        ...filters, // Spread filters to the request body
      });
      const formattedData = response.data.data.map(item => ({
        id: item.UUID_PENGAJUAN,
        pengajuan: item.PENGAJUAN,
        name: item.NAMA_LENGKAP,
        nominal: 'Rp ' + formatRupiah(item.NOMINAL),
        date: formatDate(item.createdAt),
        type: item.TYPE_NAME,
        status_code: item.STATUS_CODE,
        status_name: item.STATUS_NAME,
        deskripsi: item.REASON,
      }));
      setLast({lastId: response.data.lastId, lastColumn: response.data.lastColumn})
      setData((prevData) => [
        ...prevData,
        ...formattedData
      ]);
    };

    fetchMoreData();
  }, [isFetchMore])

  if (loading) {
    return <td colSpan="8" className='p-2 text-center font-bold'>Mencari data pengajuan...</td>;
  }

  if (error) {
    return <td colSpan="8" className='p-2 text-center font-bold text-red-500'>
      Error: {error}, tolong hubungi: 
      
      </td>;
  }

  return (
    <tbody>
      {data.length > 0 ? (
        data.map((loan, index) => (
          <tr 
          key={index} 
          className='bg-white hover:bg-gray-100 transition-all duration-200 cursor-pointer'
          onClick={() => navigate(`/ProsesPengajuan/${loan.pengajuan}/${loan.id}`)}
          >
          <td className="px-2 py-4 text-left">{index + 1}</td>
          <td className="px-2 py-4 text-left text-black">{loan.name}</td>
          <td className="px-2 py-4 text-left">{loan.date}</td>
          <td className="px-2 py-4 text-left">{loan.type}</td>
          <td className="px-2 py-4 text-left">{loan.nominal}</td>
          <td className="px-2 py-4 text-left truncate max-w-xs">{loan.deskripsi}</td>
          <td className="px-2 py-4 text-left">
            <span className={`inline-block px-4 py-0.5 rounded-full ${getProcessColor(loan.status_code)}`}>
              {loan.status_name}
            </span>
          </td>
        </tr>
        ))
      ) : (
        <tr>
          <td colSpan="8" className="border p-2 text-center font-bold text-red-500">
            Belum ada pengajuan
          </td>
        </tr>
      )}
    </tbody>
  );
};


const SearchFilterBar = ({ setFilters, setIsFetchMore }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [halPengajuan, setHalPengajuan] = useState("PINJAMAN")
  const [pengajuan, setPengajuan] = useState({
    TYPE: true,
    STATUS: true
  })
  const [filterData, setFilterData] = useState({
    PENGAJUAN: "PINJAMAN",
    NAMA: "",
    DARI_TANGGAL: "",
    SAMPAI_TANGGAL: "",
    TIPE: [],
    MINIMAL_NOMINAL: "0",
    MAKSIMAL_NOMINAL: "0",
    STATUS: [],
    SORT_BY: "DATE",
    ORDER_BY: "DESC"
  });

  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  }

  const [tipe, setTipe] = useState([]);
  const [status, setStatus] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "MINIMAL_NOMINAL" || name === "MAKSIMAL_NOMINAL") {
      formattedValue = formatRupiah(value.replace(/\D/g, ''));
    }

    setFilterData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };

  const handleCheckboxChange = (e, type) => {
    const { value, checked } = e.target;
    setFilterData((prevData) => {
      const updatedArray = checked
        ? [...prevData[type], value]
        : prevData[type].filter(item => item !== value);
      return { ...prevData, [type]: updatedArray };
    });
  };

  const handleButtonSearch = () => {
    handleFilterFind();
    setOpenFilter(!openFilter);
  }

  const [warning, setWarning] = useState({
    TYPE_WARNING: false,
    STATUS_WARNING: false
  })

  useEffect(() => {
    setWarning({...warning, 
      TYPE_WARNING: !pengajuan.TYPE && filterData.TIPE.length <= 0 ? true : false,
      STATUS_WARNING: !pengajuan.STATUS && filterData.STATUS.length <= 0 ? true : false});
  }, [filterData, pengajuan])

  const handleFilterCheck = () => {
    if (warning.TYPE_WARNING == false && warning.STATUS_WARNING == false) {
      handleButtonSearch();
    } 
  }

  const handleFilterFind = () => {
    const dataFilterFind = {
      "isFiltered": true,
      "PENGAJUAN": halPengajuan,
      "sortBy": filterData.SORT_BY,
      "orderBy": filterData.ORDER_BY,
      "filterAllType": pengajuan.TYPE,
      "filterAllStatus": pengajuan.STATUS,
      "filterType": filterData.TIPE,
      "filterStatus": filterData.STATUS,
      "filterName": filterData.NAMA,
      "filterFromDate": filterData.DARI_TANGGAL,
      "filterToDate": filterData.SAMPAI_TANGGAL,
      "filterMinimalNominal": filterData.MINIMAL_NOMINAL ? deformatRupiah(filterData.MINIMAL_NOMINAL) : 0,
      "filterMaksimalNominal": filterData.MAKSIMAL_NOMINAL ? deformatRupiah(filterData.MAKSIMAL_NOMINAL) : 0,
    }
    setIsFetchMore(false);
    setFilters(dataFilterFind);
  }

  useEffect(() => {
    setPengajuan({
      TYPE: true,
      STATUS: true
    })
    setFilterData({
      PENGAJUAN: halPengajuan,
      NAMA: "",
      DARI_TANGGAL: "",
      SAMPAI_TANGGAL: "",
      TIPE: [],
      MINIMAL_NOMINAL: "0",
      MAKSIMAL_NOMINAL: "0",
      STATUS: [],
      SORT_BY: "DATE",
      ORDER_BY: "DESC"
    })
    setIsFetchMore(false);
  }, [halPengajuan])

  useEffect(() => {
    handleFilterFind();
  }, [filterData.SORT_BY, filterData.ORDER_BY, filterData.PENGAJUAN]);

  useEffect(() => {
    const getDataForOptions = async () => {
      try {
        let tipe;
        let status;
        if(halPengajuan == "PINJAMAN") {
          tipe = await axios.post('http://localhost:5000/getType/PINJAMAN');
          status = await axios.post('http://localhost:5000/getStatus', {
            "PENGAJUAN": "PINJAMAN"
          });
        } else if(halPengajuan == "SIMPANAN") {
          tipe = await axios.post('http://localhost:5000/getType/SIMPANAN');
          status = await axios.post('http://localhost:5000/getStatus', {
            "PENGAJUAN": "SIMPANAN"
          });
        }
        setTipe(tipe.data);
        setStatus(status.data);
      } catch (error) {
        console.log(error);
      }
    }

    getDataForOptions();
  }, [openFilter, halPengajuan]);

  return (
    <div className="flex items-center flex-1 justify-between mb-2 mx-2">
      <div>
        <label>Tunjukkan Pengajuan: </label>
        <select
          className='pr-10 pl-2 py-1 border border-gray-200 rounded-md shadow-md'
          onChange={(e) => {setHalPengajuan(e.target.value)}}
        >
          <option value={"PINJAMAN"}>Pinjaman</option>
          <option value={"SIMPANAN"}>Simpanan</option>
        </select>

        <label className='mx-2'>
          Urutkan Berdasarkan: 
        </label>
        <select 
        className='pr-10 pl-2 py-1 border border-gray-200 rounded-md shadow-md'
        onChange={(e) => setFilterData({ ...filterData, SORT_BY: e.target.value })}
        >
          <option value={"DATE"}>Tanggal</option>
          <option value={"NOMINAL"}>Nominal Uang</option>
          <option value={"STATUS"}>Status</option>
        </select>

        <label className='mx-2'>
          Urutkan Menurut: 
        </label>
        <select 
        className='pr-10 pl-2 py-1 border border-gray-200 rounded-md shadow-md'
        onChange={(e) => setFilterData({ ...filterData, ORDER_BY: e.target.value })}
        >
          <option value={"DESC"}>Dari yang tertinggi</option>
          <option value={"ASC"}>Dari yang terendah</option>
        </select>
      </div>

      <div>
        <button
            className="py-1 bg-gray-600 text-white rounded-md pl-2 pr-6 ml-2 hover:bg-gray-500 transition-all duration-300"
            onClick={toggleFilter}
          >
            <div className='flex flex-1 space-x-4'><Filter_icon /> <span>Filter</span></div>
          </button>
          {openFilter && 
          
          (
          <div 
          className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50"
          
          >
            <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
              <h4 className="font-bold text-xl text-center">Opsi Filter Pengajuan</h4>
              <form className="my-4" onSubmit={handleButtonSearch}>

                <label className='mx-2'>Nama Pengaju</label>
                <input
                  placeholder='Masukkan Nama Pengaju'
                  className='border border-gray-200 py-2 rounded-md w-full px-3'
                  name="NAMA"
                  value={filterData.NAMA}
                  onChange={handleChange}
                  autoComplete='off'
                />

                <div className='w-full bg-gray-100 h-[3px] my-5' />

                <div className='flex flex-1 w-full space-x-6'>
                  <div className='w-full'>
                    <label className='mx-2'>Dari Tanggal</label>
                    <input
                      type="date"
                      className='border border-gray-200 py-2 rounded-md w-full px-3'
                      name="DARI_TANGGAL"
                      value={filterData.DARI_TANGGAL}
                      onChange={handleChange}
                    />
                  </div>

                  <div className='w-full'>
                    <label className='mx-2'>Sampai Tanggal</label>
                    <input
                      type="date"
                      className='border border-gray-200 py-2 rounded-md w-full px-3'
                      name="SAMPAI_TANGGAL"
                      value={filterData.SAMPAI_TANGGAL}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className='w-full bg-gray-100 h-[3px] my-5' />

                <div className='flex flex-1 w-full space-x-6'>
                  <div className='w-full flex flex-col'>
                    <label className='mx-2'>Minimal Nominal</label>
                    <input
                      type='text'
                      placeholder='Masukkan Minimal'
                      className='border border-gray-200 py-2 rounded-md w-full px-3'
                      name="MINIMAL_NOMINAL"
                      value={filterData.MINIMAL_NOMINAL}
                      onChange={handleChange}
                    />
                  </div>

                  <div className='w-full flex flex-col'>
                    <label className='mx-2'>Maksimal Nominal</label>
                    <input
                      type='text'
                      placeholder='Masukkan Maksimal'
                      className='border border-gray-200 py-2 rounded-md w-full px-3'
                      name="MAKSIMAL_NOMINAL"
                      value={filterData.MAKSIMAL_NOMINAL}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className='w-full bg-gray-100 h-[3px] my-5' />

                <div className='flex flex-1 w-full space-x-6'>
                  <div className='w-full flex flex-col'>
                    <label className='mx-2 mb-2'>Tipe</label>
                    <label className='flex items-center'>
                      <input 
                        type= 'checkbox'
                        className='mx-2'
                        checked={pengajuan.TYPE}
                        onChange={() => setPengajuan({ ...pengajuan, TYPE: !pengajuan.TYPE })}
                      />
                      Lihat Semua Tipe
                    </label>
                    {tipe.map((item) => (
                      <label className='flex items-center'>
                        <input
                          type='checkbox'
                          className='mx-2'
                          value={halPengajuan == "PINJAMAN" ? item.UUID_TYPE_PINJAMAN : item.UUID_TYPE_SIMPANAN}
                          checked={filterData.TIPE.includes(halPengajuan == "PINJAMAN" ? item.UUID_TYPE_PINJAMAN : item.UUID_TYPE_SIMPANAN)}
                          onChange={(e) => handleCheckboxChange(e, 'TIPE')}
                          disabled={pengajuan.TYPE}
                        />
                        {item.TYPE_NAME}
                      </label>
                    ))}
                    {warning.TYPE_WARNING && (
                      <label className='text-sm text-red-800 mx-2'>Pilih setidaknya satu tipe!</label>
                    )}
                  </div>

                  <div className='w-full flex flex-col'>
                    <label className='mx-2 mb-2'>Status</label>
                    <label className='flex items-center'>
                      <input 
                        type= 'checkbox'
                        className='mx-2'
                        checked={pengajuan.STATUS}
                        onChange={() => setPengajuan({ ...pengajuan, STATUS: !pengajuan.STATUS })}
                      />
                      Lihat Semua Status
                    </label>
                    {status.map((item) => (
                      <label className='flex items-center'>
                        <input
                          type='checkbox'
                          className='mx-2'
                          value={halPengajuan == "PINJAMAN" ? item.UUID_STATUS_PINJAMAN : item.UUID_STATUS_SIMPANAN}
                          checked={filterData.STATUS.includes(halPengajuan == "PINJAMAN" ? item.UUID_STATUS_PINJAMAN : item.UUID_STATUS_SIMPANAN)}
                          onChange={(e) => handleCheckboxChange(e, 'STATUS')}
                          disabled={pengajuan.STATUS}
                        />
                        {item.STATUS_NAME}
                      </label>
                    ))}
                    {warning.STATUS_WARNING && (
                      <label className='text-sm text-red-800 mx-2'>Pilih setidaknya satu status!</label>
                    )}
                  </div>
                </div>
                

              </form>
              <div className='flex flex-1 justify-end mt-8'>
                <button
                  className="bg-teal-500 text-white rounded-full px-6 py-2 mx-1 w-[100px] hover:bg-teal-400 transition-all duration-300"
                  onClick={handleFilterCheck}
                >
                  Cari
                </button>
                <button
                  className="bg-red-700 text-white rounded-full px-6 py-2 mx-1 w-[100px] hover:bg-red-600 transition-all duration-300"
                  onClick={toggleFilter}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )
        
        }
      </div>

    </div>
  );
};


const DataTable = ({ filters, isFetchMore, setIsFetchMore }) => {
  const handleScroll = (event) => {
    const container = event.target;
    if (container.scrollHeight - container.scrollTop === container.clientHeight) {
      setIsFetchMore(true)
    } else {
      setIsFetchMore(false)
    }
  };

  return (
    <div 
      className='max-h-[500px] overflow-auto'
      onScroll={handleScroll}
    >
      <table className="min-w-full bg-gray-50 rounded-xl mt-4 shadow-sm border-gray-200 text-gray-600">
        <thead className="sticky top-0 bg-gray-50 z-10">
        <tr>
          <th className="p-2 text-left font-normal" style={{ width: "2%" }}>No</th>
          <th className="p-2 text-left font-normal" style={{ width: "15%" }}>Nama Pengaju</th>
          <th className="p-2 text-left font-normal" style={{ width: "10%" }}>Tanggal Pengajuan</th>
          <th className="p-2 text-left font-normal" style={{ width: "12%" }}>Jenis Pengajuan</th>
          <th className="p-2 text-left font-normal" style={{ width: "10%" }}>Nominal Uang</th>
          <th className="p-2 text-left font-normal" style={{ width: "35%" }}>Keperluan Pengajuan</th>
          <th className="p-2 text-left font-normal" style={{ width: "6%" }}>Status</th>
        </tr>
        </thead>
        <LoanData filters={filters} isFetchMore={isFetchMore} setIsFetchMore={setIsFetchMore} />
      </table>
    </div>
      
  );
};

const ListPengajuan = () => {
  const [filters, setFilters] = useState({})
  const [isFetchMore, setIsFetchMore] = useState(false)

  const navigate = useNavigate();
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="w-full">
        <H />
      </div>

      <div className='container mx-auto my-4 p-4 flex-grow justify-center'>
        <SearchFilterBar setFilters={setFilters} setIsFetchMore={setIsFetchMore} />
        <DataTable filters={filters} setIsFetchMore={setIsFetchMore} isFetchMore={isFetchMore} />
      </div>

      <div className="w-full">
        <F />
      </div>
    </div>
  );
};

export default ListPengajuan;

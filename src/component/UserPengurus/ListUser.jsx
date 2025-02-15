import React, { useEffect, useState } from 'react';
import axios from 'axios';
import H from "../H&F/Header";
import F from "../H&F/Footer";
import { Link, useNavigate } from 'react-router-dom';
import { formatRupiah } from '../../utils/utils';

const SearchFilterBar = ({ filterCriteria, setFilterCriteria, handleSearch, handleFilter }) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-start items-center p-4 bg-gray-100 shadow-sm space-y-4 md:space-y-0">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-3/4">
        <select
          className="border p-2 rounded-md bg-white flex-grow sm:flex-grow-0 w-full sm:w-auto"
          value={filterCriteria.selectedOption}
          onChange={(e) =>
            setFilterCriteria({ ...filterCriteria, selectedOption: e.target.value })
          }
        >
          <option value="semua">Semua Data</option>
          <option value="NAMA_LENGKAP">Nama</option>
          <option value="createdAt">Waktu Bergabung</option>
        </select>

        <input
          type="text"
          placeholder="Search..."
          value={filterCriteria.searchTerm}
          onChange={(e) =>
            setFilterCriteria({ ...filterCriteria, searchTerm: e.target.value })
          }
          className="border p-2 rounded-md flex-grow w-full sm:w-1/2"
        />

        <button
          onClick={handleSearch}
          className="p-2 bg-gradient-to-b from-[#2e86c1] to-[#21618c] text-white rounded-md w-full sm:w-auto"
        >
          Search
        </button>
      </div>

      <div className="mt-4 md:mt-0 md:ml-6">
        <FilterButton handleFilter={handleFilter} />
      </div>
    </div>
  );
};

const FilterButton = ({ handleFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSort = (order) => {
    setSortOrder(order);
    handleFilter(order);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="p-2 bg-gradient-to-b from-[#2e86c1] to-[#21618c] text-white rounded-md">Filter</button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-10">
          <button onClick={() => handleSort('asc')} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Ascending</button>
          <button onClick={() => handleSort('desc')} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Descending</button>
        </div>
      )}
    </div>
  );
};

const DataTable = ({ data, onSort }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-md mt-4">
        <thead>
        <tr className="bg-gray-200">
            <th
              className="border p-2 text-center cursor-pointer"
              onClick={() => onSort("NAMA_LENGKAP")}
            >
              Nama
            </th>
            <th
              className="border p-2 text-center cursor-pointer"
              onClick={() => onSort("createdAt")}
            >
              Waktu Bergabung
            </th>
            <th
              className="border p-2 text-center cursor-pointer"
              onClick={() => onSort("TR_PENGAJUAN_PINJAMANs")}
            >
              Pinjaman
            </th>
            <th
              className="border p-2 text-center cursor-pointer"
              onClick={() => onSort("TR_PENGAJUAN_SIMPANANs")}
            >
              Simpanan
            </th>
            <th
              className="border p-2 text-center cursor-pointer"
              onClick={() => onSort("principalSavings")}
            >
              Tabungan
            </th>
            <th className="border p-2 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            const totalLoanAmount = row.TR_PENGAJUAN_PINJAMANs.reduce((acc, loan) => {
              const statusCode = loan.status?.STATUS_CODE;
              const nominalValue = parseFloat(loan.NOMINAL) || 0;
              return statusCode === 'APPROVED' ? acc + nominalValue : acc;
            }, 0);

            const totalSavingAmount = row.TR_PENGAJUAN_SIMPANANs.reduce((acc, saving) => {
              const statusCode = saving.status?.STATUS_CODE;
              const nominalValue = parseFloat(saving.NOMINAL) || 0;
              return statusCode === 'APPROVED' ? acc + nominalValue : acc;
            }, 0);

            const totalTabungan = row.TR_PENGAJUAN_SIMPANANs.reduce((acc, saving) => {
              const currentSimpanan = parseFloat(saving.historySimpanan?.[0]?.CURRENT_SIMPANAN) || 0;
              return acc + currentSimpanan;
            }, 0);
            

            const formattedTotalLoanAmount = formatRupiah(totalLoanAmount.toString());
            const formattedTotalSavingAmount = formatRupiah(totalSavingAmount.toString());
            const formattedTotalTabungan = formatRupiah(totalTabungan.toString());

            return (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                <td className="border p-2">{row.NAMA_LENGKAP}</td>
                <td className="border p-2 text-center">
                  {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : 'N/A'}
                </td>
                <td className="border p-2 text-center">
                  {formattedTotalLoanAmount !== '0' ? `Rp ${formattedTotalLoanAmount}` : 0}
                </td>
                <td className="border p-2 text-center">
                  {formattedTotalSavingAmount !== '0' ? `Rp ${formattedTotalSavingAmount}` : 0}
                </td>
                <td className="border p-2 text-center">
                  {formattedTotalTabungan !== '0' ? `Rp ${formattedTotalTabungan}` : 0}
                </td>
                <td className="border p-2 text-center">
                  {row.UUID_MS_USER ? (
                    <Link to={`/userTable/${row.UUID_MS_USER}`} className="text-blue-500 hover:underline">
                      Buka
                    </Link>
                  ) : (
                    <span className="text-gray-500">No UUID Available</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};



const ListUser = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({ selectedOption: '', searchTerm: '' });
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const navigate = useNavigate();
  const role = localStorage.getItem('UUID_MS_JOB');


  useEffect(() => {
    if (role === '1') {  
      navigate('/'); 
  } else {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user");
        console.log(response.data);
        setData(response.data);
        setOriginalData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }
  }, []);

  const handleSearch = () => {
    if (filterCriteria.selectedOption === "semua") {
      setData(originalData);
      return;
    }
  
    const filteredData = originalData.filter((row) => {
      const searchTerm = filterCriteria.searchTerm.toLowerCase();
      const selectedField = filterCriteria.selectedOption;
  
      if (selectedField === "NAMA_LENGKAP") {
        return row.NAMA_LENGKAP.toLowerCase().includes(searchTerm);
      } else if (selectedField === "createdAt") {
        return (
          row.createdAt &&
          new Date(row.createdAt).toLocaleDateString().toLowerCase().includes(searchTerm)
        );
      }
  
      return false;
    });
  
    if (filteredData.length === 0) {
      console.log("No data found for the search term");
    }
  
    setData(filteredData);
  };
  
  const handleSort = (column) => {
    let direction = 'asc';
    if (sortConfig.key === column && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: column, direction });
  
    const sortedData = [...data].sort((a, b) => {
      if (column === 'NAMA_LENGKAP') {
        const aName = a[column].toLowerCase();
        const bName = b[column].toLowerCase();
        return direction === 'asc' ? aName.localeCompare(bName) : bName.localeCompare(aName);
      }
  
      if (column === 'createdAt') {
        const aDate = new Date(a[column]);
        const bDate = new Date(b[column]);
        return direction === 'asc' ? aDate - bDate : bDate - aDate;
      }
  
      if (column === 'principalSavings') {
        const cleanNominal = (value) => parseFloat(value.replace(/[^0-9.-]+/g, ""));
        const getTotalTabungan = (row) => {
          return row.TR_PENGAJUAN_SIMPANANs.reduce((acc, saving) => {
            const statusCode = saving.status?.STATUS_CODE;
            const typeName = saving.type?.TYPE_NAME;
            const nominalValue = parseFloat(saving.NOMINAL) || 0;
            return statusCode === 'APPROVED' && typeName === 'Simpanan Sukarela' 
              ? acc + nominalValue 
              : acc;
          }, 0);
        };
  
        const aValue = getTotalTabungan(a);
        const bValue = getTotalTabungan(b);
  
        if (aValue < bValue) return direction === 'asc' ? 1 : -1;
        if (aValue > bValue) return direction === 'asc' ? -1 : 1;
        return 0;
      }

      const cleanNominal = (value) => parseFloat(value.replace(/[^0-9.-]+/g, ""));
      const getTotalAmount = (row, type) => {
        if (type === 'TR_PENGAJUAN_PINJAMANs') {
          return row.TR_PENGAJUAN_PINJAMANs.reduce((acc, loan) => {
            return loan.status?.STATUS_CODE === 'APPROVED'
              ? acc + cleanNominal(loan.NOMINAL)
              : acc;
          }, 0);
        } else if (type === 'TR_PENGAJUAN_SIMPANANs') {
          return row.TR_PENGAJUAN_SIMPANANs.reduce((acc, saving) => {
            return saving.status?.STATUS_CODE === 'APPROVED'
              ? acc + cleanNominal(saving.NOMINAL)
              : acc;
          }, 0);
        }
        return 0;
      };
  
      const aValue = getTotalAmount(a, column);
      const bValue = getTotalAmount(b, column);
  
      if (aValue < bValue) return direction === 'asc' ? 1 : -1;
      if (aValue > bValue) return direction === 'asc' ? -1 : 1;
      return 0;
    });
  
    setData(sortedData);
  };  
  
  const handleFilter = (order) => {
    const columnToSort = 'createdAt';

    const sortedData = [...originalData].sort((a, b) => {
      if (a[columnToSort] < b[columnToSort]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[columnToSort] > b[columnToSort]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <H />
      <main className="flex-grow container mx-auto p-6">
      <SearchFilterBar filterCriteria={filterCriteria} setFilterCriteria={setFilterCriteria} handleSearch={handleSearch} handleFilter={handleFilter} />
      <DataTable data={data} onSort={handleSort} />
      </main>
      <F />
    </div>
  );
};

export default ListUser;

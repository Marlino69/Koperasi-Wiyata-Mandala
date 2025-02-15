import React, { useState, useEffect, useRef } from "react";
import H from "../H&F/Header";
import F from "../H&F/Footer";
import { jsPDF } from "jspdf";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const LaporanKeuangan = () => {
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [error, setError] = useState(""); 
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const role = localStorage.getItem('UUID_MS_JOB');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jenis: '',
    pengeluaran: '',
  });

  useEffect(() => {
    if (role === '1') {  
      navigate('/'); 
  } else {
    const fetchFinancialStatementData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getFinancialStatementData");
        console.log("Financial Data:", response.data);
        if (response.data && Array.isArray(response.data.financialData)) {
          setReportData(response.data.financialData);
        } else {
          console.error("Data is not an array or financialData is missing:", response.data);
        }
      } catch (error) {
        console.error("Error fetching financial data:", error);
      }
    };
  
    fetchFinancialStatementData();
  }
  }, []);   

  const handleFilter = (e) => {
    e.preventDefault();

    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    console.log("Start Date Obj:", startDateObj);
    console.log("End Date Obj:", endDateObj);

    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
        console.error("Invalid dates");
        return;
    }

    if (endDateObj < startDateObj) {  // Check if end date is less than start date
      setError("End date cannot be earlier than start date.");  // Set error message
      return;
    } else {
      setError("");  // Clear error message if dates are valid
    }

    startDateObj.setHours(0, 0, 0, 0);
    endDateObj.setHours(23, 59, 59, 999);

    const filtered = reportData.filter((item) => {
      const itemDate = new Date(item.createdAt);
      console.log("Item Date:", item.createdAt);
      itemDate.setHours(0, 0, 0, 0);
      return itemDate >= startDateObj && itemDate <= endDateObj;
    });
    

    setFilteredData(filtered);
    setIsFilterApplied(true);
  };

  const getTotalPinjaman = () => {
    return filteredData.reduce((acc, curr, index) => {
      const pinjaman = parseFloat(curr.TOTAL_AMOUNT_PINJAMAN) || 0;
      console.log(`Index: ${index}, Pinjaman: ${pinjaman}, Acc: ${acc}`);
      return acc + pinjaman;
    }, 0);
  };

  const getTotalSimpanan = () => {
    return filteredData.reduce((acc, curr, index) => {
      const simpanan = parseFloat(curr.TOTAL_AMOUNT_SIMPANAN) || 0;
      console.log(`Index: ${index}, Simpanan: ${simpanan}, Acc: ${acc}`);
      return acc + simpanan;
    }, 0);
  };

  const getTotalPemasukkan = () => {
    return filteredData.reduce((acc, curr, index) => {
      const income = parseFloat(curr.TOTAL_INCOME) || 0;
      console.log(`Index: ${index}, Income: ${income}, Acc: ${acc}`);
      return acc + income;
    }, 0);
  };

  const getTotalPengeluaran = () => {
    return filteredData.reduce((acc, curr, index) => {
      const expenditure = parseFloat(curr.TOTAL_EXPENDITURE) || 0;
      console.log(`Index: ${index}, Expenditure: ${expenditure}, Acc: ${acc}`);
      return acc + expenditure;
    }, 0);
  };

  const exportToExcel = async () => {
    console.log("startDate:", startDate, "endDate:", endDate);
    const XLSX = await import("xlsx");

    const formatDate = (date) => {
      if (!date) return "-";  
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return "-";  
      const month = dateObj.toLocaleString("id-ID", { month: "long" });
      const year = dateObj.getFullYear();
      return `${month} ${year}`;
    };
  
    const pemasukkan = getTotalPemasukkan();
    const pengeluaran = getTotalPengeluaran();
    const shu = pemasukkan - pengeluaran;

    const reportPeriod = `Periode ${formatDate(startDate)} - ${formatDate(endDate)}`;
    const worksheetData = [
      ["Koperasi Simpan Pinjam Wiyata Mandala"],
      ["Laporan Keuangan"],
      [reportPeriod],
      [],
      ["Pinjaman", `Rp ${formatRupiah(getTotalPinjaman().toString())}`],
      ["Simpanan", `Rp ${formatRupiah(getTotalSimpanan().toString())}`],
      ["Pemasukkan", `Rp ${formatRupiah(pemasukkan.toString())}`],
      ["Pengeluaran", `Rp ${formatRupiah(pengeluaran.toString())}`],
      ["Sisa Hasil Usaha (SHU)", `Rp ${formatRupiah(shu.toString())}`],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan");

    const headerStyle = { font: { bold: true } };
    worksheet["A1"].s = headerStyle;
    worksheet["A2"].s = headerStyle;
    worksheet["A3"].s = headerStyle;

    XLSX.writeFile(workbook, "LaporanKeuangan.xlsx");
  };

  const exportToPDF = () => {
    console.log("startDate:", startDate, "endDate:", endDate);
    const doc = new jsPDF();

    const formatDate = (date) => {
      if (!date) return "-";  
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return "-";  
      const month = dateObj.toLocaleString("id-ID", { month: "long" });
      const year = dateObj.getFullYear();
      return `${month} ${year}`;
    };
  
    const pemasukkan = getTotalPemasukkan();
    const pengeluaran = getTotalPengeluaran();
    const shu = pemasukkan - pengeluaran;

    let reportPeriod = "";
    if (!startDate && !endDate) {
      reportPeriod = "Periode Semua Data";
    } else {
      reportPeriod = `Periode ${formatDate(startDate)} - ${formatDate(endDate)}`;  
    }

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Koperasi Simpan Pinjam Wiyata Mandala", 105, 10, null, null, "center");
    doc.setFontSize(12);
    doc.text("Laporan Keuangan", 105, 16, null, null, "center");
    doc.text(reportPeriod, 105, 22, null, null, "center");

    doc.setFont("helvetica", "bold");
    doc.text("Pinjaman", 20, 35);
    doc.text(`Rp ${formatRupiah(getTotalPinjaman().toString())}`, 140, 35, null, null, "right");

    doc.text("Simpanan", 20, 50);
    doc.text(`Rp ${formatRupiah(getTotalSimpanan().toString())}`, 140, 50, null, null, "right");

    doc.text("Pemasukkan", 20, 65);
    doc.text(`Rp ${formatRupiah(pemasukkan.toString())}`, 140, 65, null, null, "right");

    doc.text("Pengeluaran", 20, 80);
    doc.text(`Rp ${formatRupiah(pengeluaran.toString())}`, 140, 80, null, null, "right");

    doc.text("Sisa Hasil Usaha (SHU)", 20, 95);
    doc.text(`Rp ${formatRupiah(shu.toString())}`, 140, 95, null, null, "right");

    doc.save("LaporanKeuangan.pdf");
  };

  const formatRupiah = (value) => {
    let number = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    let formattedNumber = '';
    
    while (number.length > 3) {
      formattedNumber = `,${number.slice(-3)}${formattedNumber}`;
      number = number.slice(0, number.length - 3);
    }
  
    if (number) {
      formattedNumber = `${number}${formattedNumber}`;
    }
  
    return `Rp ${formattedNumber}`;
  };
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;

    // Only format the 'pengeluaran' field
    if (name === 'pengeluaran') {
      const formattedValue = formatRupiah(value);
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    // Remove "Rp" and commas from the pengeluaran value
    const rawPengeluaran = formData.pengeluaran.replace(/[Rp,.]/g, "").trim();
  
    // Prepare the cleaned-up form data
    const cleanedFormData = {
      ...formData,
      pengeluaran: rawPengeluaran,
    };
  
    console.log('Form Data Submitted:', cleanedFormData);
  
    // Submit cleanedFormData to the server or process it as needed
    setIsModalOpen(false);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <H />
      <main className="flex-grow p-4">
        <header className="bg-gradient-to-b from-[#2e86c1] to-[#21618c] text-white p-4 rounded-lg flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">LAPORAN KEUANGAN</h1>
          <span>Data Laporan</span>
        </header>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Filter Laporan</h2>
          <form onSubmit={handleFilter}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="startDate" className="block mb-2 font-semibold">
                  Tanggal Awal
                </label>
                <input
                      type="date"
                      id="startDate"
                      ref={startDateRef}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      onFocus={() => startDateRef.current.showPicker()}
                    />
              </div>
              <div>
                <label htmlFor="endDate" className="block mb-2 font-semibold">
                  Tanggal Akhir
                </label>
                <input
                      type="date"
                      id="endDate"
                      ref={endDateRef}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      onFocus={() => endDateRef.current.showPicker()}
                    />
              </div>
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <button type="submit" className="bg-blue-600 text-white p-2 rounded-md">
              Filter Data
            </button>
          </form>
        </div>

        <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">No</th>
                  <th className="px-4 py-2 text-left">Jenis</th>
                  <th className="px-4 py-2 text-left">Nominal</th>
                  <th className="px-4 py-2 text-left">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{item.jenis}</td>
                      <td className="px-4 py-2">{item.nominal}</td>
                      <td className="px-4 py-2">{item.tanggal}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-2 text-center">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        <div className="flex space-x-4 mb-6">
            <button
              onClick={() => {
                setModalType('pengeluaran');
                setIsModalOpen(true);
              }}
              className="bg-blue-600 text-white p-2 rounded-md"
            >
              Input Pengeluaran
            </button>
          </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">No</th>
                <th className="px-4 py-2 text-left">Tipe</th>
                <th className="px-4 py-2 text-left">Nominal</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(4)].map((_, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    {index === 0 && "Total Pinjaman"}
                    {index === 1 && "Total Simpanan"}
                    {index === 2 && "Total Pemasukan"}
                    {index === 3 && "Total Pengeluaran"}
                  </td>
                  <td className="px-4 py-2">
                    {index === 0 && formatRupiah(filteredData.reduce((sum, item) => sum + parseFloat(item.TOTAL_AMOUNT_PINJAMAN || 0), 0).toString())}
                    {index === 1 && formatRupiah(filteredData.reduce((sum, item) => sum + parseFloat(item.TOTAL_AMOUNT_SIMPANAN || 0), 0).toString())}
                    {index === 2 && formatRupiah(filteredData.reduce((sum, item) => sum + parseFloat(item.TOTAL_INCOME || 0), 0).toString())}
                    {index === 3 && formatRupiah(filteredData.reduce((sum, item) => sum + parseFloat(item.TOTAL_EXPENDITURE || 0), 0).toString())}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-start mt-6">
  <button
    onClick={exportToExcel}
    className={`bg-green-500 text-white p-2 rounded-md mr-4 transition-opacity duration-300 ${
      isFilterApplied ? "opacity-100 cursor-pointer" : "opacity-50 cursor-not-allowed"
    }`}
    disabled={!isFilterApplied}
  >
    Export Excel
  </button>
  <button
    onClick={exportToPDF}
    className={`bg-blue-600 text-white p-2 rounded-md transition-opacity duration-300 ${
      isFilterApplied ? "opacity-100 cursor-pointer" : "opacity-50 cursor-not-allowed"
    }`}
    disabled={!isFilterApplied}
  >
    Export PDF
  </button>
</div>

{isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
      <h2 className="text-xl font-semibold mb-4">Create Pengeluaran</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label
            htmlFor="jenis"
            className="block text-sm font-semibold mb-2"
          >
            Jenis Pengeluaran
          </label>
          <input
            type="text"
            id="jenis"
            name="jenis"
            value={formData.jenis}
            onChange={handleFormChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
        <label htmlFor="pengeluaran" className="block text-sm font-semibold mb-2">
          Nominal Pengeluaran
        </label>
        <input
          type="text"
          id="pengeluaran"
          name="pengeluaran"
          value={formData.pengeluaran}
          onChange={handleFormChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>

      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-2 right-2 text-red-500 text-2xl font-bold"
      >
        &times;
      </button>
    </div>
  </div>
)}


      </main>
      <F />
    </div>
  );
};

export default LaporanKeuangan;

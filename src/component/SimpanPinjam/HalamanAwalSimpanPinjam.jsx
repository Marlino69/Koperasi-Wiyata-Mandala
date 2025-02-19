import H from "../H&F/Header.jsx"
import F from "../H&F/Footer.jsx"
import React from "react";
import Popup from "reactjs-popup";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getCurrentLoggedInData,
  formatDate,
  formatRupiah
} from "../../utils/utils.js";
import axios from "axios";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

const KeuanganAnggota = ({ userData }) => {
  const [dataPinjaman, setDataPinjaman] = useState([])
  const [dataSimpanan, setDataSimpanan] = useState([])
  const [keuanganPinjaman, setKeuanganPinjaman] = useState([])
  const [keuanganSimpanan, setKeuanganSimpanan] = useState([])
  useEffect(() => {
    if (!isNaN(userData?.UUID_MS_USER)) {
      const fetchDataType = async () => {
        try {
          const now = new Date();
          const month = now.getMonth() + 1;
          const year = now.getFullYear();
          const dataFilter = {
            "id": userData?.UUID_MS_USER,
            "month": month,
            "year": year
          }
          const dataPinjaman = await axios.post(`http://localhost:5000/getActivePengajuanPinjamanAnggota`, dataFilter);
          const dataSimpanan = await axios.post(`http://localhost:5000/getActivePengajuanSimpananAnggota`, dataFilter);
          setDataPinjaman(dataPinjaman.data)
          setDataSimpanan(dataSimpanan.data)
        } catch (error) {
          console.log(error);
        }
      };

      fetchDataType();
    }
  }, [userData])

  useEffect(() => {
    if (dataPinjaman.processedData) {
      const fetchDataPinjaman = async () => {
        try {
          const details = dataPinjaman.processedData.map((item) => {
            if (item) {
              return (
                <div className="flex justify-between">
                  <p className="text-lg">{item.TYPE_NAME}</p>
                  <p className="text-lg">{"Rp " + formatRupiah(String(item.ANGSURAN))}</p>
                </div>
              );
            } else {
              return
            }
          });
          setKeuanganPinjaman(details);
        } catch (error) {
          console.log(error);
        }
      }

      fetchDataPinjaman();
    }

    if (dataSimpanan.processedData) {
      const fetchDataSimpanan = async () => {
        try {
          const details = dataSimpanan.processedData.map((item) => {
            if (item) {
              return (
                <div className="flex justify-between">
                  <p className="text-lg">{item.TYPE_NAME}</p>
                  <p className="text-lg">{"Rp " + formatRupiah(String(item.total_nominal))}</p>
                </div>
              );
            } else {
              return
            }
          });
          setKeuanganSimpanan(details);
        } catch (error) {
          console.log(error);
        }
      }

      fetchDataSimpanan();
    }
  }, [dataSimpanan, dataSimpanan])

  return (
    <div className="col-span-1 row-span-3 bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
      <div>
        <div className="text-xl font-semibold text-gray-700 mb-2 text-center">Total Deduksi Anggota Akhir Bulan</div>
        <h1 className="text-5xl font-bold text-red-800 mb-4 text-center">{"Rp " + formatRupiah(String(dataSimpanan.TOTAL_SIMPANAN + dataPinjaman.TOTAL_ANGSURAN))}</h1>
      </div>
      {/* TOTAL SIMPANAN */}
      <div className="mt-8">
        <div className="flex font-bold justify-between">
          <p className="text-lg">Total Simpanan</p>
          <p className="text-lg text-red-800">{"Rp " + formatRupiah(String(dataSimpanan.TOTAL_SIMPANAN))}</p>
        </div>

        {keuanganSimpanan}

        {/* TOTAL PINJAMAN */}
        <div className="flex font-bold mt-4 justify-between">
          <p className="text-lg">Total Pinjaman</p>
          <p className="text-lg text-red-800">{"Rp " + formatRupiah(String(dataPinjaman.TOTAL_ANGSURAN))}</p>
        </div>

        {keuanganPinjaman}

      </div>
    </div>
  )
}

const KeuanganKoperasi = ({ userData }) => {
  const [dataPinjaman, setDataPinjaman] = useState([])
  const [dataSimpanan, setDataSimpanan] = useState([])
  const [keuanganPinjaman, setKeuanganPinjaman] = useState([])
  const [keuanganSimpanan, setKeuanganSimpanan] = useState([])
  useEffect(() => {
    if (!isNaN(userData?.UUID_MS_USER)) {
      const fetchDataType = async () => {
        try {
          const now = new Date();
          const month = now.getMonth() + 1;
          const year = now.getFullYear();
          const dataFilter = {
            "id": userData?.UUID_MS_USER,
            "month": month,
            "year": year
          }
          const dataPinjaman = await axios.post(`http://localhost:5000/getActivePengajuanPinjamanAnggota`, dataFilter);
          const dataSimpanan = await axios.post(`http://localhost:5000/getActivePengajuanSimpananAnggota`, dataFilter);
          setDataPinjaman(dataPinjaman.data)
          setDataSimpanan(dataSimpanan.data)
        } catch (error) {
          console.log(error);
        }
      };

      fetchDataType();
    }
  }, [userData])

  useEffect(() => {
    if (dataPinjaman.processedData) {
      const fetchDataPinjaman = async () => {
        try {
          const details = dataPinjaman.processedData.map((item) => {
            if (item) {
              return (
                <div className="flex justify-between">
                  <p className="text-lg">{item.TYPE_NAME}</p>
                  <p className="text-lg">{"Rp " + formatRupiah(String(item.ANGSURAN))}</p>
                </div>
              );
            } else {
              return
            }
          });
          setKeuanganPinjaman(details);
        } catch (error) {
          console.log(error);
        }
      }

      fetchDataPinjaman();
    }

    if (dataSimpanan.processedData) {
      const fetchDataSimpanan = async () => {
        try {
          const details = dataSimpanan.processedData.map((item) => {
            if (item) {
              return (
                <div className="flex justify-between">
                  <p className="text-lg">{item.TYPE_NAME}</p>
                  <p className="text-lg">{"Rp " + formatRupiah(String(item.total_nominal))}</p>
                </div>
              );
            } else {
              return
            }
          });
          setKeuanganSimpanan(details);
        } catch (error) {
          console.log(error);
        }
      }

      fetchDataSimpanan();
    }
  }, [dataSimpanan, dataSimpanan])

  return (
    <div className="col-span-1 row-span-3 bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
      <div>
        <div className="text-xl font-semibold text-gray-700 mb-2 text-center">Keuangan Koperasi Bulan ini</div>
        <h1 className="text-5xl font-bold text-red-800 mb-4 text-center">{"Rp " + formatRupiah(String(dataSimpanan.TOTAL_SIMPANAN + dataPinjaman.TOTAL_ANGSURAN))}</h1>
      </div>
      {/* TOTAL SIMPANAN */}
      <div className="mt-8">
        <div className="flex font-bold justify-between">
          <p className="text-lg">Total Simpanan</p>
          <p className="text-lg text-red-800">{"Rp " + formatRupiah(String(dataSimpanan.TOTAL_SIMPANAN))}</p>
        </div>

        {keuanganSimpanan}

        {/* TOTAL PINJAMAN */}
        <div className="flex font-bold mt-4 justify-between">
          <p className="text-lg">Total Pinjaman</p>
          <p className="text-lg text-red-800">{"Rp " + formatRupiah(String(dataPinjaman.TOTAL_ANGSURAN))}</p>
        </div>

        {keuanganPinjaman}

      </div>
    </div>
  )
}

function HalamanAwalSimpanPinjam() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


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
  const userData = getCurrentLoggedInData();
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <div className="w-full">
          <H /> {/* Header */}
        </div>

        <div className="flex-1 flex justify-center">
          <div className="grid grid-cols-2 grid-rows-3 gap-4 max-w-7xl w-full p-12 h-full" style={{ width: "1300px" }}>
            <div className="col-span-1 row-span-1 bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center text-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Tabungan Koperasi</h2>
              <h1 className="text-5xl font-bold text-green-600 mb-4">Rp 399.832.200</h1>
            </div>

            <div className="col-span-1 row-span-4">
              <div className="flex flex-col">
                <div className="w-full mx-auto">
                  <div className="bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] text-white rounded-lg shadow-md p-8 mb-6 text-center relative h-full">
                    <div className="w-52 h-52 bg-gray-300 rounded-full mx-auto mb-4">
                      Profile Picture
                    </div>
                    <h2 className="text-3xl font-semibold mb-2 truncate">
                      {userData?.NAMA_LENGKAP}
                    </h2>


                    <div className="h-1 bg-white mb-4 w-full mx-auto rounded"></div> {/* H-LINE */}

                    <div className="bg-black bg-opacity-30 px-4 py-4 rounded-lg mx-auto">
                      <div className="text-left text-white">
                        <div className="flex mb-2">
                          <p className="text-lg w-48">Peran</p>
                          <p className="text-lg ml-4">: {userData?.MS_JOB.JOB_CODE}</p>
                        </div>
                        <div className="flex mb-2">
                          <p className="text-lg w-48">Unit Kerja</p>
                          <p className="text-lg ml-4">: Sekolah</p>
                        </div>
                        <div className="flex mb-2">
                          <p className="text-lg w-48">Nomor Anggota</p>
                          <p className="text-lg ml-4">: A79123</p>
                        </div>
                        <div className="flex mb-2">
                          <p className="text-lg w-48">Total Tabungan</p>
                          <p className="text-lg ml-4">: Rp 750.650,00</p>
                        </div>
                        <div className="flex mb-2">
                          <p className="text-lg w-48">Tanggal Bergabung</p>
                          <p className="text-lg ml-4">: {formatDate(userData?.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between gap-4">
                    {userData?.MS_JOB.JOB_CODE == "ANGGOTA" && (
                      <Menu>
                        <MenuHandler>
                          <button
                            className="w-full py-2 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-100 transition-colors font-semibold"
                          >Ajukan Pengajuan</button>
                        </MenuHandler>
                        <MenuList
                          className=""
                        >
                          <MenuItem
                            className="w-full hover:bg-gray-200 py-2"
                            onClick={() => navigate('/FormPengajuanPinjaman')}
                          >Ajukan Pinjaman</MenuItem>
                          <MenuItem
                            className="w-full hover:bg-gray-200 py-2"
                            onClick={() => navigate('/FormPengajuanSimpanan')}
                          >Ajukan Simpanan</MenuItem>
                        </MenuList>
                      </Menu>
                    )}

                    <Link to='/ListPengajuan' className="w-full">
                      <button
                        className="h-full w-full py-2 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-100 transition-colors font-semibold"
                        onClick={() => navigate('/ListPengajuan')}>
                        Lihat Pengajuan {userData?.MS_JOB.JOB_CODE == "ANGGOTA" && (<>Saya</>)} {userData?.MS_JOB.JOB_CODE == "PENGURUS" && (<>Semua Anggota</>)}
                      </button>
                    </Link>
                  </div>
                  {userData?.MS_JOB.JOB_CODE == "ANGGOTA" && (
                    // <a href="#" className="block mt-4 text-center text-blue-500 underline">
                    //   Baca Syarat & Ketentuan Pengajuan
                    // </a>
                    <Popup
                      trigger={<a href="#" className="block mt-4 text-center text-blue-500 underline">
                        Baca Syarat & Ketentuan Pengajuan
                      </a>}
                      modal nested
                    >
                      {close => (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">

                            {/* Header */}
                            <h2 className="text-xl font-semibold text-center mb-4">
                              📜 Syarat & Ketentuan Pengajuan
                            </h2>

                            {/* Konten Modal */}
                            <div className="text-sm text-gray-700 leading-relaxed">
                              <p className="mb-2">1️⃣ **Anggota wajib memiliki minimal 6 bulan keanggotaan** sebelum dapat mengajukan pinjaman.</p>
                              <p className="mb-2">2️⃣ **Besaran pinjaman maksimal 3x dari total simpanan** yang dimiliki oleh anggota.</p>
                              <p className="mb-2">3️⃣ **Simpanan wajib harus lunas** sebelum pengajuan pinjaman baru dapat diproses.</p>
                              <p className="mb-2">4️⃣ **Bunga pinjaman koperasi sebesar 1% - 1.5% per bulan**, bergantung pada jumlah pinjaman.</p>
                              <p className="mb-2">5️⃣ **Jangka waktu pinjaman mulai dari 6 bulan hingga 24 bulan**, dengan opsi pelunasan lebih awal tanpa denda.</p>
                              <p className="mb-2">6️⃣ **Jika anggota gagal bayar lebih dari 3 bulan berturut-turut**, maka jaminan yang disertakan dapat digunakan untuk menutupi pinjaman.</p>
                              <p className="mb-2">7️⃣ **Pengajuan hanya dapat dilakukan melalui platform resmi koperasi** dan akan diproses dalam waktu maksimal 7 hari kerja.</p>
                            </div>
                            {/* Tombol Close */}
                            <div className="text-center mt-4">
                              <button
                                onClick={() => close()}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                              >
                                Tutup
                              </button>
                            </div>

                          </div>
                        </div>
                      )}
                    </Popup>
                  )}
                </div>
              </div>
            </div>

            {userData?.MS_JOB.JOB_CODE == "ANGGOTA" && (<KeuanganAnggota userData={userData} />)}
            {userData?.MS_JOB.JOB_CODE == "PENGURUS" && (<KeuanganKoperasi userData={userData} />)}

          </div>
        </div>

        <div className="w-full">
          <F /> {/* Footer */}
        </div>
      </div>
    </>

  );
}

export default HalamanAwalSimpanPinjam
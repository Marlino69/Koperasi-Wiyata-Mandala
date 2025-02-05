import H from "./H&F/Header"
import F from "./H&F/Footer"
import gmbr1 from "./Foto/Foto_Beranda/Building.png"
import gmbr2 from "./Foto/Foto_Beranda/People1.png"
import gmbr3 from "./Foto/Foto_Beranda/People2.png"
import gmbr4 from './Foto/Foto_Beranda/image4.png';
import gmbr5 from './Foto/Foto_Beranda/ttg_foto.jpg';
import gmbr6 from './Foto/Foto_Beranda/img_prdkL.png';
import gmbrSP from './Foto/Foto_Beranda/gmbr_SP.png';
import gmbrSS from './Foto/Foto_Beranda/gmbr_SS.png';
import gmbrSHR from './Foto/Foto_Beranda/gmbr_SHR.png';
import gmbrSW from './Foto/Foto_Beranda/gmbr_SW.png';
import gmbrSSP from './Foto/Foto_Beranda/gmbrSimpan.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { ArrowRightIcon } from "@radix-ui/react-icons";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const getImageSrc = (lobBerita) => {
    if (lobBerita && lobBerita.LOB && lobBerita.LOB.startsWith("data:image/")) {
        return lobBerita.LOB;
    }
    return "http://localhost:5000/uploads/" + lobBerita;
};

function Beranda() {
    const [berita, setBerita] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBerita = async () => {
            try {
                const response = await axios.get('http://localhost:5000/berita');
                setBerita(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBerita();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>

        <H/>
        <div>
            <Swiper
            slidesPerView={2}
            loop={true}
            spaceBetween={10}
            centeredSlides={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets:1,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper mt-[10px]"
            >
                <SwiperSlide>
                    <img src={gmbr1} className="rounded-[30px]"  alt="Gambar 1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={gmbr2} className="rounded-[30px]"  alt="Gambar 2" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={gmbr3} className="rounded-[30px]" alt="Gambar 3" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={gmbr1} className="rounded-[30px]"  alt="Gambar 1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={gmbr2} className="rounded-[30px]"  alt="Gambar 2" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={gmbr3} className="rounded-[30px]" alt="Gambar 3" />
                </SwiperSlide>

            </Swiper>
            <div style={{ backgroundImage: `url(${gmbr4})` }} className="mt-[10px]  bg-center bg-no-repeat bg-cover h-[480px] ">
                <span className="grid grid-cols-2">
                    <div className="grid justify-start grid-rows-2">
                        <h1 className="ml-[200px] mt-[100px] text-4xl font-bold ">Tentang Kami</h1>
                        <h2 className="ml-[200px] mt-[-50px] text-lg text-justify w-[600px]">
                        Koperasi Konsumen KPRI "Wiyata Mandala" atau disebut dengan KPRI Wiyata Mandala didirikan
                        pada tahun 1997. Koperasi Konsumen KPRI "Wiyata Mandala" merupakan koperasi yang bergerak 
                        di bidang simpan pinjam, Tabungan Koperasi "Takop", UKM Mart, dan lain-lain. Koperasi Pegawal 
                        Republik Indonesia "KPRI" yang beranggotakan pegawai Negeri khususnya guru sekolah dasar SD, 
                        guru SMP , Guru SMU Guru MAN yang ada di kecamatan Kronjo Mekar baru koperasi Konsumen KPRI 
                        "Wiyata Mandala " mempunyai kegiatan utama yakni menyediakan penyimpanan dan pinjaman bagi para
                        anggotanya.
                        </h2>
                    </div>
                    <img src={gmbr5} className="grid justify-end w-[600px] h-[300px] mt-[90px] ml-[165px] shadow-lg rounded-2xl"/>
                </span>
            </div>
            <div className="grid grid-cols-2 mt-[10px]">
                <div style={{ backgroundImage: `url(${gmbr6})` }} className="w-[520px] bg-no-repeat bg-cover h-[1439px] ml-[10px]">
                    <h1 className="ml-[150px] mt-[525px] text-4xl">Produk Kami</h1>
                </div>

                <div className="bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] w-[1357px] ml-[-409px] ">
                    <div className="relative flex flex-col md:flex-row w-[800px] h-[265px] mt-[20px] ml-[150px] bg-white shadow-sm border border-slate-200 bg-opacity-50 rounded-[40px] ">
                       <div className="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
                           <img
                               src={gmbrSP}
                               alt="card-image"
                               className=" w-full rounded-md md:rounded-lg object-cover"
                           />
                       </div>
                       <div className="p-6">
                            <div className="mb-4 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">On-Going</div>
                            <h4 className="mb-2 text-slate-800 text-2xl font-semibold">
                                Simpanan Pokok
                            </h4>
                            <p className="mb-8 text-slate-600 leading-normal font-light">
                                 Sejumlah uang yang wajib dibayarkan oleh anggota koperasi saat pertama kali menjadi anggota. 
                                 Simpanan pokok tidak dapat diambil kembali selama anggota masih tergabung dalam koperasi
                            </p>
                            <div>
                                <a href="/Produk" className="text-slate-800 font-semibold text-sm hover:underline flex items-center">
                                    Pelajari Lebih Lanjut <ArrowRightIcon className="ml-2"/>
                                </a>
                            </div>
                        </div>
                    </div> 
                    
                    <div className="relative flex flex-col md:flex-row w-[800px] h-[265px] mt-[20px] ml-[400px] bg-white shadow-sm border border-slate-200 bg-opacity-50 rounded-[40px] ">
                       <div className="p-6">
                            <div className="mb-4 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">On-Going</div>
                            <h4 className="mb-2 text-slate-800 text-2xl font-semibold">
                                Simpanan Wajib
                            </h4>
                            <p className="mb-8 text-slate-600 leading-normal font-light">
                                 Sejumlah uang yang wajib dibayarkan oleh anggota koperasi saat pertama kali menjadi anggota. 
                                 Simpanan pokok tidak dapat diambil kembali selama anggota masih tergabung dalam koperasi
                            </p>
                            <div>
                                <a href="/Produk" className="text-slate-800 font-semibold text-sm hover:underline flex items-center">
                                    Pelajari Lebih Lanjut <ArrowRightIcon className="ml-2"/>
                                </a>
                            </div>
                            </div>
                            <div className="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
                            <img
                                src={gmbrSW}
                                alt="card-image"
                                class=" w-full rounded-md md:rounded-lg object-cover"
                            />
                            </div>
                    </div> 

                <div className="relative flex flex-col md:flex-row w-[800px] h-[265px] mt-[20px] ml-[150px] bg-white shadow-sm border border-slate-200 bg-opacity-50 rounded-[40px] ">
                       <div className="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
                           <img
                               src={gmbrSS}
                               alt="card-image"
                               className=" w-full rounded-md md:rounded-lg object-cover"
                           />
                       </div>
                       <div className="p-6">
                        <div className="mb-4 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">On-Going</div>
                            <h4 className="mb-2 text-slate-800 text-2xl font-semibold">
                                Simpanan Suka Rela
                            </h4>
                            <p className="mb-8 text-slate-600 leading-normal font-light">
                                 Sejumlah uang yang wajib dibayarkan oleh anggota koperasi saat pertama kali menjadi anggota. 
                                 Simpanan pokok tidak dapat diambil kembali selama anggota masih tergabung dalam koperasi
                            </p>
                            <div>
                                <a href="/Produk" className="text-slate-800 font-semibold text-sm hover:underline flex items-center">
                                    Pelajari Lebih Lanjut <ArrowRightIcon className="ml-2"/>
                                </a>
                            </div>
                        </div>
                    </div> 

                <div className="relative flex flex-col md:flex-row w-[800px] h-[265px] mt-[20px] ml-[400px] bg-white shadow-sm border border-slate-200 bg-opacity-50 rounded-[40px] ">
                       
                       <div className="p-6">
                        <div className="mb-4 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">On-Going</div>
                            <h4 className="mb-2 text-slate-800 text-2xl font-semibold">
                                Simpanan Hari raya
                            </h4>
                            <p className="mb-8 text-slate-600 leading-normal font-light">
                                 Sejumlah uang yang wajib dibayarkan oleh anggota koperasi saat pertama kali menjadi anggota. 
                                 Simpanan pokok tidak dapat diambil kembali selama anggota masih tergabung dalam koperasi
                            </p>
                            <div>
                                <a href="/Produk" className="text-slate-800 font-semibold text-sm hover:underline flex items-center">
                                    Pelajari Lebih Lanjut <ArrowRightIcon className="ml-2"/>
                                </a>
                            </div>
                        </div>
                        <div className="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
                           <img
                               src={gmbrSHR}
                               alt="card-image"
                               className=" w-full rounded-[24px] object-cover"
                           />
                       </div>
                    </div> 

                <div className="relative flex flex-col md:flex-row w-[800px] h-[265px] mt-[20px] ml-[150px] bg-white shadow-sm border border-slate-200 bg-opacity-50 rounded-[40px] ">
                       <div className="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
                           <img
                               src={gmbrSSP}
                               alt="card-image"
                               className=" w-full rounded-md md:rounded-lg object-cover"
                           />
                       </div>
                       <div className="p-6">
                        <div className="mb-4 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">On-Going</div>
                            <h4 className="mb-2 text-slate-800 text-2xl font-semibold">
                                Simpanan dan Pinjam
                            </h4>
                            <p className="mb-8 text-slate-600 leading-normal font-light">
                                 Sejumlah uang yang wajib dibayarkan oleh anggota koperasi saat pertama kali menjadi anggota. 
                                 Simpanan pokok tidak dapat diambil kembali selama anggota masih tergabung dalam koperasi
                            </p>
                            <div>
                                <a href="/Produk" className="text-slate-800 font-semibold text-sm hover:underline flex items-center">
                                    Pelajari Lebih Lanjut <ArrowRightIcon className="ml-2"/>
                                </a>
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                    <h2 className="text-2xl font-bold mb-4">Berita Terkini</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {berita.map((item) => (
                            <div key={item.UUID_BERITA} className="bg-white rounded-md shadow-md overflow-hidden">
                                <img
                                        src={getImageSrc(item.lobBerita)}
                                        alt={item.JUDUL_BERITA}
                                        className="w-full h-48 object-cover cursor-pointer"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">{item.JUDUL_BERITA}</h3>
                                    <p className="text-sm text-gray-600">
                                        {new Date(item.DTM_CRT).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-700">{item.ISI_BERITA.substring(0, 100)}...</p>
                                    <a
                                        href={`/showBerita/${item.UUID_BERITA}`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Selengkapnya
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>    
        </div>
        <F/>
        </>
    )
}

export default Beranda
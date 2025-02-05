import H from "./H&F/Header"
import F from "./H&F/Footer"
import gmbrSP from './Foto/Foto_Produk/gmbr_SP.png';
import gmbrSS from './Foto/Foto_Produk/gmbr_SS.png';
import gmbrSHR from './Foto/Foto_Produk/gmbr_SHR.png';
import gmbrSW from './Foto/Foto_Produk/gmbr_SW.png';
import gmbrSSP from './Foto/Foto_Produk/gmbrSimpan.png';


function Produk() {
    return (
        <>
        <H/>
        <div className=" bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] grid justify-center mt-[10px]">
            <div className="grid grid-cols-2">
                <div class="relative flex flex-col md:flex-row w-[800px] h-[300px] mt-[20px] ml-[150px] bg-white shadow-sm border border-slate-200 bg-opacity-50 rounded-[40px] ">
                       <div class="relative ml-[20px] mt-[20px] md:w-2/5 shrink-0 overflow-hidden">
                           <img
                               src={gmbrSP}
                               alt="card-image"
                               class=" w-full rounded-md md:rounded-lg object-cover"
                           />
                       </div>
                       <div class="p-6">
                        <div class="mb-2 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">On-Going</div>
                            <h4 class="mb-2 text-slate-800 text-2xl font-semibold">
                                Simpanan Pokok
                            </h4>
                            <p class="mb-8 text-slate-600 leading-normal font-light text-justify">
                            Simpanan pokok adalah sejumlah uang yang wajib disetorkan oleh anggota koperasi pada saat pertama kali menjadi anggota. 
                            Simpanan ini bersifat wajib dan tidak dapat diambil selama anggota masih terdaftar di koperasi. Simpanan pokok biasanya memiliki jumlah yang tetap untuk setiap anggota, dan merupakan modal dasar koperasi yang tidak dapat 
                            ditarik kecuali anggota keluar dari keanggotaan koperasi. 
                            </p>
                        </div>
                </div> 
                <div class="relative flex flex-col md:flex-row w-[800px] h-[300px] mt-[20px] ml-[20px] bg-white shadow-sm border border-slate-200 bg-opacity-50 rounded-[40px] ">
                    <div class="relative ml-[20px] mt-[20px] md:w-2/5 shrink-0 overflow-hidden">
                       <img
                           src={gmbrSHR}
                           alt="card-image"
                           class=" w-full rounded-[24px] object-cover"
                        />
                    </div>
                    <div class="p-6">
                    <div class="mb-2 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">On-Going</div>
                        <h4 class="mb-2 text-slate-800 text-2xl font-semibold">
                            Simpanan Hari Raya 
                        </h4>
                        <p class="mb-8 text-slate-600 leading-normal font-light text-justify">
                        Simpanan hari raya adalah jenis simpanan khusus yang disediakan oleh koperasi untuk membantu anggotanya menabung 
                        secara teratur menjelang hari raya. Anggota menyetorkan uang secara berkala dengan tujuan agar bisa digunakan untuk kebutuhan hari raya, 
                        seperti Idul Fitri atau Natal. Biasanya, simpanan ini hanya bisa dicairkan pada waktu menjelang hari raya, untuk membantu anggota memenuhi kebutuhan ekstra saat perayaan.
                        </p>
                    </div>
                </div> 
            </div>
            <div className="grid grid-cols-2">
                <div class="relative flex flex-col md:flex-row w-[800px] h-[300px] mt-[20px] ml-[150px] bg-white shadow-sm border border-slate-200 bg-opacity-50 rounded-[40px] ">
                       <div class="relative ml-[20px] mt-[20px] md:w-2/5 shrink-0 overflow-hidden">
                           <img
                               src={gmbrSS}
                               alt="card-image"
                               class=" w-full rounded-md md:rounded-lg object-cover"
                           />
                       </div>
                       <div class="p-6">
                        <div class="mb-2 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">On-Going</div>
                            <h4 class="mb-2 text-slate-800 text-2xl font-semibold">
                                Simpanan Sukarela 
                            </h4>
                            <p class="mb-8 text-slate-600 leading-normal font-light text-justify">
                            Simpanan sukarela adalah simpanan yang bisa dilakukan oleh anggota koperasi secara bebas tanpa ada kewajiban atau batasan tertentu. 
                            Anggota dapat menyetorkan simpanan ini kapan saja dan dalam jumlah berapa pun sesuai keinginan mereka. Simpanan sukarela juga bisa diambil kembali kapan saja sesuai kebutuhan anggota, 
                            berbeda dengan simpanan pokok dan simpanan wajib yang tidak bisa diambil selama masih menjadi anggota koperasi.
                            </p>
                        </div>
                    </div> 
                        <div class="relative flex flex-col md:flex-row w-[800px] h-[300px] mt-[20px] ml-[20px] bg-white shadow-sm border border-slate-200 bg-opacity-50 rounded-[40px] ">
                            <div class="relative ml-[20px] mt-[20px] md:w-2/5 shrink-0 overflow-hidden">
                                <img
                                    src={gmbrSW}
                                    alt="card-image"
                                    class=" w-full rounded-md md:rounded-lg object-cover"
                                />
                            </div>
                        <div class="p-6">
                            <div class="mb-2 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">On-Going</div>
                                <h4 class="mb-2 text-slate-800 text-2xl font-semibold">
                                    Simpanan Wajib
                                </h4>
                                <p class="mb-8 text-slate-600 leading-normal font-light text-justify">
                                Simpanan wajib adalah sejumlah uang yang harus disetorkan oleh anggota koperasi secara berkala (misalnya setiap bulan). 
                                Simpanan wajib ini bersifat rutin dan wajib dibayar selama anggota tersebut masih menjadi bagian dari koperasi. Simpanan pokok dibayar 
                                sekali saat bergabung dan jumlahnya tetap, sedangkan simpanan wajib dibayar berkala, misalnya bulanan, dengan jumlah yang bisa bervariasi. 
                                Keduanya tidak bisa diambil selama masih menjadi anggota.
                                </p>     
                            </div>
                        </div> 
                </div>
                <div class="relative flex flex-col md:flex-row w-[1620px] h-[300px] mt-[20px] mb-[24px] ml-[150px] bg-white shadow-sm border border-slate-200 bg-opacity-50 rounded-[40px] ">
                       <div class="relative ml-[20px] mt-[20px] md:w-2/5 shrink-0 overflow-hidden">
                           <img
                               src={gmbrSSP}
                               alt="card-image"
                               class=" w-[320px] rounded-md md:rounded-lg object-cover"
                           />
                       </div>
                       <div class="mt-[24px] ml-[-280px] mr-[24px]">
                        <div class="mb-6 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">On-Going</div>
                            <h4 class="mb-4 text-slate-800 text-2xl font-semibold">
                                Simpan dan Pinjam 
                            </h4>
                            <p class="mb-8 text-slate-600 leading-normal font-light text-justify">
                            Simpan pinjam dalam koperasi adalah layanan keuangan yang memungkinkan anggota untuk menabung dan meminjam uang secara fleksibel. 
                            Anggota dapat menyimpan dana dalam berbagai jenis simpanan, seperti simpanan pokok, simpanan wajib, dan simpanan sukarela, 
                            yang berfungsi sebagai modal bagi koperasi. Di sisi lain, koperasi juga memberikan fasilitas pinjaman kepada 
                            anggota yang membutuhkan dana untuk keperluan tertentu, seperti usaha, pendidikan, atau kebutuhan mendesak. Proses pinjaman lebih
                             mudah dan cepat dibandingkan dengan lembaga keuangan lainnya, dengan bunga yang lebih rendah dan syarat yang lebih ringan, sehingga 
                             mendukung kesejahteraan ekonomi anggota. Prinsip utama dari simpan pinjam dalam koperasi adalah saling membantu dan 
                             memberdayakan anggota, sehingga mendorong pertumbuhan ekonomi komunitas secara keseluruhan.
                            </p>
                        </div>
                    </div> 
        </div>
        <F/>
        </>
    )
}

export default Produk
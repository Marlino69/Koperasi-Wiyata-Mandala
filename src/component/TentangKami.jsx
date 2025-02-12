import H from "./H&F/Header"
import F from "./H&F/Footer"
import No1 from "./Foto/Foto_ttgkami/No1.png"
import No2 from "./Foto/Foto_ttgkami/No2.png"
import No3 from "./Foto/Foto_ttgkami/No3.png"
import No4 from "./Foto/Foto_ttgkami/No4.jpeg"

function TentangKami() {
    return (
        <>
        <H/>
        <div className="justify-items-stretch bg-auto h-[500px] pt-[40px] place-content-center"
        style={{ backgroundImage: `url(${No1})` }}>
            <div className="bg-white opacity-[80%] rounded-[24px] mx-14 p-[20px]">
                <div className="text-[32px] font-bold mb-[10px] text-center">Tentang Kami</div>
                <h1 className="mb-6 font-normal">
                Koperasi Konsumen KPRI Wiyata Mandala, atau <span className="font-medium">KPRI Wiyata Mandala</span>, didirikan pada tahun 1997. 
                Koperasi ini bergerak di berbagai bidang, termasuk simpan pinjam, Tabungan Koperasi (Takop), UKM Mart, dan lain-lain. 
                KPRI Wiyata Mandala merupakan koperasi pegawai Republik Indonesia yang beranggotakan pegawai negeri, 
                khususnya para guru sekolah dasar (SD), sekolah menengah pertama (SMP), sekolah menengah atas (SMA), 
                dan madrasah aliyah negeri (MAN) di Kecamatan Kronjo Mekar Baru. Kegiatan utama koperasi ini adalah 
                menyediakan layanan simpan pinjam bagi para anggotanya.
                </h1>
                <h1 className="font-normal">
                Koperasi Pegawai Republik Indonesia (KPRI) didirikan dengan tujuan mempermudah pegawai negeri, 
                terutama para guru, dalam mengakses pinjaman. Untuk meningkatkan layanan peminjaman bagi anggotanya, 
                Koperasi Konsumen KPRI Wiyata Mandala perlu melakukan peningkatan pelayanan yang lebih baik. 
                Saat ini, koperasi memiliki sekitar 315 anggota, dengan jumlah yang terus bertambah. 
                Proses pengajuan pinjaman masih dilakukan secara manual, di mana anggota harus datang langsung ke koperasi 
                dan mengisi surat permohonan yang disediakan oleh Unit Simpan Pinjam.
                </h1>
            </div>
        </div>

        <div className="mt-auto bg-center bg-no-repeat bg-cover h-fit">
                        <span className="grid grid-cols-2">
                            <div className="grid justify-start">
                              <h1 className="ml-32 mt-10 text-4xl font-bold text-left">Tujuan Koperasi Wiyata Mandala</h1>
                              <ul className="ml-32 text-lg text-justify w-fit list-decimal ">
                                  <li>Meningkatnya kualitas tata kelola organisasi dengan mensinergikan fungsi perencanaan, 
                                  pelaksanaan, dan pengawasan melalui pemanfaatan kelengkapan organisasi, SDM, sarana prasarana, 
                                  dan anggaran.</li>
                                  <li>Meningkatkan kualitas usaha koperasi dengan memaksimalkan usaha simpan pinjam, penyedia barang dan jasa, 
                                  serta usaha lainnya.</li>
                                  <li>Tumbuh kembangnya kepercayaan anggota melalui pengelola koperasi yang profesional dan akuntabel.</li>
                                  <li>Meningkatkan kualitas pelayanan anggota dengan memberikan layanan yang prima.</li>
                                  <li>Meningkatkan kualitas kesejahteraan anggota melalui pemenuhan kebutuhan anggota yang adil dan proporsional.</li>
                              </ul>
                            </div>
                            <img src={No2} className="grid justify-end w-[600px] h-[350px] my-10 ml-[50px] shadow-lg rounded-2xl"/>
                        </span>
                    </div>
        

        <div className="grid grid-cols-1 justify-items-stretch bg-cover w-auto h-screen mt-[10px]"
        style={{ backgroundImage: `url(${No3})` }}>
          <div className="bg-gray-100 opacity-[80%] w-[1000px] h-fit rounded-[24px] mx-auto mt-5 p-9 border-2 border-black">
            <div className="text-[32px] font-bold mb-[10px] text-center">Visi</div>
            <p className="text-justify leading-relaxed text-[20px] mt-auto">
              Terwujudnya Koperasi Konsumen <span className="font-medium">KPRI Wiyata Mandala </span>yang mandiri dan tangguh dengan berlandaskan 
              asas kekeluargaan demi membangun ekonomi bersama untuk meningkatkan kesejahteraan anggota.
            </p>
          </div>
          <div className="bg-gray-100 text-[20px] opacity-[80%] w-[1000px] h-fit rounded-[24px] mx-auto p-5 border-2 border-black">
            <div className="text-[32px] font-bold mb-[10px] text-center">Misi</div>
            <ol className="list-decimal pl-[20px] space-y-[10px] text-justify leading-relaxed">
              <li>
                Meningkatkan seluruh potensi yang ada dalam masyarakat khususnya anggota Koperasi Konsumen 
                <span className="font-medium"> KPRI Wiyata Mandala</span> agar mereka dapat bersama-sama bersatu padu dan beritikad baik 
                dalam membangun ekonomi kerakyatan secara gotong royong dalam bentuk koperasi.
              </li>
              <li>
                Membantu anggota dalam rangka meningkatkan kelancaran usaha dan kesejahteraan mereka serta keluarga.
              </li>
              <li>
                Turut membantu pembangunan ekonomi dan menunjang pelaksanaan kegiatan usaha kecil 
                menengah yang diprakarsai oleh anggota.
              </li>
              <li>
                Mendorong anggota untuk ikut berpartisipasi dalam pemupukan modal melalui program 
                simpanan sukarela dan simpanan berjangka.
              </li>
              <li>
                Memberikan pelayanan prima dengan prosedur yang mudah, cepat, serta pinjaman yang 
                dikenakan jasa yang seimbang kepada para anggota.
              </li>
            </ol>
          </div>
        </div>
    <F/>
    </>
  )
}

export default TentangKami
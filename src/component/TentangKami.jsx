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
        <div className="justify-items-stretch bg-cover h-[600px] mt-[10px] pt-[40px] mx-12"
        style={{ backgroundImage: `url(${No1})` }}>
            <div className="bg-gradient-to-b from-[#d5dbdb] to-[#95a5a6 ] opacity-[90%] rounded-[24px] justify-self-end mx-14 my-[110px] p-[20px]">
                <div className="text-[32px] font-bold mb-[10px] text-center">Tentang Kami</div>
                <h1 className="mb-6">
                    Koperasi Konsumen KPRI "Wiyata Mandala" atau disebut dengan KPRI Wiyata Mandala
                    didirikan pada tahun 1997. Koperasi Konsumen KPRI "Wiyata Mandala" merupakan
                    koperasi yang bergerak di bidang simpan pinjam, Tabungan Koperasi "Takop", UKM
                    Mart, dan lain-lain. Koperasi Pegawal Republik Indonesia "KPRI" yang beranggotakan pegawai Negeri
                    khususnya guru sekolah dasar SD, guru SMP , Guru SMU Guru MAN yang ada di kecamatan
                    Kronjo Mekar baru koperasi Konsumen KPRI "Wiyata Mandala " mempunyai kegiatan utama
                    yakni menyediakan penyimpanan dan pinjaman bagi para anggotanya. 
                </h1>
                <h1>
                    Koperasi Pegawai Republik Indonesia "KPRI"
                    didirikan dengan tujuan untuk mempermudah pegawai negeri terkhususnya guru dalam
                    melakukan peminjaman. Untuk meningkatkan pelayanan pada anggota koperasi di bidang
                    peminjaman maka Koperasi Konsumen KPRI" Wiyata Mandala" perlu peningkatan pelayanan
                    yang memadai. Dengan jumlah anggota Kurang lebih 315 orang yang terus bertambah,
                    anggota tersebut melakukan proses pengajuan pinjaman yang masih dilakukan dengan cara
                    anggota harus datang ke koperasi dan mengisi surat permohonan pengajuan pinjaman yang
                    telah diberikan olch Unit Simpan Pinjam.
                </h1>
            </div>
        </div>

        <div className="mt-[10px]  bg-center bg-no-repeat bg-cover h-[480px]">
                        <span className="grid grid-cols-2">
                            <div className="grid justify-start grid-rows-2">
                                <h1 className="ml-[100px] mt-[80px] text-4xl font-bold ">Tujuan Koperasi Wiyata Mandala</h1>
                                <h2 className="ml-[100px] mt-[-80px] text-lg text-justify w-[600px]">
                                    1. Meningkatnya kualitas tata kelola organisasi dengan mensinergikan fungsi perencanaan, 
                                    pelaksanaan, dan pengawasan melalui pemanfaatan kelengkapan organisasi, SDM, sarana prasarana, 
                                    dan anggaran.<br/>
                                    2. Meningkatkan kualitas usaha koperasi dengan memaksimalkan usaha simpan pinjam, penyedia barang dan jasa, 
                                    serta usaha lainnya.<br/>
                                    3. Tumbuh kembangnya kepercayaan anggota melalui pengelola koperasi yang profesional dan akuntabel.<br/>
                                    4. Meningkatkan kualitas pelayanan anggota dengan memberikan layanan yang prima.<br/>
                                    5. Meningkatkan kualitas kesejahteraan anggota melalui pemenuhan kebutuhan anggota yang adil dan proporsional.
                                </h2>
                                
                            </div>
                            <img src={No2} className="grid justify-end w-[600px] h-[300px] mt-[110px] ml-[50px] shadow-lg rounded-2xl"/>
                        </span>
                    </div>
        

        <div className="grid grid-cols-2 justify-items-stretch bg-cover w-full h-[750px] mt-[10px]"
        style={{ backgroundImage: `url(${No3})` }}>
  <div className="bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] w-[600px] rounded-[24px] justify-self-end mr-[100px] my-[50px] p-[20px]">
    <div className="text-[32px] font-bold mb-[10px] text-center">Visi</div>
    <p className="text-justify leading-relaxed text-[20px] mt-[200px]">
      Terwujudnya KOPERASI KONSUMEN KPRI "WIYATA MANDALA" yang mandiri dan tangguh dengan berlandaskan 
      asas kekeluargaan demi membangun ekonomi bersama untuk meningkatkan kesejahteraan anggota.
    </p>
  </div>
  <div className="bg-gradient-to-b text-[20px] from-[#4AA1B4] to-[#57C1A0] opacity-[90%] w-[600px] rounded-[24px] ml-[100px] my-[50px] p-[20px]">
    <div className="text-[32px] font-bold mb-[10px] text-center">Misi</div>
    <ol className="list-decimal pl-[20px] space-y-[10px] text-justify leading-relaxed">
      <li>
        Meningkatkan seluruh potensi yang ada dalam masyarakat khususnya anggota KOPERASI KONSUMEN 
        KPRI "WIYATA MANDALA" agar mereka dapat bersama-sama bersatu padu dan beritikad baik 
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

        <div className="mt-4">
            <img src={No4} className="rounded-xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto grid justify-self-center transition-transform duration-300 hover:scale-105" alt="Koperasi Wiyata Mandala"
            />
            <div className="text-justify text-base bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] rounded-xl w-4/5 mx-auto p-8 mt-[-100px] grid justify-center">
                <p className="mb-4 mt-[100px] max-w-4xl w-full">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe vel voluptatum 
                    vitae dolorum similique molestias tempora dicta ducimus, sit ea autem laudantium 
                    ullam, repellendus inventore doloremque! Ut veritatis modi aut illum nostrum, maxime 
                    distinctio voluptatibus eligendi, possimus dolor nemo tenetur magni, accusamus atque. 
                    Deserunt possimus quod architecto tempora, deleniti totam.
                </p>
                <p className="max-w-4xl w-full">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro alias sapiente
                    eveniet soluta, quos quas doloribus! Quia assumenda eum exercitationem id autem
                    eligendi pariatur, deserunt sunt nostrum rem suscipit aliquid vitae recusandae,
                    labore est unde, a dolores? Nihil quidem optio ab minima assumenda aliquam dolore
                    voluptatibus ut voluptas porro fugit aspernatur, praesentium labore consequatur?
                    Ex, vel esse, sapiente dicta necessitatibus tempore repellendus itaque eum amet,
                    iure reiciendis voluptas accusamus. Minus quod aperiam id tenetur modi nesciunt
                    rem dolorum eligendi dignissimos.
                </p>
            </div>
        </div>
        <F/>



        </>
    )
}

export default TentangKami
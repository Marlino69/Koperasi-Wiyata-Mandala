import foto from '../Foto/Koperasi_Logo.png'

function Footer(){
    return(
        <>
            <footer className="bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] mt-[10px] ">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <img src={foto} className="h-[80px]" alt="Flowbite Logo" />
                            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Koperasi Simpan Pinjam</span>
                        </a>
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0">
                            <li>
                                <a href="/TentangKami" className="hover:underline me-4 md:me-6">Tentang Kami</a>
                            </li>
                            <li>
                                <a href="/Produk" className="hover:underline me-4 md:me-6">Produk</a>
                            </li>
                            <li>
                                <a href="/HubungiKami" className="hover:underline me-4 md:me-6">Hubungi Kami</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span className="block text-sm text-white sm:text-center">© 2024 <a href="https://flowbite.com/" class="hover:underline mr-[5px]">Ketoprak Developer</a>Universitas Multimedia Nusantara</span>
                </div>
            </footer>
        </>
    )
}

export default Footer
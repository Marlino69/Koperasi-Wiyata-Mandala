import H from "../H&F/Header"
import F from "../H&F/Footer"
import Sidebar from  "./SideBar"
import{PencilSquareIcon, TrashIcon, PlusCircleIcon} from '@heroicons/react/20/solid'
import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { formatDate } from "../../utils/utils";

export default function ListBerita(){

    const navigate = useNavigate();

    const [data, setData]=useState([]);
    const [countBerita, setCountBerita]=useState(0);
    const [countBeritaLimit, setCountBeritaLimit]=useState(5);
    const [isShowError, setIsShowError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [toBeDeletedBerita, setToBeDeletedBerita] = useState(null);
    const [error, setError] = useState('');
    
    useEffect(() => {
        initBerita();
    },[toBeDeletedBerita])

    const initBerita = async () => {
        try {
            const response = await axios.get("http://localhost:5000/admin/getberita");
            console.log("Fetched berita:", response.data);
            setData(response.data.body);
            setCountBerita(response.data.totalCount);
        }catch (error) {    
            console.log(error);
        }
    };

    const deleteBerita = async () => {
        const uuidTrBerita = toBeDeletedBerita.UUID_BERITA;
        try {
            await axios.delete(`http://localhost:5000/admin/deleteberita/${uuidTrBerita}`);
            setShowModal(false); 
            setToBeDeletedBerita(null);
        } catch (err) {
            setError(err.message);
            setIsShowError(true);
        }
    };

    const getImageSrc = (lob) => {
        if (!lob || lob === '') {
            return 'https://i.pinimg.com/736x/ea/f9/66/eaf966d05a3fa1ccf3669b6153b98528.jpg';
        }
    
        if (typeof lob === "string" && lob.startsWith("data:image/")) {
            return lob;
        }
    
        if (lob.startsWith("/9j/")) {
            return `data:image/jpeg;base64,${lob}`;
        } else if (lob.startsWith("iVBORw0KGgo")) {
            return `data:image/png;base64,${lob}`;
        }
    
        return 'https://i.pinimg.com/736x/ea/f9/66/eaf966d05a3fa1ccf3669b6153b98528.jpg';
    };

    const handleAddBerita = async () => {
        if(countBerita >= countBeritaLimit){
            setIsShowError(true);
            setError('Jumlah berita sudah mencapai batas maksimal');
            return;
        }
        navigate('/createberita')
    }

    const handleEditBerita = (id, judul, konten, image) => {
        navigate(`/updateberita`, {
            state: {
                id,
                judul,
                konten,
                image
            }
        });
    };

    return (
        <div>
            <H />
            <div className="flex flex-grow">
                <Sidebar />
                <div className="flex-col w-full px-[100px]">
                    <span className="mt-2 py-3 text-[25px] rounded-tl-lg rounded-tr-lg shadow-[0px_0px_5px_rgba(0,0,0,0.3)] justify-between items-center bg-gradient-to-b p-1 from-[#4AA1B4] to-[#57C1A0] flex px-2 pt-2 item-center text-[#ffffff] font-bold">
                        <span className="flex-1 text-center">List Berita {countBerita}/{countBeritaLimit}</span>
                        <div className="py-1 flex-row items-center">
                            <button 
                                className="flex items-center"
                                onClick={handleAddBerita}
                            >
                                <PlusCircleIcon className="w-8 h-8 ml-2"/>
                                <span className="text-[15px]">Tambah Berita</span>
                            </button>
                        </div>
                    </span>
                    <div className="overflow-y-auto space-y-3 flex-col h-dvh flex-1 bg-gray-100 pt-5 px-[35px] group relative shadow-[0px_0px_5px_rgba(0,0,0,0.3)]">
                        {data.map((item)=>(
                            <div key={item.UUID_BERITA}
                                className="relative flex items-center w-full h-[200px] rounded-lg shadow-sm bg-[#4ea899] p-2 border border-transparent hover:border-4
                                    transition-all transform hover:border-[#2ab0fd] hover:scale-105 hover:bg-[#7cd8bc] hover:shadow-lg 
                                    duration-300 ease-in-out">
                                <img
                                    src={getImageSrc(item.trLobBerita?.[0]?.LOB)}
                                    alt={item.JUDUL_BERITA}
                                    className="w-[300px] h-full rounded-sm bg-gradient-to-r from-green-400 to-transparent"
                                />
                                <div className="h-full bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] w-full flex flex-col justify-start pt-2 px-[35px] text-white flex-1">
                                    <span className="text-[30px] text-shadow">
                                        {item.JUDUL_BERITA}
                                    </span>
                                    <span className="text-[15px] text-shadow -mt-2">
                                        {formatDate(item.createdAt)}
                                    </span>
                                    <span className="text-[20px] text-shadow mt-2">
                                        {item.ISI_BERITA}
                                    </span>
                                </div>
                                <div className="flex flex-col h-full bg-opacity-45 bg-[#ddebe6] p-3 rounded-tr-lg rounded-br-lg">
                                    <PencilSquareIcon 
                                        onClick={() => {
                                            handleEditBerita(
                                                item.UUID_BERITA,
                                                item.JUDUL_BERITA,
                                                item.ISI_BERITA,
                                                getImageSrc(item.trLobBerita?.[0]?.LOB)
                                            );
                                        }}
                                        className="text-white flex-1 w-[40px] h-[40px] cursor-pointer"
                                    />
                                     <TrashIcon 
                                        onClick={() => {
                                            setToBeDeletedBerita(item);
                                            setShowModal(true)
                                        }}
                                        className="text-white flex-1 w-[40px] h-[40px] cursor-pointer"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* ERROR MESSAGE LIM BERITA */}
                {isShowError && (
                    <div 
                        onClick={() => setIsShowError(false)}
                        className="fixed bottom-5 right-5 bg-red-500 text-white p-4 rounded-md text-lg font-bold opacity-100 pointer-events-auto transition-opacity duration-300">
                        {error}
                    </div>
                )}

                {/* DELETE CONFIRM MODAL */}
                {showModal && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/3 md:w-1/4 lg:w-1/3">
                            <h3 className="text-lg font-semibold">Konfirmasi Penghapusan</h3>
                            <p className="mt-4">Apakah Anda yakin ingin menghapus berita ini?</p>
                            <div className="flex flex-col sm:flex-row sm:justify-between mt-6">
                                <button
                                    onClick={deleteBerita}
                                    className="bg-teal-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 sm:mr-2"
                                >
                                    Konfirmasi
                                </button>
                                <button
                                    onClick={()=>setShowModal(false)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded sm:ml-2"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <F/>
        </div>
    )
}
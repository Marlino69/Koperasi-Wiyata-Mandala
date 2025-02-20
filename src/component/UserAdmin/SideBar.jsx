import { PencilIcon, UserIcon, Cog8ToothIcon } from '@heroicons/react/24/solid';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation(); 

  return (
    <div className="w-64 bg-gray-50 flex flex-col justify-start p-4 text-black shadow-[0.5px_0px_5px_rgba(0,0,0,0.3)]">
      <h2 className="text-2xl font-bold mt-3 ml-3 text-start">Pengaturan</h2>
      <ul className="mt-5 text-[17px]">
        <li
          className={`mb-4 flex items-center transition-all duration-400 p-2 rounded ${
            location.pathname === '/newsmanagement'
              ? 'bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] text-white shadow-lg'
              : 'hover:cursor-pointer hover:text-white hover:bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0]'
          }`}
        >
          <Link to="/newsmanagement" className="flex items-center">
            <PencilIcon className="w-7 h-7 mr-2" />
            Manajemen Berita
          </Link>
        </li>
        <li
          className={`mb-4 flex items-center transition-all duration-400 p-2 rounded ${
            location.pathname === '/accountmanagement'
              ? 'bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] text-white shadow-lg'
              : 'hover:cursor-pointer hover:text-white hover:bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0]'
          }`}
        >
          <Link to="/accountmanagement" className="flex items-center">
            <UserIcon className="w-7 h-7 mr-2" />
            Manajemen Akun
          </Link>
        </li>
        <li
          className={`mb-4 flex items-center transition-all duration-400 p-2 rounded ${
            location.pathname === '/generalsettings'
              ? 'bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] text-white shadow-lg'
              : 'hover:cursor-pointer hover:text-white hover:bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0]'
          }`}
        >
          <Link to="/generalsettings" className="flex items-center">
            <Cog8ToothIcon className="w-7 h-7 mr-2" />
            Konfigurasi Aplikasi
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
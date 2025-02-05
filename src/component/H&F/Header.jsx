import { PersonIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { Link, useLocation, NavLink } from "react-router-dom";
import foto from '../Foto/Koperasi_Logo.png';
import React, { useState, useEffect, useNavigate } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
function Header() {


    const role = localStorage.getItem('UUID_MS_JOB');


    const location = useLocation(); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        console.log(token)
        if (token) {
            setIsLoggedIn(true);  // Menandakan pengguna sudah login
        } else {
            setIsLoggedIn(false); // Pengguna belum login
        }
    }, []);

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen); // Toggle state dropdown
  };

    useEffect(() => {
        const  dropdownToggle = document.getElementById('dropdownToggle');
        const dropdownMenu = document.getElementById('dropdownMenu');
        
        function handleClick() {
            if (dropdownMenu.className.includes('block')) {
                dropdownMenu.classList.add('hidden')
                dropdownMenu.classList.remove('block')
            } else {
                dropdownMenu.classList.add('block')
                dropdownMenu.classList.remove('hidden')
            }
        }

        if (dropdownToggle){
            dropdownToggle.addEventListener('click', handleClick);
        }

        return () => {
            if (dropdownToggle) dropdownToggle.removeEventListener('click', handleClick);
        }
    })
    
    
    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications);
    };

    const handleCloseNotifications = () => {
        setShowNotifications(false);
    };
    // ----------------------------------------- 

    useEffect(() => {
        const toggleOpen = document.getElementById('toggleOpen');
        const toggleClose = document.getElementById('toggleClose');
        const collapseMenu = document.getElementById('collapseMenu');
    
        function handleClick() {
          if (collapseMenu.style.display === 'block') {
            collapseMenu.style.display = 'none';
          } else {
            collapseMenu.style.display = 'block';
          }
        }
    
        if (toggleOpen && toggleClose) {
          toggleOpen.addEventListener('click', handleClick);
          toggleClose.addEventListener('click', handleClick);
        }
    
        // Cleanup listeners on unmount
        return () => {
          if (toggleOpen) toggleOpen.removeEventListener('click', handleClick);
          if (toggleClose) toggleClose.removeEventListener('click', handleClick);
        };
      }, []);

      //---------------------------------------------
      useEffect(() => {
        const  dropdownToggleNotif = document.getElementById('dropdownToggleNotif');
        const dropdownMenuNotif = document.getElementById('dropdownMenuNotif');
        
        function handleClick() {
            if (dropdownMenuNotif.className.includes('block')) {
                dropdownMenuNotif.classList.add('hidden')
                dropdownMenuNotif.classList.remove('block')
            } else {
                dropdownMenuNotif.classList.add('block')
                dropdownMenuNotif.classList.remove('hidden')
            }
        }

        if (dropdownToggleNotif){
            dropdownToggleNotif.addEventListener('click', handleClick);
        }

        return () => {
            if (dropdownToggleNotif) dropdownToggleNotif.removeEventListener('click', handleClick);
        }
    })

    return (
        <>
            <header className='flex shadow-md py-4 px-4 sm:px-10 bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] font-[sans-serif] min-h-[70px] tracking-wide relative z-50'>
      <div class='flex flex-wrap items-center justify-between gap-5 w-full'>
        <Link to= "/" href="javascript:void(0)">
          <img src={foto} alt="logo" class='w-22' />
        </Link>

        <div 
        id="collapseMenu"
          className='max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50'>
          <button id="toggleClose" className='lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border'>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 fill-black" viewBox="0 0 320.591 320.591">
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"></path>
            </svg>
          </button>

          <ul
            class='lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
            <li class='mb-6 hidden max-lg:block'>
              <a><img src={foto} alt="logo" class='w-24' />
              </a>
            </li>
            <li className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'>
              <NavLink 
                to='/' 
                className={({ isActive }) => 
                  isActive
                    ? 'border-b-4 text-white block font-semibold text-[15px] px-3 py-2 rounded-md'
                    : 'hover:bg-white hover:text-gray-800 block font-semibold text-[15px] px-3 py-2 rounded-md transition duration-300'
                }
              >
                Beranda
              </NavLink>
            </li>
            <li className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'>
            <NavLink
  to='/TentangKami'
  className={({ isActive }) =>
    isActive
      ? 'border-b-4 text-white block font-semibold text-[15px] px-3 py-2 rounded-md'
      : 'hover:bg-white hover:text-gray-800 block font-semibold text-[15px] px-3 py-2 rounded-md transition duration-300'
  }
>
  Tentang Kami
</NavLink>

            </li>
            <li className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'>
              <NavLink 
                to='/Produk' 
                className={({ isActive }) => 
                  isActive  ? 'border-b-4 text-white block font-semibold text-[15px] px-3 py-2 rounded-md'
                            : 'hover:bg-white hover:text-gray-800 block font-semibold text-[15px] px-3 py-2 rounded-md transition duration-300'
                }
              >
                Produk
              </NavLink>
            </li>
            <li className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'>
              <NavLink 
                to='/HubungiKami' 
                className={({ isActive }) => 
                  isActive  ? 'border-b-4 text-white block font-semibold text-[15px] px-3 py-2 rounded-md'
                            : 'hover:bg-white hover:text-gray-800 block font-semibold text-[15px] px-3 py-2 rounded-md transition duration-300'
                }
              >
                Hubungi Kami
              </NavLink>
            </li>

            {(role === "1" || role === "2" || role === "3") && isLoggedIn && (
                <NavLink
                to='/HalamanAwalSimpanPinjam'
                className={({ isActive }) =>
                  isActive
                    ? 'border-b-4 text-white block font-semibold text-[15px] px-3 py-2 rounded-md'
                    : 'hover:bg-white hover:text-gray-800 block font-semibold text-[15px] px-3 py-2 rounded-md transition duration-300'
                }
              >
                Simpan Pinjam
              </NavLink>
            )}
            {(role === "2" || role === "3") && isLoggedIn && (
  <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
    <div className="relative font-[sans-serif] w-max mx-auto">
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center text-gray-800 font-semibold outline-none text-[15px] hover:bg-white hover:text-gray-800 px-3 py-2 rounded-md transition duration-300"
      >
        Pengurus
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3 fill-gray-800 inline ml-3"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isDropdownOpen && (
        <ul className="absolute shadow-lg bg-white py-2 z-[1000] min-w-full w-max rounded-lg max-h-96 overflow-auto">
          <li className="whitespace-nowrap">
            <Link to="/ListUser" className="block px-4 py-2 hover:bg-gray-200 rounded transition">
              Daftar User Anggota
            </Link>
          </li>
          <li className="whitespace-nowrap">
            <Link to="/PengurusApprove" className="block px-4 py-2 hover:bg-gray-200 rounded transition">
              Daftar Approve User
            </Link>
          </li>
          <li className="whitespace-nowrap">
            <Link to="/LaporanKeuangan" className="block px-4 py-2 hover:bg-gray-200 rounded transition">
              Laporan Keuangan
            </Link>
          </li>
          <li className="whitespace-nowrap">
            <Link to="/BeritaMenu" className="block px-4 py-2 hover:bg-gray-200 rounded transition">
              Menu Berita
            </Link>
          </li>
        </ul>
      )}
    </div>
  </li>
)}

            
        
            
          </ul>
        </div>

        

        <div class='flex max-lg:ml-auto space-x-3'>
        {isLoggedIn ? (
            <Link to="/Profile" className="inline-block">
                {/* <button 
                type="button"
                id="dropdownToggleNotif">
                    <EnvelopeClosedIcon style={{ width: '25px', height: '35px' }} />
                    <ul id="dropdownMenuNotif" class='absolute block shadow-lg bg-white py-2 z-[1000] min-w-full w-max rounded-lg max-h-96 overflow-auto'>
                       <li className="whitespace-nowrap">
                                        <Link to="/ListUser" className="block px-4 py-2 hover:bg-gray-200">Daftar User Anggota</Link>
                                    </li>
                                    <li className="whitespace-nowrap">
                                        <Link to="/PengurusApprove" className="block px-4 py-2 hover:bg-gray-200">Daftar Approve User</Link>
                                    </li>
                                    <li className="whitespace-nowrap">
                                        <Link to="/LaporanKeuangan" className="block px-4 py-2 hover:bg-gray-200">Laporan Keuangan</Link>
                                    </li>
                                    <li className="whitespace-nowrap">
                                        <Link to="/BeritaMenu" className="block px-4 py-2 hover:bg-gray-200">Menu Berita</Link>
                                    </li>
                    </ul>
                </button> */}
                <button>
                    <PersonIcon className=" ml-[20px]" style={{ width: '30px', height: '40px' }} />
                </button>
            </Link>
            
        ) : (
            <button
              className='px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]'
            >
              <Link to="/Login">
                <PersonIcon className="inline-block align-middle mr-2 mb-[4px]" /> 
                Masuk
              </Link>
            </button>
            )
        }

          <button id="toggleOpen" class='lg:hidden'>
            <svg class="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>

        </>
    );
}

export default Header; 

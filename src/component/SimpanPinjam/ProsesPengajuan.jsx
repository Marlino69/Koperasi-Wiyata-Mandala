import React, { useEffect, useState } from 'react';
import H from '../H&F/Header';
import F from '../H&F/Footer';
import foto from '../Foto/Koperasi_Logo.png';
import { 
  Link, 
  useNavigate,
  useParams
} from "react-router-dom";
import axios from 'axios';
import { 
  formatRupiah,
  formatDate,
  getCurrentLoggedInData,
  countAngsuran,
  deformatRupiah,
  sumDate
} from '../../utils/utils';
import {
  BackButton
} from '../../utils/components'
import { 
  Back_icon,
  Done_icon,
  Time_icon,
  X_icon
} from '../../assets/icons';

const ProfileInfomation = ({data}) => {
  const profileFields = [
    { label: 'Tanggal Bergabung', value: data.tnglbergabung },
    { label: 'Unit Kerja', value: "Sekolah" },
    { label: 'Nomor Anggota', value: "A175238" },
    { label: 'Nomor Telepon', value: data.notelp },
    { label: 'Total Tabungan', value: data.totalTabungan || '0' }, // Default to 'N/A' if missing
  ];

  return (
    <div className='py-4 px-4 flex flex-col w-full h-full text-left items-center'>
      <div className='bg-gray-300 w-[100px] h-[100px] rounded-full my-4' />
      <p className='text-center text-[20px] whitespace-nowrap w-[300px]'>{data.nama}</p>
      <div className='bg-black w-full h-[1px] my-2' />

      {/* Using Grid Layout for labels and values */}
      <div className='grid grid-cols-1'>
        {profileFields.map((field, index) => (
          <div key={index} className="flex justify-start space-x-2 my-1">
            {/* Label with consistent width */}
            <p className='min-w-[140px]'>{field.label}</p>
            <p>: {field.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const PengajuanInformation = ({data}) => {
  const angsuran = "Rp " + formatRupiah(countAngsuran(
                                    deformatRupiah(String(data.nominal)),
                                    data.bunga,
                                    data.tenor
                                  ))
  const profileFields = [
    { label: 'Nominal Pengajuan', value: "Rp "+ formatRupiah(String(data.nominal)) },
    { label: 'Tipe Pengajuan', value: data.tipe },
    { label: 'Tanggal Diajukan', value: data.tanggal},
  ];

  if(data.pengajuan == "PINJAMAN") {
    profileFields.push(
      { label: 'Tenor (Bulan)', value: data.tenor },
      { label: `Angsuran (${data.bunga}%)`, value: angsuran},
      { label: 'Keperluan Pengajuan', value: data.alasan },
    )
  }

  if (data.status_code == "APPROVED" && data.pengajuan == "PINJAMAN") {
    profileFields.push(
      { label: 'Aktif Sejak', value: formatDate(data.DTM_APPROVED) },
      { label: 'Aktif Hingga', value: sumDate(data.DTM_APPROVED, data.tenor) }
    )
  } else if(data.status_code == "APPROVED" && data.pengajuan == "SIMPANAN") {
    profileFields.push(
      { label: 'Tanggal Disetujui', value: formatDate(data.DTM_APPROVED) },
    )
  }

  return (
    <div>
      <div className='py-4 px-4 flex flex-col w-full h-auto items-center'>
        <p className='text-[20px]'>Data Pengajuan</p>
        <div className='bg-black w-[400px] h-[1px] my-2' />
      </div>

      <div className='grid grid-cols-1'>
        {profileFields.map((field, index) => (
          <div key={index} className="flex justify-start space-x-2 my-1 px-4 text-lg">
            {/* Label with consistent width */}
            <p className='min-w-[180px]'>{field.label}</p>
            <p>: {field.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const handleChangeStatus = async (id, pengajuan, newStatus, userData) => {
  if(userData?.UUID_MS_USER && userData?.MS_JOB.JOB_CODE == "PENGURUS" || newStatus=="ABORTED"){
    try {
      await axios.patch("http://localhost:5000/updateStatusPengajuan", {
        "PENGAJUAN": pengajuan,
        "id": id,
        "status": newStatus
      })
      window.location.reload();
    } catch (error) {
      console.log("error found: ", error);
    }
  }
}

const PengajuanButton = ({ id, status, pengajuan, userId }) => {
  const userData = getCurrentLoggedInData();
  if(userData?.UUID_MS_USER) {
    if (status == 'ACTIVE' && userData?.MS_JOB.JOB_CODE == "PENGURUS") {
      return (
        <div className='items-center grid grid-cols-[1fr_1fr_1fr] gap-4 mx-4'>
          <button 
          className="bg-green-500 text-white 
          px-6 py-2 rounded flex-grow mr-1 w-full shadow-xl
          hover:shadow-sm hover:bg-green-400 transition-all duration-300"
          onClick={() => handleChangeStatus(id, pengajuan, 'APPROVED', userData)}
          >
            SETUJU
          </button>
    
          <button 
          className="bg-red-500 text-white 
          px-6 py-2 rounded flex-grow mr-1 w-full shadow-xl
          hover:shadow-sm hover:bg-red-400 transition-all duration-300"
          onClick={() => handleChangeStatus(id, pengajuan, 'DECLINED', userData)}
          >
            TOLAK
          </button>
        </div>
      )
    } else if (status=='ACTIVE' && userData?.UUID_MS_USER == userId) {
      return (
        <div className='items-center grid grid-cols-[1fr_1fr_1fr] gap-4 mx-4'>
          <div className='w-full' />
    
          <div className='w-full' />
    
          <button 
          className="bg-red-500 text-white 
          px-6 py-2 rounded flex-grow mr-1 w-full shadow-xl
          hover:shadow-sm hover:bg-red-400 transition-all duration-300"
          onClick={() => handleChangeStatus(id, pengajuan, 'ABORTED', userData)}
          >
            BATAL
          </button>
        </div>
      )
          
    }
  }
}

const Information = ({ userData }) => {
  const { id, pengajuan } = useParams();
  const [data, setData] = useState({})
  const [showPinModal, setShowPinModal] = useState(false);
  const [showCetakModal, setShowCetakModal] = useState(false);
  const [pinInput, setPinInput] = useState('');

  useEffect(() => {
    const fetchDataPengajuan = async () => {
      try {
        const response = await axios.post(`http://localhost:5000/getPengajuan`, {
          PENGAJUAN: pengajuan,
          UUID_MS_TYPE: "", 
          UUID_MS_USER: "", 
          UUID_MS_STATUS: "",
          UUID_PENGAJUAN_PINJAMAN: (pengajuan=="PINJAMAN"? id : ""),
          UUID_PENGAJUAN_SIMPANAN: (pengajuan=="SIMPANAN"? id : "")
        });
        if(userData.UUID_MS_USER != response.data[0].user.UUID_MS_USER && userData.MS_JOB.JOB_CODE != "PENGURUS") {
          return
        }

        const obj = response.data[0]
        const formattedData = {
          id: obj.UUID_PENGAJUAN_PINJAMAN || obj.UUID_PENGAJUAN_SIMPANAN,
          pengajuan: pengajuan,
          DTM_APPROVED: obj.DTM_APPROVED,

          nama: obj.user.NAMA_LENGKAP,
          alamat: obj.user.ALAMAT,
          tnglbergabung: formatDate(obj.user.createdAt),
          notelp: obj.user.NOMOR_TELP,
          unitkerja: obj.user.UNIT_KERJA,
          noanggota: obj.user.NOMOR_ANGGOTA,

          nominal: obj.NOMINAL,
          tanggal: formatDate(obj.createdAt),
          tipe: obj.type.TYPE_NAME,
          tenor: obj.TENOR,
          bunga: obj.INTEREST_RATE,
          status_code: obj.status.STATUS_CODE,
          status_name: obj.status.STATUS_NAME,
          alasan: obj.REASON
        };
        setData(formattedData)
      } catch (error) {
        console.log("Error fetching data: " + error)
      }
    };
    
    fetchDataPengajuan();
  }, [id, userData])

  const Desc = ({progress}) => {
    let msg1 = '';
    let msg2 = '';
    switch(progress){
      case 'ACTIVE':
        msg1 = 'Pengajuan';
        msg2 = 'Diajukan';
        break;
      case 'WAITING':
        msg1 = 'Menunggu';
        msg2 = 'Persetujuan';
        break;
      case 'ABORTED':
        msg1 = 'Pengajuan';
        msg2 = 'Dibatalkan';
        break;
      case 'DECLINED':
        msg1 = 'Pengajuan';
        msg2 = 'Ditolak';
        break;
      case 'APPROVED':
        msg1 = 'Pengajuan';
        msg2 = 'Disetujui';
        break;
      case 'desc3':
        msg1 = 'Selesai';
        msg2 = '';
        break;
      default:
        msg1 = 'Mengambil';
        msg2 = 'Data';
        break;
    }
    return (
      <div className='absolute mt-2 top-full text-center'>
        <p>{msg1}</p>
        <p>{msg2}</p>
      </div>
    )
  }

  const Color = (progress) => {
    switch(progress){
      case 'GREEN_YELLOW_grad':
        return 'linear-gradient(to right, #38b2ac 10%, #FFB300 50%)';
      case 'GREEN_RED_grad':
        return 'linear-gradient(to right, #38b2ac 10%, #C62828 20%)';
      case 'RED':
        return '#C62828';
      case 'GREEN':
        return '#38b2ac';
      case 'YELLOW':
        return '#FFB300';
      case 'GRAY':
        return '#e2e8f0';
      default:
        return '#e2e8f0';
    }
    
  }

  const Line = ({progress}) => {
    let color = "";
    switch(progress){
      case 'WAIT':
        color = "GREEN_YELLOW_grad";
        break;
      case 'CANCEL':
        color = "GREEN_RED_grad";
        break;
      case 'DONE':
        color = 'GREEN'
        break;
      case  'BLANK':
        color = "GRAY";
        break;
      default:
        color = "GRAY";
        break;
    }
    return (
      <div 
        className='flex-1 h-2'
        style={{background: Color(color) }}
      />
    )
  }

  const Point = ({progress}) => {
    let color = "";
    let icon;
    switch(progress){
      case 'WAIT':
        color = "YELLOW";
        icon = <Time_icon />;
        break;
      case 'CANCEL':
        color = "RED";
        icon = <X_icon />;
        break;
      case 'DONE':
        color = "GREEN";
        icon = <Done_icon />;
        break;
      case 'BLANK':
        color = "GRAY";
        break;
      default:
        color = "GRAY";
        break;
    }
    return (
      <div 
      className='w-10 h-10 rounded-full flex items-center justify-center text-white'
      style={{background: Color(color)}}
      >
        {icon}
      </div>
    )
  }

  const MapLinePoint = ({status}) => {
    let point1 = 'BLANK';
    let point2 = 'BLANK';
    let point3 = 'BLANK';
    let line1 = 'BLANK';
    let line2 = 'BLANK';
    let desc1 = '';
    let desc2 = '';
    let desc3 = 'desc3';
    switch(status){
      case "ACTIVE":
        point1 = 'DONE';
        line1 = 'WAIT';
        point2 = 'WAIT';
        desc1 = 'ACTIVE';
        desc2 = 'WAITING';
        break;
        
      case 'APPROVED':
        point1 = 'DONE';
        line1 = 'DONE';
        point2 = 'DONE';
        line2 = 'DONE';
        point3 = 'DONE';
        desc1 = 'ACTIVE';
        desc2 = 'APPROVED';
        break;

      case 'DECLINED':
        point1 = 'DONE';
        line1 = 'CANCEL';
        point2 = 'CANCEL';
        desc1 = 'ACTIVE';
        desc2 = 'DECLINED';
        break;

      case 'ABORTED':
        point1 = 'CANCEL';
        desc1 = 'ABORTED';
        desc2 = 'WAITING';
        break;
    }
    return (
      <div className='w-full flex justify-between items-center'>
        <div className='relative flex flex-col items-center justify-center'>
          <Point progress={point1} />
          <Desc progress={desc1} />
        </div>

        <Line progress={line1} />

        <div className='relative flex flex-col items-center justify-center'>
          <Point progress={point2} />
          <Desc progress={desc2} />
        </div>

        <Line progress={line2} />

        <div className='relative flex flex-col items-center justify-center'>
          <Point progress={point3} />
          <Desc progress={desc3} />
        </div>
      </div>
    )
  }


  return (
    <div>
      <div 
      className='w-7/8 h-[200px] shadow-lg mx-auto rounded-lg bg-white flex items-center justify-center'
      style={{paddingLeft:"100px", paddingRight:"100px"}}>
        <MapLinePoint status={data.status_code} />
      </div>
      <div className='w-7/8 h-auto my-4 mx-auto gap-4 grid grid-cols-[1fr_3fr]'>
        <div className='bg-white shadow-lg rounded-lg w-full'>
          <ProfileInfomation data={data}/>
        </div>
        <div className='bg-white shadow-lg rounded-lg w-full'>
          <div className='flex flex-col h-full justify-between'>
            <div>
              <PengajuanInformation data={data} />
            </div>
            <div className='my-6'>
              <PengajuanButton status={data.status_code} id={data.id} pengajuan={data.pengajuan} userId={data.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const ProsesPengajuan = () => {
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
  if (userData) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <div className="w-full">
          <H />
        </div>

        <div className='container mx-auto my-4 p-4 justify-center h-auto'>
          <BackButton nav="/ListPengajuan"/>
          <Information userData={userData}/>
        </div>

        <div className="w-full">
          <F />
        </div>
      </div>
    );
  }
  
};

export default ProsesPengajuan;

import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Beranda from './component/Beranda';
import TtgKam from './component/TentangKami';
import Prdk from './component/Produk';
import HubKam from './component/HubungiKami';
import LogIn from './component/LoginNRegis/Login';
import Register from './component/LoginNRegis/Register';
import ListUser from './component/UserPengurus/ListUser';
import LaporanKeuangan from './component/UserPengurus/LaporanKeuangan';
import FormBuatBerita from './component/UserPengurus/FormBuatBerita';
import PengurusApprove from './component/UserPengurus/PengurusApprove';
import UserTable from './component/UserPengurus/UserTable';
import Profile from './component/Profile';
import EditProfile from './component/EditProfile'      
import BeritaMenu from './component/UserPengurus/BeritaMenu';
import ShowBerita from './component/UserPengurus/ShowBerita';
import EditBerita from './component/UserPengurus/EditBerita';
import FormPengajuanPinjaman from './component/SimpanPinjam/FormPengajuanPinjaman';
import FormPengajuanSimpanan from './component/SimpanPinjam/FormPengajuanSimpanan';
import HalamanAwalSimpanPinjam from './component/SimpanPinjam/HalamanAwalSimpanPinjam';
import ListPengajuan from './component/SimpanPinjam/ListPengajuan';
import ProsesPengajuan from './component/SimpanPinjam/ProsesPengajuan';

function App() {

  return (
    <Router>
        <Routes>
        <Route exact path="/" element = {<Beranda/>} />
        <Route exact path="/TentangKami" element = {<TtgKam/>} />
        <Route exact path="/Produk" element = {<Prdk/>} />
        <Route exact path="/HubungiKami" element = {<HubKam/>} /> 
        <Route exact path="/Login" element = {<LogIn/>} /> 
        <Route exact path='/Register' element={<Register/>} />
        <Route exact path='/Profile' element = {<Profile/>} />
        <Route exact path='/edtprf' element = {<EditProfile/>} />

        <Route exact path='/FormPengajuanPinjaman' element = {<FormPengajuanPinjaman/>} />
        <Route exact path='/FormPengajuanSimpanan' element = {<FormPengajuanSimpanan/>} />
        <Route exact path='/ListPengajuan' element = {<ListPengajuan/>} />
        <Route exact path='/ProsesPengajuan/:pengajuan/:id' element = {<ProsesPengajuan/>} />
        <Route exact path='/HalamanAwalSimpanPinjam' element={<HalamanAwalSimpanPinjam/>} />
       

        <Route exact path='/BeritaMenu' element = {<BeritaMenu/>} />
        <Route exact path='/LaporanKeuangan' element = {<LaporanKeuangan/>} />
        <Route exact path='/FormBuatBerita' element = {<FormBuatBerita/>} />
        <Route exact path='/PengurusApprove' element = {<PengurusApprove/>} />
        <Route exact path='/UserTable/:id' element = {<UserTable/>} />
        <Route exact path='/ShowBerita/:id' element = {<ShowBerita/>} />
        <Route exact path='/EditBerita/:id' element = {<EditBerita/>} />
        <Route exact path='/ListUser' element = {<ListUser/>} />
        </Routes>
      </Router>
  )
}

export default App;

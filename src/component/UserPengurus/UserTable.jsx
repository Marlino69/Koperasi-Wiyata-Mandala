import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import H from "../H&F/Header";
import F from "../H&F/Footer";
import {  
  formatRupiah
} from '../../utils/utils';
import { BackButton } from '../../utils/components';
import { useNavigate } from 'react-router-dom';

const UserTable = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const role = localStorage.getItem('UUID_MS_JOB');

  useEffect(() => {
    if (role === '1') {  
      navigate('/'); 
  } else{
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/userTable/${id}`);
        console.log("API Response:", response.data);
        if (response.data) {
          const fetchedData = response.data;
          const totalLoanAmount = fetchedData.TR_PENGAJUAN_PINJAMANs.reduce((acc, loan) => acc + loan.NOMINAL, 0);
          fetchedData.totalLoanAmount = totalLoanAmount;

          setUserData(fetchedData);
        } else {
          setError("No data found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUserData();
    } else {
      setError('Invalid user ID');
      setLoading(false);
    }
  }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">No data found.</div>
      </div>
    );
  }

  const findLatestByDate = (array) => {
    return array?.reduce((latest, current) => {
      const currentDate = new Date(current.createdAt);
      const latestDate = latest ? new Date(latest.createdAt) : null;
      return !latestDate || currentDate > latestDate ? current : latest;
    }, null);
  };

  const latestLoan = findLatestByDate(userData.TR_PENGAJUAN_PINJAMANs || []);
  const latestSaving = findLatestByDate(userData.TR_PENGAJUAN_SIMPANANs || []);

  const totalLoanAmount = userData.TR_PENGAJUAN_PINJAMANs.reduce((acc, loan) => {
    const statusCode = loan.status?.STATUS_CODE;
    const nominalValue = parseFloat(loan.NOMINAL) || 0;
    if (statusCode === 'APPROVED') {
      return acc + nominalValue;
    }

    return acc;
  }, 0);
  userData.totalLoanAmount = totalLoanAmount;

  const totalSavingAmount = userData.TR_PENGAJUAN_SIMPANANs.reduce((acc, saving) => {
    const statusCode = saving.status?.STATUS_CODE;
    const nominalValue = parseFloat(saving.NOMINAL) || 0;
    if (statusCode === 'APPROVED') {
      return acc + nominalValue;
    }

    return acc;
  }, 0);
  userData.totalSavingAmount = totalSavingAmount;
  
  const loanStatusPinjaman = latestLoan?.status?.STATUS_CODE || 'N/A';
  const loanStatusSimpanan = latestSaving?.status?.STATUS_CODE || 'N/A';

  const formattedJoinDate = userData.createdAt
    ? new Date(userData.createdAt).toLocaleDateString()
    : 'N/A';
  
  const totalInterestPaidloan = userData.TR_PENGAJUAN_PINJAMANs?.reduce((acc, loan) => {
    const totalHistoryInterest = loan.historyPinjaman?.reduce((historyAcc, history) => {
      const angsuranBunga = parseFloat(history.BUNGA_PINJAMAN) || 0;
      return historyAcc + angsuranBunga;
    }, 0) || 0;
  
    return acc + totalHistoryInterest;
  }, 0) || 0;

  const totalInterestPaidsaving = userData.TR_PENGAJUAN_SIMPANANs?.reduce((acc, saving) => {
    const totalHistoryInterest = saving.historySimpanan?.reduce((historyAcc, history) => {
      const simpananBunga = parseFloat(history.BUNGA_SIMPANAN) || 0;
      return historyAcc + simpananBunga;
    }, 0) || 0;

    return acc + totalHistoryInterest;
  }, 0) || 0;

  const totalTabungan = userData.TR_PENGAJUAN_SIMPANANs.reduce((acc, saving) => {
    const currentSimpanan = parseFloat(saving.historySimpanan?.[0]?.CURRENT_SIMPANAN) || 0;
    return acc + currentSimpanan;
  }, 0);
  

  const formattedtotalTabungan = formatRupiah(totalTabungan.toString());
  const formattedTotalLoanAmount = formatRupiah(totalLoanAmount.toString());
  const formattedtotalSavingAmount = formatRupiah(totalSavingAmount.toString());
  const formattedtotalInterestPaidloan = formatRupiah(totalInterestPaidloan.toString());
  const formattedtotalInterestPaidsaving = formatRupiah(totalInterestPaidsaving.toString());

  return (
    <div>
      <H />
      <div className="container mx-auto p-6">
        <BackButton nav="/ListUser"/>
        <h2 className="text-3xl font-bold mb-6 text-center">User Details</h2>
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="font-semibold text-lg">Nama:</span>
                <p className="ml-2">{userData.NAMA_LENGKAP || 'N/A'}</p>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-lg">Data Pinjaman Terakhir:</span>
                <p className="ml-2 truncate">{latestLoan
                    ? 'Rp ' + formatRupiah(latestLoan.NOMINAL) + 
                       ' (tanggal ' + new Date(latestLoan.updatedAt).toLocaleDateString() + ')'
                    : 'N/A'}</p>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-lg">Status Pinjaman Terakhir:</span>
                <p className="ml-2">{loanStatusPinjaman || 'N/A'}</p>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-lg">Total Pinjaman:</span>
                <p className="ml-2">{formattedTotalLoanAmount !== '0' ? `Rp ${formattedTotalLoanAmount}` : 0}</p>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-lg">Total Bunga Pinjaman:</span>
                <p className="ml-2">{formattedtotalInterestPaidloan !== '0' ? `Rp ${formattedtotalInterestPaidloan}` : 0}</p>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-lg">Total Tabungan:</span>
                <p className="ml-2">{formattedtotalTabungan !== '0' ? `Rp ${formattedtotalTabungan}` : 0}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <span className="font-semibold text-lg">Tanggal Bergabung:</span>
                <p className="ml-2">{formattedJoinDate}</p>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-lg">Data Simpanan Terakhir:</span>
                <p className="ml-2 truncate">{latestSaving
                    ? 'Rp ' + formatRupiah(latestSaving.NOMINAL) + 
                      ' (tanggal ' + new Date(latestSaving.updatedAt).toLocaleDateString() + ')'
                    : 'N/A'}</p>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-lg">Status Simpanan Terakhir:</span>
                <p className="ml-2">{loanStatusSimpanan || 'N/A'}</p>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-lg">Total Simpanan:</span>
                <p className="ml-2">{formattedtotalSavingAmount !== '0' ? `Rp ${formattedtotalSavingAmount}` : 0}</p>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-lg">Total Bunga Simpanan:</span>
                <p className="ml-2">{formattedtotalInterestPaidsaving !== '0' ? `Rp ${formattedtotalInterestPaidsaving}` : 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <F />
    </div>
  );
};

export default UserTable;

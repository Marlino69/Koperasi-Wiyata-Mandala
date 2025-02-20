export const formatRupiah = (angka) => {
    // Ensure angka is a string and remove leading zeros
    angka = angka.replace(/^0+/, '');
    let number_string = angka.toString(),
        sisa = number_string.length % 3,
        rupiah = number_string.substr(0, sisa),
        ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }
    return rupiah || '0';
};

export const deformatRupiah = (angka) => {
    return parseInt(angka.replace(/\./g, ''), 10)
};

export const formatDate = (string) => {
    const date = new Date(string)
    return date.toLocaleString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const sumDate = (string, num) => {
    const date = new Date(string)
    date.setMonth(date.getMonth() + num);
    return date.toLocaleString('id-ID', {
        year: 'numeric',
        month: 'long',
    });
  }
  

export const countAngsuran = (nominal, bunga, totalBulan) => {
    const formula = Math.round((nominal / totalBulan) + ((nominal * bunga/100)/totalBulan))
    if (formula == 0) {
        return '0';
    } else {
        return String(formula);
    }
}

import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
export const getCurrentLoggedInID = () => {
    const [ID, setID] = useState(null); // Initially null to indicate loading

    useEffect(() => {
        const refreshToken = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const decoded = jwtDecode(accessToken);
                
                setID(decoded.userId); // Update the state with userId
            } catch (error) {
                console.log(error);
            }
        };

        refreshToken(); // Call the refreshToken function when the hook is called
    }, []);

    return ID; // Return the userId (which can be null if not yet fetched)
};

export const getCurrentLoggedInData = () => {
  const [data, setData] = useState(null);  // Initially null until data is fetched
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(null); // For catching errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          setError('No access token found');
          return;
        }

        const decoded = jwtDecode(accessToken);  // Decode the JWT to get user ID
        const userId = decoded.userId;

        // Fetch user data using the decoded userId
        const response = await axios.get(`http://localhost:5000/getOneUser/${userId}`);
        console.log("API Response:", response.data);
        setData(response.data);  // Set the user data after fetching
      } catch (err) {
        setError('Failed to fetch user data');
        console.error("error:",err);
      } finally {
        setLoading(false);  // Stop loading after fetching
      }
    };

    fetchData(); // Fetch data on component mount
  }, []);  // The empty dependency array ensures this effect runs once on mount

  // Returning data along with loading and error states
  return data;
};


export function isBetween(num, min, max) {
    if (min==0 && max==0) {
        return true;
    }
    return num >= min && num <= max;
  }
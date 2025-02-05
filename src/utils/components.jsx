import { useNavigate } from 'react-router-dom';
import { Back_icon } from '../assets/icons';

export const BackButton = ({nav}) => {
    const navigate = useNavigate();
    return (
      <button 
      className='mx-auto shadow-lg p-3 rounded-lg bg-gray-600 text-white
      hover:shadow-xl hover:bg-gray-800 transition-all duration-300 w-[150px]'
      style={{marginBottom:"20px"}}
      onClick={() => navigate(nav)}>
        <div className='flex justify-between'>
          <span>Kembali</span>
          <span>
            <Back_icon />
          </span>
        </div>
      </button>
    )
  }
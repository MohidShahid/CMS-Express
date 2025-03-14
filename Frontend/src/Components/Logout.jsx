import React from 'react'
import authService from '../api/authService';
import { logout } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Logout() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
    const handleLogout = async()=>{
       await authService.logoutUser();
       dispatch(logout());
       navigate('/login');
    }
  return (
     <span className='cursor-pointer text-red-600' onClick={handleLogout}>Logout</span>
  )
}

export default Logout;
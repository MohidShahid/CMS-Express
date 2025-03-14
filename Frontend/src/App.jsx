import './App.css'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import authService from './api/authService'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login , logout } from './store/authSlice'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); 

   useEffect(()=>{
       authService.getSession().then((user)=>{
        if(user){
          dispatch(login(user))
        }else{
          dispatch(logout());
        }
       }).catch((err)=> console.log(err))
       .finally(() => setLoading(false));
   },[navigate , dispatch])

   if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>; // ✅ Show loader
  }
  return (
    <>
    <div className="flex flex-col items-center justify-center h-full">
     <Outlet />
    </div>
    </>
  )
}

export default App

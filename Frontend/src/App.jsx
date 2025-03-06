import { useState } from 'react'
import {useForm} from "react-hook-form";
import './App.css'
import authService from './api/authService';

function App() {
  const [status , setStatus] = useState("")
  const {handleSubmit , register} = useForm();
  const handleRegister = async(data)=>{
    const response =  await authService.registerUser(data);
    setStatus(response.message);
  }

  return (
    <>
    <div className="signup-form flex flex-col items-center justify-center w-full">
      <h1>Register Yourself</h1>
      <form className='flex flex-col items-center justify-center' onSubmit={handleSubmit(handleRegister)}>
         <input className='px-2 py-1 outline-none border-1' type="text" placeholder="Enter You Name" {...register("name")}/>
         <input className='px-2 py-1 outline-none border-1' type="text" placeholder='Enter Your Email' {...register("email")}/>
         <input className='px-2 py-1 outline-none border-1' type="text" placeholder='Enter Your Password' {...register("password")}/>
         <input className='px-2 py-1 outline-none border-1' type="file"  {...register("profileImg")}/>
         <input defaultValue={"admin"} type='text' {...register("role")} />
         <input type="submit" placeholder='Submit' className='font-bold bg-pink-500 cursor-pointer px-2 py-2 rounded' />
      </form>
      <p className='text-red'>{status}</p>
    </div>
    </>
  )
}

export default App

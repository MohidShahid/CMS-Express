import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Checkbox, Label, TextInput , FileInput } from "flowbite-react";
import authService from '../api/authService';

function Signup() {
    const [status , setStatus] = useState("")
    const {handleSubmit , register , reset} = useForm();
    const handleRegister = async(data)=>{
        console.log("function called")
      const response =  await authService.registerUser(data);
      setStatus(response.message);
      reset();
    }
  return (
    <div className="w-full h-screen flex items-center justify-center">
    <form className="w-full max-w-md flex flex-col gap-4 p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-md bg-white"  onSubmit={handleSubmit(handleRegister)}>
      <h1 className='text-xl text-blue-950 font-bold text-center '>Create an account</h1>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name1" value="Your Name" />
        </div>
        <TextInput id="name1" type="text" placeholder="Enter Your Name" required {...register("name" ,)} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Your email" />
        </div>
        <TextInput id="email1" type="email" placeholder="name@flowbite.com" required {...register("email", {
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
        required: "Email is required",
      })} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput id="password1" type="password" required {...register("password")}/>
      </div>
      <TextInput defaultValue={"admin"} hidden {...register("role")} />
      <Button type="submit">Submit</Button>
      <p className='text-blue-950'>{status}</p>
    </form>
    </div>
  )
}

export default Signup
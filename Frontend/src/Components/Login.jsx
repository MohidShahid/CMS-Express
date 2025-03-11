import { Button, Label, TextInput } from "flowbite-react";
import authService from "../api/authService";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
function Login() {
  const [status, setStatus] = useState("");
  const { handleSubmit, register, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hanldeLogin = async (data) => {
      const response = await authService.loginUser(data);
      setStatus(response.message);
      reset();
      if (response.user && response.user.role === "admin") {
        dispatch(login(response.user));
        navigate("/dashboard");
      }else if (response.user && response.user.role === "user") {
        dispatch(login(response.user));
        navigate("/");  
      }
      console.log(useSelector((state) => state));
  };  
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        className="w-full max-w-md flex flex-col gap-4 p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-md bg-white"
        onSubmit={handleSubmit(hanldeLogin)}
      >
        <h1 className="text-xl text-blue-950 font-bold text-center ">
          Login to your account
        </h1>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="name@flowbite.com"
            required
            {...register("email", {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
              required: "Email is required",
            })}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            id="password1"
            type="password"
            required
            {...register("password")}
          />
        </div>
        <Button type="submit">Submit</Button>
        <p className="text-blue-950">{status}</p>
      </form>
    </div>
  );
}

export default Login;

import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useState } from "react";
import { loginUser } from "../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../app/store";
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state)=>state.user)
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  
  const loginApp = () => {
    if (!email || !password) {
      toast.info("Please fill the information");
      return;
    }
    dispatch(loginUser({email, password}));
    console.log(userState)
  }

  return (
    <div className='flex items-center justify-center mt-12'>
      <div className='w-full max-w-md'>
        <div className="flex justify-center  lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0 mb-1">
          <div className=" w-full flex items-center flex-shrink-0 text-gray-800 mr-16"> 
            <span className="font-semibold text-xl text-black tracking-tight flex justify-center items-center gap-2">
              <img src={Logo} className="h-12 w-14 "></img>Todo App
            </span>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-normal mb-2" htmlFor="username">
              Email
            </label>
            <input
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              v-model="form.email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-normal mb-2" htmlFor="password">
              Password
            </label>
            <input
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              v-model="form.password"
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="current-password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button onClick={loginApp} className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700">
              Login
            </button>
            <a onClick={() => navigate("/signup")} className="cursor-pointer inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800">
              Sign Up
            </a>
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs">©2024 All rights reserved.</p>
      </div>
    </div>
  )
}

export default Login
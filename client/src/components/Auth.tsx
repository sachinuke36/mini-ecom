'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props={
  action : string,
}

const Auth = ({action}:Props) => {
  const [name, setName]= useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword]= useState<string>('');
  const [confirmPass, setConfirmPass]= useState<string>('');
  const backendUrl = 'http://localhost:8000'
  const router = useRouter();


  const isLogin = action === 'login';

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if(password !== confirmPass && !isLogin) return alert("Password doesn't match");
  const payload = {
    email,
    password,
    ...(isLogin ? {} : { name, confirmPass }),
  };
  console.log(payload)

  const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

  try {
    const res = await fetch(backendUrl + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("data",data)
    // console.log(data.userId);
    localStorage.setItem('userId',data.userId);
    if (!res.ok) {
      alert(data.message || 'Something went wrong');
      return;
    }
    // console.log(data);
    alert('Success!');
    router.replace('/')
    
  } catch (err) {
    console.error(err);
    alert('Server error');
  }
};

  
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 p-4">
      <div className="flex w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl bg-white">
        
        {/* Left Panel - Illustration + Text */}
        <div className="w-1/2 bg-purple-500 text-white p-10 flex flex-col justify-center items-center space-y-6">
          <Image
            src="/logo2.png" // Replace with actual image path
            alt="Illustration"
            height={300}
            width={300}
            className="drop-shadow-[0_10px_10px_rgba(124,58,237,0.9)]"
            // className="w-64 h-64 object-contain shadow-2xl"
          />
          <p className="text-center text-sm">
           Your shopping journey begins here. Fast, secure, and hassle-free.
        </p>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-1/2 bg-white p-10 flex flex-col justify-center space-y-6">
          {isLogin && <div className="text-purple-600 font-bold text-lg mb-2">
            Welcome back
          </div>}
          <h2 className="text-2xl font-bold text-gray-800">{isLogin ? 'Login your account' : 'Create an account'}</h2>
          <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
            {!isLogin && <input
              value={name}
              required={!isLogin}
              onChange={(e)=>setName(e.target.value)}
              type="text"
              placeholder="Name"
              className="border-b border-gray-300 focus:outline-none focus:border-purple-500 py-2"
            />}
            <input
              value={email}
              required
              onChange={(e)=>setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="border-b border-gray-300 focus:outline-none focus:border-purple-500 py-2"
            />
            <input
              value={password}
              required
              onChange={(e)=>setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="border-b border-gray-300 focus:outline-none focus:border-purple-500 py-2"
            />
            {!isLogin && <input
              value={confirmPass}
              required={!isLogin}
              onChange={(e)=>setConfirmPass(e.target.value)}
              type="password"
              placeholder="Confirm password"
              className="border-b border-gray-300 focus:outline-none focus:border-purple-500 py-2"
            />}
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-full hover:opacity-90 transition"
            >
             {isLogin ? 'Login' : 'Register'}
            </button>
          </form>
          <div className="flex justify-between text-sm text-gray-500">
            
            <a href={isLogin ? "/register" :"/login"} className="hover:text-purple-500">{isLogin ? 'Create Account' : 'Already have an account'}</a>
            <a href="#" className="hover:text-purple-500">Forgot Password?</a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Auth;

import React, { useState } from 'react';
import bgLogin from '../assets/bg-login.png'; 
import emailIcon from '../assets/email-icon.png';
import eyeOpenIcon from '../assets/eye-open.png';
import eyeClosedIcon from '../assets/eye-closed.png';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex h-screen font-serif">
      {/* Kiri - Gambar */}
      <div className="w-1/2 h-full">
        <img
          src={bgLogin}
          alt="Background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Kanan - Form */}
      <div className="w-1/2 bg-black text-white flex flex-col justify-center px-12 py-8">
        <h1 className="text-4xl font-bold mb-6 border-b border-white pb-2">Sign in</h1>
        

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <div className="flex items-center border-b border-white">
            <input
              type="email"
              placeholder="Email"
              className="bg-black w-full p-2 focus:outline-none text-white"
            />
            <img src={emailIcon} alt="Email Icon" className="w-6 h-6 pr-2" />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <div className="flex items-center border-b border-white">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="bg-black w-full p-2 focus:outline-none text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="focus:outline-none pr-2"
              aria-label="Toggle Password Visibility"
            >
              <img
                src={showPassword ? eyeOpenIcon : eyeClosedIcon}
                alt="Toggle Password"
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>

        {/* Lupa Password */}
        <div className="text-right mb-6">
          <a href="#" className="text-white text-sm underline">Forgot Password ?</a>
        </div>

        {/* Tombol Sign In */}
        <button className="bg-red-600 text-white p-2 rounded w-full mb-4 hover:bg-red-700 transition">
          Sign in
        </button>

        {/* Sign Up */}
        <div className="text-center text-sm">
          <span>or</span>
          <div className="mt-2">
            <button className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

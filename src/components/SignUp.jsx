import React, { useState } from 'react';
import bgRegis from '../assets/bg-regis.jpg'; 
import userIcon from '../assets/user-icon.png';
import emailIcon from '../assets/email-icon.png';
import eyeOpenIcon from '../assets/eye-open.png';
import eyeClosedIcon from '../assets/eye-close.png';
import { Link } from 'react-router-dom';


export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex h-screen font-serif">
      {/* Kiri - Form */}
      <div className="w-1/2 bg-black text-white flex flex-col justify-center px-12 py-8">
        <h1 className="text-4xl font-bold mb-6">Sign Up</h1>
        <p className="mb-4 text-sm">
          Already Have An Account? <Link to="/" className="text-blue-400">Back to Home</Link>
        </p>

        {/* Username */}
        <div className="mb-4">
          <label className="block mb-1">Username</label> 
          <div className="flex items-center border-b border-white">
            <input
              type="text"
              placeholder="Username"
              className="bg-black w-full p-2 focus:outline-none text-white"
            />
            <img src={userIcon} alt="User Icon" className="w-6 h-6 pr-2" />
          </div>
        </div>

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
                src={showPassword ? eyeClosedIcon : eyeOpenIcon}
                alt="Toggle Password"
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-center mb-6 text-sm">
          <input type="checkbox" className="mr-2" />
          <span>
            I Agree To The <a href="#" className="text-blue-400">Terms & Conditions</a>
          </span>
        </div>

        {/* Sign up button */}
        <button className="bg-red-600 text-white p-2 rounded w-full mb-4 hover:bg-red-700 transition">
          Sign up
        </button>

        {/* Create an Account */}
        <p className="mt-6 text-center text-sm">Create an Account</p>
      </div>

      {/* Background */}
      <div className="w-1/2 h-full">
        <img
          src={bgRegis}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
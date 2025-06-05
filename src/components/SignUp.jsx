import React, { useState } from 'react';
import bgRegis from '../assets/bg-regis.jpg'; 
import userIcon from '../assets/user-icon.png';
import emailIcon from '../assets/email-icon.png';
import eyeOpenIcon from '../assets/eye-open.png';
import eyeClosedIcon from '../assets/eye-closed.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confpassword, setConfPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://capstone-backend-nvhm.vercel.app/register', {
        name: name,
        email: email,
        password: password,
        confpassword: confpassword
      });
      navigate('/signin'); 
    } catch (error) {
      if(error.response){
        setMsg(error.response.data.msg);
      }
    }
  }

  return (
    <div className="flex h-screen font-serif">
      {/* Kiri - Form */}
      <div className="w-full md:w-1/2 bg-black text-white flex flex-col justify-center px-6 md:px-12 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Sign Up</h1>
        <p className="mb-4 text-sm">
          Already Have An Account? <Link to="/" className="text-blue-400">Back to Home</Link>
        </p>
        <p className="mb-4 text-red-500">{msg}</p>

        {/* Username */}
        <div className="mb-4">
          <label className="block mb-1">Name</label> 
          <div className="flex items-center border-b border-white">
            <input
              type="text"
              placeholder="Username"
              className="bg-black w-full p-2 focus:outline-none text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block mb-1"> Confirm Password</label>
          <div className="flex items-center border-b border-white">
            <input
              type={showConfPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              className="bg-black w-full p-2 focus:outline-none text-white"
              value={confpassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfPassword(!showConfPassword )}
              className="focus:outline-none pr-2"
              aria-label="Toggle Password Visibility"
            >
              <img
                src={showConfPassword  ? eyeClosedIcon : eyeOpenIcon}
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
        <button  onClick={Register} className="bg-red-600 text-white p-2 rounded w-full mb-4 hover:bg-red-700 transition">
          Sign up
        </button>

        {/* Create an Account */}
        <p className="mt-6 text-center text-sm">Create an Account</p>
      </div>

      {/* Background */}
      <div className="hidden md:block w-full md:w-1/2 h-64 md:h-full">
        <img
          src={bgRegis}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
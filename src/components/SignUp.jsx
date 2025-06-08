import React, { useState } from 'react';
import bgRegis from '../assets/bg-regis.jpg';
import bgLogin from "../assets/bg-login.png";
import userIcon from '../assets/user-icon.png';
import emailIcon from '../assets/email-icon.png';
import eyeOpenIcon from '../assets/eye-open.png';
import eyeClosedIcon from '../assets/eye-closed.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TermsModal from "../components/TermsModal";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confpassword, setConfPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [isTermsAccepted, setIsTermsAccepted] = useState(false); // New state for checkbox
  const [showTermsModal, setShowTermsModal] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://capstone-be.revivaaiman.my.id/register', {
        name: name,
        email: email,
        password: password,
        confpassword: confpassword,
        termsAccepted: true
      });
      navigate('/signin');
    } catch (error) {
      if (error.response) {
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
          Already Have An Account? <Link to="/signin" className="text-blue-400">Back to Sign In</Link>
        </p>
        <p className="mb-4 text-red-500">{msg}</p>

        {/* Bungkus input dan tombol dalam <form> */}
        <form onSubmit={Register} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block mb-2 text-base font-medium">Name</label>
            <div className="flex items-center border-b border-white">
              <input
                type="text"
                placeholder="Username"
                className="bg-black w-full p-3 focus:outline-none text-white text-base"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <img src={userIcon} alt="User Icon" className="w-7 h-7 ml-3 mr-2" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-base font-medium">Email</label>
            <div className="flex items-center border-b border-white">
              <input
                type="email"
                placeholder="Email"
                className="bg-black w-full p-3 focus:outline-none text-white text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <img src={emailIcon} alt="Email Icon" className="w-7 h-7 ml-3 mr-2" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-base font-medium">Password</label>
            <div className="flex items-center border-b border-white">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="bg-black w-full p-3 focus:outline-none text-white text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none ml-3 pr-2"
                aria-label="Toggle Password Visibility"
              >
                <img
                  src={showPassword ? eyeClosedIcon : eyeOpenIcon}
                  alt="Toggle Password"
                  className="w-7 h-7"
                />
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 text-base font-medium">Confirm Password</label>
            <div className="flex items-center border-b border-white">
              <input
                type={showConfPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                className="bg-black w-full p-3 focus:outline-none text-white text-base"
                value={confpassword}
                onChange={(e) => setConfPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfPassword(!showConfPassword)}
                className="focus:outline-none ml-3 pr-2"
                aria-label="Toggle Password Visibility"
              >
                <img
                  src={showConfPassword ? eyeClosedIcon : eyeOpenIcon}
                  alt="Toggle Password"
                  className="w-7 h-7"
                />
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center mb-6 text-sm">
            <input
              type="checkbox"
              className="mr-3 w-4 h-4"
              checked={isTermsAccepted}
              onChange={(e) => setIsTermsAccepted(e.target.checked)}
            />
            <span>
              I Agree To The{' '}
              <button
                type="button"
                onClick={() => setShowTermsModal(true)}
                className="text-blue-400 underline focus:outline-none"
              >
                Terms & Conditions
              </button>
            </span>
          </div>

          {/* Sign up button */}
          <button
            type="submit"
            className={`text-white p-2 rounded w-full transition ${
              isTermsAccepted
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-600 text-gray-300 cursor-not-allowed'
            }`}
            disabled={!isTermsAccepted}
          >
            Sign up
          </button>
        </form>

        {/* Create an Account */}
        <p className="mt-6 text-center text-sm">Create an Account</p>
      </div>

      {/* Background */}
      <div className="hidden md:block w-full md:w-1/2 h-64 md:h-full">
        <img
          src={bgLogin}
          alt="Background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Terms Modal */}
      {showTermsModal && <TermsModal onClose={() => setShowTermsModal(false)} />}
    </div>
  );
}
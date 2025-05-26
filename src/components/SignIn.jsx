import React, { useState, useContext } from "react";
import bgLogin from "../assets/bg-login.png";
import emailIcon from "../assets/email-icon.png";
import eyeOpenIcon from "../assets/eye-open.png";
import eyeClosedIcon from "../assets/eye-closed.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { login, api } = useContext(AuthContext);

  const Auth = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", {
        email: email,
        password: password,
      });
      login(response.data.accessToken);
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      } else {
        setMsg("Login failed");
      }
    }
  };

  return (
    <div className="flex h-screen font-serif">
      {/* Kiri - Background */}
      <div className="hidden md:block w-full md:w-1/2 h-64 md:h-full">
        <img
          src={bgLogin}
          alt="Background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Kanan - Form */}
      <div className="w-full md:w-1/2 bg-black text-white flex flex-col justify-center px-6 md:px-12 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Sign in</h1>

        {msg && <p className="text-red-500 mb-4">{msg}</p>}

        <form onSubmit={Auth} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1">Email</label>
            <div className="flex items-center border-b border-white">
              <input
                type="email"
                placeholder="Email"
                className="bg-black w-full p-2 focus:outline-none text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <img src={emailIcon} alt="Email Icon" className="w-6 h-6 pr-2" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1">Password</label>
            <div className="flex items-center border-b border-white">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="bg-black w-full p-2 focus:outline-none text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
          <div className="text-right mb-4">
            <a href="#" className="text-white text-sm underline">
              Lupa Password ?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-red-600 text-white p-2 rounded w-full hover:bg-red-700 transition"
          >
            Sign in
          </button>
        </form>

        {/* Sign Up */}
        <div className="text-center text-sm mt-6">
          <span>atau</span>
          <div className="mt-2">
            <button
              onClick={() => navigate("/signup")}
              className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

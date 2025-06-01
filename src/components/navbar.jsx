import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from './AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-80 shadow-md font-serif text-white">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Kiri: Menu Desktop */}
        <div className="hidden md:flex space-x-6 text-xl">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/#" className="hover:underline">Rekomendasi</Link>
          <Link to="/#" className="hover:underline">Forum</Link>
        </div>

        {/*  Auth Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Auth */}
          <div className="flex space-x-4 text-xl items-center">
            {isAuthenticated ? (
              <>
                <span className="text-white">Welcome, {user?.name || 'User'}</span>
                <button onClick={handleLogout} className="hover:underline">Logout</button>
              </>
            ) : (
              <>
                <Link to="/signin" className="hover:underline">Login</Link>
                <Link to="/signup" className="hover:underline">Register</Link>
              </>
            )}
          </div>
        </div>

        {/* Tombol Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-2xl"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 pb-4 border-t border-white text-lg bg-black bg-opacity-90">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:underline">Home</Link>
          <Link to="/#" onClick={() => setIsOpen(false)} className="hover:underline">Rekomendasi</Link>
          <Link to="/#" onClick={() => setIsOpen(false)} className="hover:underline">Forum</Link>

          <div className="flex space-x-6 text-xl items-center">
            {isAuthenticated ? (
              <>
                <span className="text-white">Welcome, {user?.name || 'User'}</span>
                <button onClick={handleLogout} className="hover:underline">Logout</button>
              </>
            ) : (
              <>
                <Link to="/signin" onClick={() => setIsOpen(false)} className="hover:underline">Login</Link>
                <Link to="/signup" onClick={() => setIsOpen(false)} className="hover:underline">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
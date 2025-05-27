import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
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

        {/* Kanan: Search + Auth Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="rounded-full border border-white px-4 py-1 text-sm focus:outline-none w-48 bg-transparent text-white"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white" />
          </div>

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

          <div className="relative w-3/4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-full border border-white px-4 py-1 text-sm bg-transparent text-white focus:outline-none"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white" />
          </div>

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
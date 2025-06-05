import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from './AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-sm border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="text-white text-2xl font-light tracking-wider hover:opacity-70 transition-opacity duration-300">
              JelajahJawa<span className="text-white/60">.ID</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            <div className="flex space-x-8">
              <Link 
                to="/" 
                className="text-white/80 hover:text-white text-sm font-light tracking-widest uppercase transition-all duration-300 relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                to="/#" 
                className="text-white/80 hover:text-white text-sm font-light tracking-widest uppercase transition-all duration-300 relative group"
              >
                Rekomendasi
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                to="/wishlist" 
                className="text-white/80 hover:text-white text-sm font-light tracking-widest uppercase transition-all duration-300 relative group"
              >
                wishlist
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            {/* Vertical Divider */}
            <div className="w-px h-6 bg-white/20"></div>

            {/* Auth Section */}
            <div className="flex items-center space-x-6">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-white/80 text-sm font-light tracking-wide">
                    Welcome, <span className="text-white font-normal">{user?.name || 'User'}</span>
                  </span>
                  <button 
                    onClick={handleLogout} 
                    className="border border-white/30 hover:border-white hover:bg-black  text-white px-4 py-2 text-sm font-light tracking-widest uppercase transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/signin" 
                    className="text-white/80 hover:text-white text-sm font-light tracking-widest uppercase transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="border border-white/30 hover:border-white hover:bg-white hover:text-black px-4 py-2 text-sm font-light tracking-widest uppercase transition-all duration-300"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 transition-colors duration-300 rounded-sm"
          >
            <div className="relative w-6 h-6">
              <span className={`absolute top-0 left-0 w-full h-0.5 bg-white transition-all duration-300 ${
                isOpen ? 'rotate-45 top-2.5' : ''
              }`}></span>
              <span className={`absolute top-2.5 left-0 w-full h-0.5 bg-white transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`absolute top-5 left-0 w-full h-0.5 bg-white transition-all duration-300 ${
                isOpen ? '-rotate-45 top-2.5' : ''
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="pt-6 pb-4 border-t border-white/10 mt-4">
            <div className="flex flex-col space-y-6">
              {/* Mobile Navigation Links */}
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white text-sm font-light tracking-widest uppercase transition-all duration-300 py-2 border-b border-transparent hover:border-white/20"
                >
                  Home
                </Link>
                <Link 
                  to="/#" 
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white text-sm font-light tracking-widest uppercase transition-all duration-300 py-2 border-b border-transparent hover:border-white/20"
                >
                  Rekomendasi
                </Link>
                <Link 
                to="/wishlist" 
                className="text-white/80 hover:text-white text-sm font-light tracking-widest uppercase transition-all duration-300 relative group"
              >
                wishlist
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
              </div>

              {/* Mobile Divider */}
              <div className="w-full h-px bg-white/10"></div>

              {/* Mobile Auth */}
              <div className="flex flex-col space-y-4">
                {isAuthenticated ? (
                  <>
                    <span className="text-white/80 text-sm font-light tracking-wide">
                      Welcome, <span className="text-white font-normal">{user?.name || 'User'}</span>
                    </span>
                    <button 
                      onClick={handleLogout} 
                      className="border border-white/30 hover:border-white hover:bg-white hover:text-black px-4 py-3 text-sm font-light tracking-widest uppercase transition-all duration-300 self-start"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Link 
                      to="/signin" 
                      onClick={() => setIsOpen(false)}
                      className="text-white/80 hover:text-white text-sm font-light tracking-widest uppercase transition-all duration-300 py-2"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      onClick={() => setIsOpen(false)}
                      className="border border-white/30 hover:border-white hover:bg-white hover:text-black px-4 py-3 text-sm font-light tracking-widest uppercase transition-all duration-300 self-start"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
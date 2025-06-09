import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white font-sans relative">
      <h1 className="text-8xl md:text-9xl font-bold tracking-tight mb-4">404</h1>
      <p className="text-2xl md:text-3xl text-gray-300 mb-6 text-center">
        Maaf, Halaman yang Anda cari tidak ditemukan.
      </p>
      <p className="text-lg text-gray-400 mb-8 text-center">
        Mari jelajahi tempat wisata lain yang menarik!
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition duration-300"
      >
        Kembali ke Beranda
      </Link>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="flex items-center gap-4">
          <div className="w-16 h-px bg-white/20"></div>
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          <div className="w-32 h-px bg-white/30"></div>
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          <div className="w-16 h-px bg-white/20"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
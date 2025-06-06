import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import markerIcon from '../assets/marker.png';
import bgLandingPage from '../assets/bg-landing-page.png';

const StarRating = ({ rating }) => {
  const fullStar = Math.floor(rating) >= 1;
  return (
    <div className="flex items-center gap-1">
      <span className="text-yellow-400 text-lg">
        {fullStar ? '★' : '☆'}
      </span>
      <span className="text-white text-sm ml-1">{rating || '4.5'}</span>
    </div>
  );
};

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem('accessToken'); 
        if (!token) {
          setError('Please log in to view your wishlist');
          setLoading(false);
          return;
        }

        const response = await fetch('https://capstone-backend-nvhm.vercel.app/wishlist', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch wishlist');
        }

        const data = await response.json();
        setWishlistItems(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div
      className="min-h-screen text-white py-20 px-4"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(${bgLandingPage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-serif mb-4">Wishlist Tempat Wisata</h1>
        <div className="w-32 h-1 bg-white mx-auto"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center">
            <p className="text-xl">Memuat wishlist...</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-xl text-red-500">{error}</p>
            <Link
              to="/"
              className="mt-4 inline-block px-6 py-2 border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300"
            >
              Jelajahi Tempat Wisata
            </Link>
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="text-center">
            <p className="text-xl">Wishlist Anda masih kosong</p>
            <Link
              to="/"
              className="mt-4 inline-block px-6 py-2 border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300"
            >
              Jelajahi Tempat Wisata
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistItems.map((item, index) => (
              <div
                key={item.id}
                className="group bg-black border border-white/10 hover:border-white/30 transition-all duration-700 transform hover:scale-105"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.gambar || 'https://source.unsplash.com/300x200/?travel'}
                    alt={item.name}
                    className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-light mb-4 text-white tracking-wide group-hover:text-gray-300 transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed font-light">
                    {item.description?.substring(0, 110) || 'Deskripsi tidak tersedia'}...
                  </p>
                  <div className="flex items-center gap-3 mb-8 text-xs text-gray-500 font-light">
                    <img src={markerIcon} alt="Marker" className="w-3 h-3 opacity-50" />
                    <span className="tracking-wider uppercase">
                      {item.province || item.adres || 'Lokasi tidak tersedia'}
                    </span>
                  </div>

                  <Link
                    to={`/places/${item.id}`}
                    className="group/btn relative inline-block w-full border border-white/30 hover:border-white text-center py-4 px-8 text-sm font-light tracking-widest uppercase transition-all duration-500 hover:bg-white hover:text-black transform hover:scale-105"
                  >
                    <span className="relative z-10">Detail</span>
                    <div className="absolute inset-0 bg-white transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
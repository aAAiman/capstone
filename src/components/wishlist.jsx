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

        const response = await fetch('http://localhost:5000/wishlist', {
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
      {/* Header Section */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-black bg-opacity-80 rounded-2xl overflow-hidden border border-gray-600 hover:border-white transition duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.gambar || 'https://source.unsplash.com/300x200/?travel'}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                    <StarRating rating={item.rating || 4.5} />
                  </div>

                  <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                    {item.description?.length > 100
                      ? `${item.description.substring(0, 100)}...`
                      : item.description || 'Deskripsi tidak tersedia'}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <img src={markerIcon} alt="Marker" className="w-4 h-4" />
                    <span className="text-gray-400 text-sm">
                      {item.province || item.adress || 'Lokasi tidak tersedia'}
                    </span>
                  </div>

                  <Link
                    to={`/places/${item.id}`}
                    className="mt-4 px-6 py-1 border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300"
                  >
                    Detail
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
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Bookmark, BookmarkCheck, Star, CheckCircle, X } from 'lucide-react';
import markerIcon from '../assets/marker.png';

// Custom Alert Component
const CustomAlert = ({ show, onClose, type = 'success', title, message }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const alertStyles = {
    success: {
      bg: 'bg-gradient-to-r from-green-500 to-emerald-600',
      icon: <CheckCircle className="w-6 h-6 text-white" />,
      border: 'border-green-400'
    },
    warning: {
      bg: 'bg-gradient-to-r from-yellow-500 to-orange-600',
      icon: <Bookmark className="w-6 h-6 text-white" />,
      border: 'border-yellow-400'
    }
  };

  const currentStyle = alertStyles[type] || alertStyles.success;

  return (
    <div className="fixed top-4 right-4 z-50 transition-all animate-slide-in">
      <div className={`${currentStyle.bg} ${currentStyle.border} border p-4 rounded-2xl shadow-2xl min-w-80 max-w-md backdrop-blur-sm`}>
        <div className="flex items-start space-x-3">
          <div className="mt-0.5">{currentStyle.icon}</div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">{title}</p>
            <p className="text-white/90 text-sm mt-1">{message}</p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-3 w-full bg-white/20 rounded-full h-1 overflow-hidden">
          <div className="h-full bg-white rounded-full animate-[shrink_3s_linear_forwards]" />
        </div>
      </div>
    </div>
  );
};

const DetailWisata = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [relatedPlaces, setRelatedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const [alert, setAlert] = useState({ show: false, type: '', title: '', message: '' });

  const showAlert = (type, title, message) => {
    setAlert({ show: true, type, title, message });
  };

  const closeAlert = () => {
    setAlert((prev) => ({ ...prev, show: false }));
  };

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await axios.get(`https://capstone-be.revivaaiman.my.id/places/${id}`);
        setPlace(response.data);

        const relatedResponse = await axios.get(`https://capstone-be.revivaaiman.my.id/places`, {
          params: {
            province: response.data.province,
            notId: id, // Pastikan ini benar-benar "notId" tanpa karakter tambahan
            description: encodeURIComponent(response.data.description || '') // Encode untuk keamanan
          }
        });
        console.log('Related places response:', relatedResponse.data); // Log respons
        setRelatedPlaces(
          relatedResponse.data.map((place, index) => ({
            id: place.id || index,
            name: place.name,
            province: place.province,
            description: place.description,
            gambar: place.gambar,
            rating: place.rating || 4.5,
            adress: place.adress || null
          })).slice(0, 3)
        );

        const token = localStorage.getItem('accessToken');
        if (token) {
          const wishlistResponse = await axios.get('https://capstone-be.revivaaiman.my.id/wishlist', {
            headers: { Authorization: `Bearer ${token}` },
          });

          const isSaved = wishlistResponse.data.some((item) => item.id === response.data.id);
          setIsBookmarked(isSaved);
        }

        setLoading(false);
      } catch (err) {
        setError('Gagal memuat detail tempat wisata');
        console.error('Error fetching place:', err.response ? err.response.data : err.message); // Log detail error
        setLoading(false);
      }
    };

    fetchPlace();
  }, [id]);

  const handleBookmark = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      showAlert('warning', 'Kamu belum login!', 'Silakan login untuk menambahkan ke wishlist.');
      return;
    }

    try {
      if (isBookmarked) {
        await axios.delete(`https://capstone-be.revivaaiman.my.id/wishlist/${place.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsBookmarked(false);
        showAlert('warning', 'Wishlist Dihapus', 'Tempat wisata berhasil dihapus dari wishlist.');
      } else {
        await axios.post(
          'https://capstone-be.revivaaiman.my.id/wishlist',
          { placeId: place.id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsBookmarked(true);
        showAlert('success', 'Wishlist Ditambahkan', 'Tempat wisata berhasil ditambahkan ke wishlist.');
      }
    } catch (error) {
      console.error('Error response:', error.response?.data);
      showAlert('warning', 'Gagal', error.response?.data?.message || 'Gagal memproses wishlist.');
    }
  };

  if (loading) return <p className="text-white text-center">Sedang memuat...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!place) return <p className="text-white text-center">Tempat wisata tidak ditemukan</p>;

  const encodedGambar = place.gambar ? encodeURI(place.gambar) : 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop';
  return (
    <div className="min-h-screen bg-black text-white">
      <CustomAlert {...alert} onClose={closeAlert} />

      <div
        className="relative h-screen flex items-end justify-start"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(${encodedGambar})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="px-4 sm:px-8 mb-20 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{place.name}</h1>
        </div>
      </div>

      <div className="relative -mt-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black/95 backdrop-blur-sm rounded-t-3xl p-6 sm:p-8 lg:p-12 border-t border-gray-800">
            <div className="mb-16">
              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center space-x-2 bg-yellow-500/20 px-4 py-2 rounded-full">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-lg font-semibold text-yellow-400">{place.rating}</span>
                </div>
                <button
                  onClick={handleBookmark}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 group"
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
                  ) : (
                    <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  )}
                </button>
                <div className="flex items-center space-x-2 text-gray-400">
                  <img src={markerIcon} alt="Marker" className="w-5 h-5" />
                  <span className="text-lg">{place.province || 'Provinsi tidak tersedia'}</span>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">{place.description || 'Deskripsi tidak tersedia'}</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-10">Tempat Terkait</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPlaces.map((related, index) => (
                  <Link
                    key={related.id || index}
                    to={`/places/${related.id}`}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-gray-900 shadow-2xl">
                      <img
                        src={related.gambar || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'}
                        alt={related.name}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-white">{related.rating || 'N/A'}</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-bold mb-2">{related.name}</h3>
                        <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                          {related.description?.substring(0, 100) || 'Deskripsi tidak tersedia'}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          <img src={markerIcon} alt="Marker" className="w-4 h-4" />
                          <span>{related.province || 'Provinsi tidak tersedia'}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailWisata;
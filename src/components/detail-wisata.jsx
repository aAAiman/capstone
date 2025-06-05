import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Bookmark, BookmarkCheck, Star } from 'lucide-react';
import markerIcon from '../assets/marker.png';

const DetailWisata = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [relatedPlaces, setRelatedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/places/${id}`);
        setPlace(response.data);

        const relatedResponse = await axios.get(`http://localhost:5000/places`, {
          params: { province: response.data.province, notId: id },
        });
        setRelatedPlaces(relatedResponse.data.slice(0, 3));

        const token = localStorage.getItem('accessToken');
        if (token) {
          const wishlistResponse = await axios.get('http://localhost:5000/wishlist', {
            headers: { Authorization: `Bearer ${token}` },
          });

          const isSaved = wishlistResponse.data.some((item) => item.id === response.data.id);
          setIsBookmarked(isSaved);
        }

        setLoading(false);
      } catch (err) {
        setError('Gagal memuat detail tempat wisata');
        setLoading(false);
      }
    };

    fetchPlace();
  }, [id]);



  const handleBookmark = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('Kamu belum login!');
      return;
    }

    try {
      if (isBookmarked) {
        await axios.delete(`http://localhost:5000/wishlist/${place.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsBookmarked(false);
        alert('Tempat dihapus dari wishlist.');
      } else {
        await axios.post(
          'http://localhost:5000/wishlist',
          { placeId: place.id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsBookmarked(true);
        alert('Tempat ditambahkan ke wishlist.');
      }
    } catch (error) {
      console.error('Error response:', error.response?.data);
      alert(error.response?.data?.message || 'Gagal memproses wishlist.');
    }
  };



  if (loading) return <p className="text-white text-center">Sedang memuat...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!place) return <p className="text-white text-center">Tempat wisata tidak ditemukan</p>;

  const encodedGambar = place.gambar ? encodeURI(place.gambar) : 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop';
  return (
    <div className="min-h-screen bg-black text-white">
      <div
        className="relative h-screen flex items-end justify-start"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(${encodedGambar})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
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
                  <div key={index} className="group cursor-pointer">
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
                  </div>
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

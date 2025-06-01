import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Bookmark, Star, MapPin } from 'lucide-react';
import markerIcon from '../assets/marker.png';

const DetailWisata = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [relatedPlaces, setRelatedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        // Ambil data tempat wisata berdasarkan ID
        const response = await axios.get(`http://localhost:5000/places/${id}`);
        setPlace(response.data);

        // Ambil tempat terkait (dari provinsi yang sama, kecuali tempat ini)
        const relatedResponse = await axios.get(`http://localhost:5000/places`, {
          params: { province: response.data.province, notId: id },
        });
        setRelatedPlaces(relatedResponse.data.slice(0, 3)); // Ambil maksimal 3 tempat terkait
        setLoading(false);
      } catch (err) {
        setError('Gagal memuat detail tempat wisata');
        setLoading(false);
      }
    };
    fetchPlace();
  }, [id]);

  if (loading) return <p className="text-white text-center">Sedang memuat...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!place) return <p className="text-white text-center">Tempat wisata tidak ditemukan</p>;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section dengan Background Image */}
      <div
        className="relative h-screen flex items-end justify-start"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(${
            place.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop'
          })`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Content di bagian bawah kiri */}
        <div className="px-4 sm:px-8 mb-20 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{place.name}</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative -mt-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Content */}
          <div className="bg-black/95 backdrop-blur-sm rounded-t-3xl p-6 sm:p-8 lg:p-12 border-t border-gray-800">
            {/* Description */}
            <div className="mb-16">
              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center space-x-2 bg-yellow-500/20 px-4 py-2 rounded-full">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-lg font-semibold text-yellow-400">{place.rating || 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 group">
                    <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <img src={markerIcon} alt="Marker" className="w-5 h-5" />
                  <span className="text-lg">{place.province || 'Provinsi tidak tersedia'}</span>
                </div>
              </div>

              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                  {place.description || 'Deskripsi tidak tersedia'}
                </p>
              </div>
            </div>

            {/* Related Places */}
            <div>
              <h2 className="text-3xl font-bold mb-10">Tempat Terkait</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPlaces.map((related, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-2xl bg-gray-900 shadow-2xl">
                      <img
                        src={related.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'}
                        alt={related.name}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                      {/* Rating Badge */}
                      <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-white">{related.rating || 'N/A'}</span>
                      </div>

                      {/* Content */}
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
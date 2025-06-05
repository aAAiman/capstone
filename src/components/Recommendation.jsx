import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import markerIcon from '../assets/marker.png';
import bgLandingPage from '../assets/bg-landing-page.png';

const StarRating = ({ rating = 4.5 }) => (
  <div className="flex items-center gap-1">
    <span className="text-yellow-400 text-lg">★</span>
    <span className="text-white text-sm ml-1">{rating}</span>
  </div>
);

export default function Recommendation() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');
  const [province, setProvince] = useState('');
  const [category, setCategory] = useState('');

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/places');
      const data = await response.json();
      setPlaces(data);
    } catch (err) {
      console.error('Gagal memuat tempat wisata:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/places?description=${description}&province=${province}&category=${category}`);
      const data = await response.json();
      setPlaces(data);
    } catch (err) {
      console.error('Gagal mencari tempat wisata:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
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
        <h1 className="text-3xl md:text-4xl font-serif mb-4">Rekomendasi tempat wisata</h1>
        <div className="w-32 h-1 bg-white mx-auto"></div>
        <p className="text-gray-300 mt-4">Cari tempat wisata sesuai keinginan mu</p>
      </div>

      {/* Filter Dropdown & Input */}
      <div className="max-w-3xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <select
          className="bg-black border border-white/20 px-4 py-3 rounded text-white"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
        >
          <option value="">Pilih Provinsi</option>
          <option value="Jawa Barat">Jawa Barat</option>
          <option value="Jawa Tengah">Jawa Tengah</option>
          <option value="Jawa Timur">Jawa Timur</option>
        </select>
        <select
          className="bg-black border border-white/20 px-4 py-3 rounded text-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Tempat Wisata</option>
          <option value="Alam">Alam</option>
          <option value="Budaya">Budaya</option>
          <option value="Sejarah">Sejarah</option>
          <option value="Religi">Religi</option>
          <option value="Edukasi">Edukasi</option>
        </select>
      </div>

      <div className="max-w-3xl mx-auto mb-6 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Contoh: suasana alam yang tenang dan sejuk"
          className="w-full px-4 py-3 rounded border border-white/20 bg-black text-white placeholder-gray-400"
        />
        <button
          onClick={handleSearch}
          className="bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition"
        >
          Search
        </button>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <p className="text-center text-xl">Memuat rekomendasi...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {places.map((place, index) => (
              <div
                key={place.id}
                className="group bg-black border border-white/10 hover:border-white/30 transition-all duration-700 transform hover:scale-105"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={place.gambar || 'https://source.unsplash.com/300x200/?travel'}
                    alt={place.name}
                    className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-light mb-2 text-white tracking-wide group-hover:text-gray-300 transition-colors duration-300">
                    {place.name}
                  </h3>
                  <StarRating rating={place.rating} />
                  <p className="text-sm text-gray-400 mt-4 mb-6 leading-relaxed font-light">
                    {place.description?.substring(0, 110) || 'Deskripsi tidak tersedia'}...
                  </p>
                  <div className="flex items-center gap-3 mb-8 text-xs text-gray-500 font-light">
                    <img src={markerIcon} alt="Marker" className="w-3 h-3 opacity-50" />
                    <span className="tracking-wider uppercase">
                      {place.province || place.adres || 'Lokasi tidak tersedia'}
                    </span>
                  </div>

                  <Link
                    to={`/places/${place.id}`}
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
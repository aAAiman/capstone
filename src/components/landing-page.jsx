import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import bgLandingPage from '../assets/bg-landing-page.png';
import markerIcon from '../assets/marker.png';

export default function LandingPage() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil data dari API saat komponen dimuat
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get('http://localhost:5000/places');
        // Ambil 6 data teratas
        setPlaces(response.data.slice(0, 6));
        setLoading(false);
      } catch (error) {
        setError('Gagal memuat data tempat wisata');
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <div
        className="h-screen flex items-center justify-center text-center px-4"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.9)), url(${bgLandingPage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <h1 className="text-white text-4xl md:text-6xl lg:text-8xl max-w-4xl">
          Jelajahi Keindahan Pulau Jawa Tanpa Bingung Pilih Tujuan
        </h1>
      </div>

      {/* Garis pemisah */}
      <div className="flex justify-center my-8">
        <div className="w-3/4 h-[5px] bg-white" />
      </div>

      {/* Section bawah (TOP 6) */}
      <section id="top6" className="bg-black text-white py-12 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">TOP 6 Tempat Wisata Di Pulau Jawa</h2>

        {loading ? (
          <p>Sedang memuat...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {places.map((place) => (
              <div key={place.id} className="bg-black rounded-xl overflow-hidden shadow-md border border-white">
                <img
                  src="https://source.unsplash.com/300x200/?mountain" // Ganti dengan place.image jika kolom image diaktifkan
                  alt={place.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-left">
                  <h3 className="text-lg font-bold">{place.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {place.description?.substring(0, 100) || 'Deskripsi tidak tersedia'}...
                  </p>
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <img src={markerIcon} alt="Marker" className="w-3 h-3" />
                    {place.province || 'Provinsi tidak tersedia'}
                  </p>
                  <Link
                    to={`/places/${place.id}`}
                    className="mt-4 px-6 py-1 border border-white text-white rounded-full bg-transparent hover:bg-white hover:text-black transition duration-300 inline-block"
                  >
                    Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Garis pemisah */}
      <div className="flex justify-center my-8">
        <div className="w-3/4 h-[5px] bg-white" />
      </div>
    </div>
  );
}
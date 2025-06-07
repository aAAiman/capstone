import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import bgLandingPage from '../assets/bg-landing-page.png';
import markerIcon from '../assets/marker.png';

export default function LandingPage() {
  const [topPlaces, setTopPlaces] = useState([]);
  const [beachPlaces, setBeachPlaces] = useState([]);
  const [mountainPlaces, setMountainPlaces] = useState([]);
  const [loading, setLoading] = useState({
    top: true,
    beach: true,
    mountain: true,
  });
  const [error, setError] = useState({
    top: null,
    beach: null,
    mountain: null,
  });
  const [isVisible, setIsVisible] = useState({});


  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get('https://capstone-backend-nvhm.vercel.app/places');
        const allPlaces = response.data;

        setTopPlaces(allPlaces.slice(0, 6));

        setBeachPlaces(
          allPlaces
            .filter((place) =>
              place.description?.toLowerCase().includes('pantai')
            )
            .slice(0, 6)
        );

        setMountainPlaces(
          allPlaces
            .filter((place) =>
              place.description?.toLowerCase().includes('gunung')
            )
            .slice(0, 6)
        );

        setLoading({ top: false, beach: false, mountain: false });
      } catch (err) {
        setError({
          top: 'Gagal memuat data tempat wisata',
          beach: 'Gagal memuat data wisata pantai',
          mountain: 'Gagal memuat data wisata gunung',
        });
        setLoading({ top: false, beach: false, mountain: false });
      }
    };
    fetchPlaces();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const renderPlaces = (places, loadingKey, errorKey, title, delay = 0) => (
    <section
      id={title.toLowerCase().replace(/\s+/g, '-')}
      data-animate
      className={`bg-black text-white py-20 px-4 text-center transition-all duration-1000 transform ${isVisible[title.toLowerCase().replace(/\s+/g, '-')]
        ? 'translate-y-0 opacity-100'
        : 'translate-y-16 opacity-0'
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-white tracking-wide">
          {title}
        </h2>
        <div className="w-24 h-px bg-white mx-auto mb-16 opacity-60"></div>

        {loading[loadingKey] ? (
          <div className="flex justify-center items-center py-16">
            <div className="relative">
              <div className="w-16 h-16 border border-white/20 border-t-white rounded-full animate-spin"></div>
              <div className="w-12 h-12 border border-white/10 border-t-white/50 rounded-full animate-spin absolute top-2 left-2" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
          </div>
        ) : error[loadingKey] ? (
          <div className="border border-white/20 rounded-sm p-8 max-w-md mx-auto">
            <p className="text-gray-400 font-light">{error[loadingKey]}</p>
          </div>
        ) : places.length === 0 ? (
          <div className="border border-white/20 rounded-sm p-8 max-w-md mx-auto">
            <p className="text-gray-400 font-light">Tidak ada data {title.toLowerCase()} tersedia</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {places.map((place, index) => (
              <div
                key={place.id}
                className={`group bg-black border border-white/10 hover:border-white/30 transition-all duration-700 transform hover:scale-105 ${isVisible[title.toLowerCase().replace(/\s+/g, '-')]
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-12 opacity-0'
                  }`}
                style={{
                  transitionDelay: `${delay + (index * 150)}ms`
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={place.gambar}
                    alt={place.name}
                    className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>


                  <div className="absolute bottom-0 left-0 w-full h-px bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-light mb-4 text-white tracking-wide group-hover:text-gray-300 transition-colors duration-300">
                    {place.name}
                  </h3>
                  <div className="text-yellow-400 text-lg text-center w-full mb-2">★ <span className="text-white">{place.rating}</span></div>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed font-light">
                    {place.description?.substring(0, 110) || 'Deskripsi tidak tersedia'}...
                  </p>
                  <div className="flex items-center gap-3 mb-8 text-xs text-gray-500 font-light">
                    <img src={markerIcon} alt="Marker" className="w-3 h-3 opacity-50" />
                    <span className="tracking-wider uppercase">{place.province || 'Provinsi tidak tersedia'}</span>
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
    </section>
  );

  return (
    <div className="bg-black">
      <div
        className="relative h-screen flex items-center justify-center text-center px-4"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(${bgLandingPage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-px h-32 bg-white rotate-45 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-px h-24 bg-white -rotate-45 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-px h-28 bg-white rotate-12 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <h1 className="text-white font-light mb-8 animate-fade-in-up tracking-wide">
            <span className="block text-5xl md:text-7xl lg:text-9xl mb-6">
              Jelajahi Keindahan
            </span>
            <span className="block text-2xl md:text-4xl lg:text-5xl opacity-80">
              Pulau Jawa Tanpa Bingung Pilih Tujuan
            </span>
          </h1>

          <div className="w-32 h-px bg-white mx-auto mb-8 opacity-60"></div>

          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light animate-fade-in-up tracking-wide" style={{ animationDelay: '0.5s' }}>
            Temukan destinasi wisata terbaik di Pulau Jawa dengan panduan lengkap dan terpercaya
          </p>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-px h-16 bg-white/40"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full mx-auto mt-2 animate-pulse"></div>
        </div>
      </div>

      <div className="flex justify-center my-16">
        <div className="flex items-center gap-4">
          <div className="w-16 h-px bg-white/20"></div>
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          <div className="w-32 h-px bg-white/30"></div>
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          <div className="w-16 h-px bg-white/20"></div>
        </div>
      </div>

      <div id="top6">
        {renderPlaces(topPlaces, 'top', 'top', 'TOP 6 Tempat Wisata Di Pulau Jawa', 0)}
      </div>

      <div className="flex justify-center my-16">
        <div className="flex items-center gap-4">
          <div className="w-16 h-px bg-white/20"></div>
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          <div className="w-32 h-px bg-white/30"></div>
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          <div className="w-16 h-px bg-white/20"></div>
        </div>
      </div>

      <div id="pantai">
        {renderPlaces(beachPlaces, 'beach', 'beach', 'Wisata Pantai Terpopuler', 200)}
      </div>


      <div className="flex justify-center my-16">
        <div className="flex items-center gap-4">
          <div className="w-16 h-px bg-white/20"></div>
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          <div className="w-32 h-px bg-white/30"></div>
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          <div className="w-16 h-px bg-white/20"></div>
        </div>
      </div>

      <div id="gunung">
        {renderPlaces(mountainPlaces, 'mountain', 'mountain', 'Wisata Gunung Terpopuler', 400)}
      </div>

      <div className="flex justify-center my-16">
        <div className="flex items-center gap-4">
          <div className="w-16 h-px bg-white/20"></div>
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          <div className="w-32 h-px bg-white/30"></div>
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          <div className="w-16 h-px bg-white/20"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
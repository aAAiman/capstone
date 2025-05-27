import React from 'react';
import { Link } from 'react-router-dom';
import bgLandingPage from '../assets/bg-landing-page.png';
import markerIcon from '../assets/marker.png';
import danau from '../assets/danau-1.jpg';
import gunung1 from '../assets/gunung-1.jpg';
import gunung2 from '../assets/gunung-2.jpg';
import hutan from '../assets/hutan-1.jpg';
import pantai from '../assets/pantai-1.jpg';
import airterjun from '../assets/airterjun-1.jpg';

export default function LandingPage() {
 
  const places = [
    {
      id: 1,
      name: "Gunung Jawa",
      description: "Gunung Jawa merupakan tempat wisata yang indah dan sejuk dengan pemandangan alam yang menakjubkan.",
      location: "Jawa Barat",
      rating: 4.5,
      image: gunung1,
      backgroundImage: "https://via.placeholder.com/1200x600?text=Gunung+Jawa+Background",
      relatedPlaces: [
        { name: "Pantai Jawa", rating: 4.5, source: "Jawa Timur", image: "https://via.placeholder.com/300x200?text=Pantai+Jawa" },
        { name: "Gunung Jawa", rating: 4.5, source: "Jawa Tengah", image: "https://via.placeholder.com/300x200?text=Gunung+Jawa" },
        { name: "Gunung Jawa Juga", rating: 4.5, source: "Jawa Barat", image: "https://via.placeholder.com/300x200?text=Gunung+Jawa+Juga" },
      ],
    },
    {
      id: 2,
      name: "Pantai Jawa",
      description: "Pantai Jawa menawarkan pasir putih dan ombak yang tenang, cocok untuk liburan keluarga.",
      location: "Jawa Timur",
      rating: 4.3,
      image: pantai,
      backgroundImage: "https://via.placeholder.com/1200x600?text=Pantai+Jawa+Background",
      relatedPlaces: [
        { name: "Pantai Jawa", rating: 4.5, source: "Jawa Timur", image: "https://via.placeholder.com/300x200?text=Pantai+Jawa" },
        { name: "Gunung Jawa", rating: 4.5, source: "Jawa Tengah", image: "https://via.placeholder.com/300x200?text=Gunung+Jawa" },
        { name: "Gunung Jawa Juga", rating: 4.5, source: "Jawa Barat", image: "https://via.placeholder.com/300x200?text=Gunung+Jawa+Juga" },
      ],
    },
    {
      id: 3,
      name: "Gunung Jawa Juga",
      description: "Terletak di Pulau Jawa, Gunung Jawa Juga adalah salah satu tempat terbaik untuk menikmati pemandangan alam yang menakjubkan.",
      location: "Jawa Barat",
      rating: 4.5,
      image: gunung2,
      backgroundImage: "https://via.placeholder.com/1200x600?text=Gunung+Jawa+Juga+Background",
      relatedPlaces: [
        { name: "Pantai Jawa", rating: 4.5, source: "Jawa Timur", image: "https://via.placeholder.com/300x200?text=Pantai+Jawa" },
        { name: "Gunung Jawa", rating: 4.5, source: "Jawa Tengah", image: "https://via.placeholder.com/300x200?text=Gunung+Jawa" },
        { name: "Gunung Jawa Juga", rating: 4.5, source: "Jawa Barat", image: "https://via.placeholder.com/300x200?text=Gunung+Jawa+Juga" },
      ],
    },
    {
      id: 4,
      name: "Hutan Jawa",
      description: "Hutan Jawa menyediakan udara segar dan trekking yang menantang untuk para petualang.",
      location: "Jawa Tengah",
      rating: 4.2,
      image: hutan,
      backgroundImage: "https://via.placeholder.com/1200x600?text=Hutan+Jawa+Background",
      relatedPlaces: [
        { name: "Pantai Jawa", rating: 4.5, source: "Jawa Timur", image: "https://via.placeholder.com/300x200?text=Pantai+Jawa" },
        { name: "Gunung Jawa", rating: 4.5, source: "Jawa Tengah", image: "https://via.placeholder.com/300x200?text=Gunung+Jawa" },
        { name: "Gunung Jawa Juga", rating: 4.5, source: "Jawa Barat", image: "https://via.placeholder.com/300x200?text=Gunung+Jawa+Juga" },
      ],
    },
    {
      id: 5,
      name: "Danau Jawa",
      description: "Danau Jawa adalah tempat yang damai untuk bersantai sambil menikmati pemandangan air yang jernih.",
      location: "Jawa Barat",
      rating: 4.4,
      image: danau,
      backgroundImage: "https://via.placeholder.com/1200x600?text=Danau+Jawa+Background",
      relatedPlaces: [
        { name: "Pantai Jawa", rating: 4.5, source: "Jawa Timur", image: "https://via.placeholder.com/300x200?text=Pantai+Jawa" },
        { name: "Gunung Jawa", rating: 4.5, source: "Jawa Tengah", image: "https://via.placeholder.com/300x200?text=Gunung+Jawa" },
        { name: "Gunung Jawa Juga", rating: 4.5, source: "Jawa Barat", image: "https://via.placeholder.com/300x200?text=Gunung+Jawa+Juga" },
      ],
    },
    {
      id: 6,
      name: "Air Terjun Jawa",
      description: "Air Terjun Jawa menawarkan keindahan alam dengan suara air yang menenangkan.",
      location: "Jawa Timur",
      rating: 4.6,
      image: airterjun,
      backgroundImage: "https://via.placeholder.com/1200x600?text=Air+Terjun+Jawa+Background",
      relatedPlaces: [
        { name: "Pantai Jawa", rating: 4.5, source: "Jawa Timur", image: "https://via.placeholder.com/300x200?text=Pantai+Jawa" },
        { name: "Gunung Jawa", rating: 4.5, source: "Jawa Tengah", image: "https://via.placeholder.com/300x200?text=Gunung+Jawa" },
        { name: "Gunung Jawa Juga", rating: 4.5, source: "Jawa Barat", image: "https://via.placeholder.com/300x200?text=Gunung+Jawa+Juga" },
      ],
    },
  ];

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <div
        className="h-screen flex items-center justify-center text-center px-4"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.9)), url(${bgLandingPage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
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
      <section id='top6' className="bg-black text-white py-12 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">TOP 6 Tempat Wisata Di Pulau Jawa</h2>

        {/* Kartu Wisata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {places.map((place) => (
            <div key={place.id} className="bg-black rounded-xl overflow-hidden shadow-md border border-white">
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-left">
                <h3 className="text-lg font-bold">{place.name}</h3>
                <p className="text-sm text-gray-400 mt-1">
                  {place.description}
                </p>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <img src={markerIcon} alt="Marker" className="w-3 h-3" />
                  {place.location}
                </p>

                <Link to={`/detail-wisata/${place.id}`}>
                  <button className="mt-4 px-6 py-1 border border-white text-white rounded-full bg-transparent hover:bg-white hover:text-black transition duration-300">
                    Detail
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Garis pemisah */}
      <div className="flex justify-center my-8">
        <div className="w-3/4 h-[5px] bg-white" />
      </div>
    </div>
  );
}
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Bookmark, Heart, Star, MapPin } from "lucide-react";

// Asset images
import danau from '../assets/danau-1.jpg';
import gunung1 from '../assets/gunung-1.jpg';
import gunung2 from '../assets/gunung-2.jpg';
import hutan from '../assets/hutan-1.jpg';
import pantai from '../assets/pantai-1.jpg';
import airterjun from '../assets/airterjun-1.jpg';
import markerIcon from '../assets/marker.png';

const DetailWisata = () => {
  const places = [
    {
      id: 1,
      name: "Gunung Jawa",
      description: "Gunung Jawa merupakan tempat wisata yang indah dan sejuk dengan pemandangan alam yang menakjubkan.",
      location: "Jawa Barat",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      backgroundImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
      detailedDescription: "Terletak di gunung Pulau Jawa, Gunung Jawa adalah salah satu tempat terbaik untuk menikmati alam. Gunung ini menawarkan pemandangan yang luar biasa indah, mulai dari hamparan hijau hingga puncak yang spektakuler. Dengan ketinggian lebih dari 2.000 meter di atas permukaan laut, tempat ini cocok untuk para petualang yang menyukai tantangan.\n\nDi kaki gunung, terdapat sebuah kawah vulkanik yang masih aktif dan danau, ditutupi oleh perteduhan rindang ceria aliran vulkanis yang cemek. Suasana sejuk dan tenang di kawasan ini menjadi tempat ideal untuk berkemah, piknik, atau hanya sekedar menikmati keindahan alam.\n\nGunung Jawa juga cocok untuk pendaki pemula maupun pengunjung yang hanya ingin menikmati keindahan alam tanpa harus mendaki terlalu tinggi. Tempat ini juga menjadi spot favorit para fotografer alam karena keindahan alamnya yang begitu menawan.",
      relatedPlaces: [
        {
          name: "Pantai Jawa",
          rating: 4.5,
          description: "Pantai Jawa menawarkan pasir putih dan ombak yang tenang, cocok untuk liburan keluarga dan aktivitas air.",
          source: "Jawa Timur",
          image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
        },
        {
          name: "Gunung Jawa",
          rating: 4.5,
          description: "Gunung Jawa menyediakan udara segar dan pemandangan yang menakjubkan untuk para petualang.",
          source: "Jawa Tengah",
          image: gunung1,
        },
        {
          name: "Gunung Jawa Juga",
          rating: 4.5,
          description: "Terletak di Pulau Jawa, Gunung Jawa Juga adalah salah satu tempat terbaik untuk menikmati pemandangan alam yang menakjubkan.",
          source: "Jawa Barat",
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        },
      ],
    },
    {
      id: 2,
      name: "Pantai Jawa",
      description: "Pantai Jawa menawarkan pasir putih dan ombak yang tenang, cocok untuk liburan keluarga.",
      location: "Jawa Timur",
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      backgroundImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop",
      detailedDescription: "Pantai Jawa adalah destinasi wisata pantai yang menawarkan keindahan alam laut yang memukau...",
      relatedPlaces: [
        { name: "Pantai Jawa", rating: 4.5, source: "Jawa Timur", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop", description: "Pantai dengan pasir putih yang indah" },
        { name: "Gunung Jawa", rating: 4.5, source: "Jawa Tengah", image: "https://images.unsplash.com/photo-1464822759844-d150baec0494?w=400&h=300&fit=crop", description: "Gunung dengan pemandangan spektakuler" },
        { name: "Gunung Jawa Juga", rating: 4.5, source: "Jawa Barat", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", description: "Destinasi pendakian yang menantang" },
      ],
    },
    {
      id: 3,
      name: "Gunung Jawa Juga",
      description: "Terletak di Pulau Jawa, Gunung Jawa Juga adalah salah satu tempat terbaik untuk menikmati pemandangan alam yang menakjubkan.",
      location: "Jawa Barat",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      backgroundImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
      detailedDescription: "Terletak di gunung Pulau Jawa, Gunung Jawa Juga adalah salah satu tempat terbaik untuk menikmati alam. Gunung ini menawarkan pemandangan yang luar biasa indah, mulai dari hamparan hijau hingga puncak yang spektakuler. Dengan ketinggian lebih dari 2.000 meter di atas permukaan laut, tempat ini cocok untuk para petualang yang menyukai tantangan.\n\nDi kaki gunung, terdapat sebuah kawah vulkanik yang masih aktif dan danau, ditutupi oleh perteduhan rindang ceria aliran vulkanis yang cemek. Suasana sejuk dan tenang di kawasan ini menjadi tempat ideal untuk berkemah, piknik, atau hanya sekedar menikmati keindahan alam.\n\nGunung Jawa Juga juga cocok untuk pendaki pemula maupun pengunjung yang hanya ingin menikmati keindahan alam tanpa harus mendaki terlalu tinggi. Tempat ini juga menjadi spot favorit para fotografer alam karena keindahan alamnya yang begitu menawan.",
      relatedPlaces: [
        { name: "Pantai Jawa", rating: 4.5, source: "Jawa Timur", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop", description: "Pantai dengan pasir putih yang indah" },
        { name: "Gunung Jawa", rating: 4.5, source: "Jawa Tengah", image: gunung1, description: "Gunung dengan pemandangan spektakuler" },
        { name: "Gunung Jawa Juga", rating: 4.5, source: "Jawa Barat", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", description: "Destinasi pendakian yang menantang" },
      ],
    },
  ];


  const place = places.find(p => p.id === 3);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section dengan Background Image */}
      <div
        className="relative h-screen flex items-end justify-start"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(${place.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Content di bagian bawah kiri */}
        <div className="px-4 sm:px-8 mb-20 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {place.name}
          </h1>

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
                  <span className="text-lg font-semibold text-yellow-400">{place.rating}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 group">
                    <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>

                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{place.location}</span>
                </div>

              </div>

              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                  {place.detailedDescription || place.description}
                </p>
              </div>
            </div>

            {/* Related Places */}
            <div>
              <h2 className="text-3xl font-bold mb-10">Tempat Terkait</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {place.relatedPlaces.map((related, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-2xl bg-gray-900 shadow-2xl">
                      <img
                        src={related.image}
                        alt={related.name}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                      {/* Rating Badge */}
                      <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-white">{related.rating}</span>
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-bold mb-2">{related.name}</h3>
                        <p className="text-sm text-gray-300 mb-3 line-clamp-2">{related.description}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span>{related.source}</span>
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

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


// Data dummy untuk wishlist - nantinya bisa diganti dengan data dari API
const wishlistData = [
  {
    id: 1,
    name: "Pantai Jawa",
    description: "Pantai Jawa merupakan tempat wisata yang sangat indah di mana terdapat laut biru yang biasanya dikunjungi untuk berlibur dan menikmati panorama yang indah dan sangat bagus untuk dinikamti.",
    location: "Bantul, Jawa Barat",
    rating: 4.5,
    image: "https://drive.google.com/uc?export=view&id=11PGpNnYoNsMcwJ6uzdDk_Yii8yUwlicR"
  },
  {
    id: 2,
    name: "Gunung Jawa",
    description: "Gunung Jawa merupakan tempat wisata yang sangat indah di mana terdapat danau biru yang biasanya dikunjungi untuk berlibur dan menikmati panorama yang indah dan sangat bagus untuk dinikmati.",
    location: "Bantul, Jawa Barat",
    rating: 4.5,
    image: "https://drive.google.com/uc?export=view&id=11PGpNnYoNsMcwJ6uzdDk_Yii8yUwlicR"
  },
  {
    id: 3,
    name: "Gunung Jawa Joga",
    description: "Gunung Jawa Joga merupakan tempat wisata yang sangat indah di mana terdapat danau biru yang biasanya dikunjungi untuk berlibur dan menikmati panorama yang indah dan sangat bagus untuk dinikmati.",
    location: "Bantul, Jawa Barat",
    rating: 4.5,
    image: "https://drive.google.com/file/d/11PGpNnYoNsMcwJ6uzdDk_Yii8yUwlicR/view?usp=drive_link"
  },
  {
    id: 4,
    name: "Pantai Jawa",
    description: "Pantai Jawa merupakan tempat wisata yang sangat indah di mana terdapat laut biru yang biasanya dikunjungi untuk berlibur dan menikmati panorama yang indah dan sangat bagus untuk dinikamti.",
    location: "Bantul, Jawa Barat",
    rating: 4.5,
    image: "https://drive.google.com/file/d/11PGpNnYoNsMcwJ6uzdDk_Yii8yUwlicR/view?usp=drive_link"
  },
  {
    id: 5,
    name: "Gunung Jawa",
    description: "Gunung Jawa merupakan tempat wisata yang sangat indah di mana terdapat danau biru yang biasanya dikunjungi untuk berlibur dan menikmati panorama yang indah dan sangat bagus untuk dinikmati.",
    location: "Bantul, Jawa Barat",
    rating: 4.5,
    image: "https://drive.google.com/file/d/11PGpNnYoNsMcwJ6uzdDk_Yii8yUwlicR/view?usp=drive_link"
  },
  {
    id: 6,
    name: "Gunung Jawa Joga",
    description: "Gunung Jawa Joga merupakan tempat wisata yang sangat indah di mana terdapat danau biru yang biasanya dikunjungi untuk berlibur dan menikmati panorama yang indah dan sangat bagus untuk dinikmati.",
    location: "Bantul, Jawa Barat",
    rating: 4.5,
    image: "https://drive.google.com/file/d/11PGpNnYoNsMcwJ6uzdDk_Yii8yUwlicR/view?usp=drive_link"
  }
];

// Komponen untuk menampilkan rating bintang
const StarRating = ({ rating }) => {
  const fullStar = Math.floor(rating) >= 1;

  return (
    <div className="flex items-center gap-1">
      <span className="text-yellow-400 text-lg">
        {fullStar ? '★' : '☆'}
      </span>
      <span className="text-white text-sm ml-1">{rating}</span>
    </div>
  );
};

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading data
    setTimeout(() => {
      setWishlistItems(wishlistData);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div
      className="min-h-screen text-white py-20 px-4"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-serif mb-4">Wishlist tempat wisata</h1>
        <div className="w-32 h-1 bg-white mx-auto"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center">
            <p className="text-xl">Memuat wishlist...</p>
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="text-center">
            <p className="text-xl">Wishlist Anda masih kosong</p>
            <button
              onClick={() => window.location.href = '/'}
              className="mt-4 inline-block px-6 py-2 border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300"
            >
              Jelajahi Tempat Wisata
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-black bg-opacity-80 rounded-2xl overflow-hidden border border-gray-600 hover:border-white transition duration-300">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Title and Rating */}
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                    <StarRating rating={item.rating} />
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                    {item.description.length > 100
                      ? `${item.description.substring(0, 100)}...`
                      : item.description
                    }
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-400 text-sm">{item.location}</span>
                  </div>

                  {/* Detail Button */}
                  <button
                    onClick={() => window.location.href = `/detail-wisata/${item.id}`}
                    className="w-full block text-center py-2 px-4 border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300"
                  >
                    Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
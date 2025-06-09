import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, X, Check } from 'lucide-react';
import markerIcon from '../assets/marker.png';
import bgLandingPage from '../assets/bg-landing-page.png';

const MultiSelectDropdown = ({
  categories,
  selectedLabels,
  onLabelChange,
  placeholder = "Pilih kategori..."
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const removeLabel = (category) => {
    onLabelChange(category);
  };

  const clearAll = () => {
    selectedLabels.forEach(label => onLabelChange(label));
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-black border border-white/20 rounded px-4 py-3 text-left text-white flex items-center justify-between hover:border-white/40 transition-colors"
      >
        <div className="flex-1">
          {selectedLabels.length === 0 ? (
            <span className="text-gray-400">{placeholder}</span>
          ) : (
            <div className="flex flex-wrap gap-1">
              {selectedLabels.map((label) => (
                <span
                  key={label}
                  className="bg-blue-600 text-white px-2 py-1 rounded text-sm flex items-center gap-1"
                >
                  {label}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      removeLabel(label);
                    }}
                    className="hover:bg-blue-700 rounded-full p-0.5"
                  >
                    <X size={12} />
                  </span>
                </span>
              ))}
            </div>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''
            }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-black border border-white/20 rounded shadow-lg z-10">
          {selectedLabels.length > 0 && (
            <div className="px-4 py-2 border-b border-white/10">
              <button
                onClick={clearAll}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Hapus Semua
              </button>
            </div>
          )}

          {/* Options */}
          <div className="py-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onLabelChange(category)}
                className="w-full px-4 py-2 text-left text-white hover:bg-white/10 flex items-center justify-between transition-colors"
              >
                <span>{category}</span>
                {selectedLabels.includes(category) && (
                  <Check size={16} className="text-blue-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function Recommendation() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [province, setProvince] = useState('');
  const [selectedLabels, setSelectedLabels] = useState([]);
  const categories = ['Alam', 'Budaya', 'Sejarah', 'Religi', 'Edukasi'];

  const handleLabelChange = (category) => {
    setSelectedLabels((prev) =>
      prev.includes(category)
        ? prev.filter((label) => label !== category)
        : [...prev, category]
    );
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://capstone-cc25-cf102.revivaaiman.my.id/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          province,
          selected_labels: selectedLabels.map((label) => label.toLowerCase()),
          description,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal mengambil rekomendasi');
      }

      const data = await response.json();
      if (data.error) {
        alert(data.error);
        setPlaces([]);
      } else {
        setPlaces(
          data.recommendations.map((place, index) => ({
            id: place.id,
            name: place.place_name,
            province: place.province,
            description: place.deskripsi,
            rating: place.rating,
            gambar: place.gambar || 'https://source.unsplash.com/300x200/?travel',
          }))
        );
      }
    } catch (err) {
      console.error('Gagal mencari tempat wisata:', err);
      alert('Gagal mengambil rekomendasi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Places:', places);
  }, [places]);

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
        <h1 className="text-3xl md:text-4xl font-serif mb-4">Rekomendasi Tempat Wisata</h1>
        <div className="w-32 h-1 bg-white mx-auto"></div>
        <p className="text-gray-300 mt-4">Cari tempat wisata sesuai keinginanmu</p>
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

        {/* Fixed: Single MultiSelectDropdown component, not in map */}
        <MultiSelectDropdown
          categories={categories}
          selectedLabels={selectedLabels}
          onLabelChange={handleLabelChange}
          placeholder="Pilih kategori wisata..."
        />
      </div>

      <div className="max-w-3xl mx-auto mb-6 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Contoh: suasana alam yang tenang dan sejuk"
          className="w-full px-4 py-3 rounded border border-white/20 bg-black text-white placeholder-gray-400"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          onClick={handleSearch}
          className="bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition"
        >
          Cari
        </button>
      </div>


      {/* Cards */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <p className="text-center text-xl">Memuat rekomendasi...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {places.map((place) => (
              <div
                key={place.id}
                className="group bg-black border border-white/10 hover:border-white/30 transition-all duration-700 transform hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={place.gambar || 'https://source.unsplash.com/300x200/?travel'}
                    alt={place.name}
                    className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://source.unsplash.com/300x200/?travel'; 
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-light mb-4 text-white tracking-wide group-hover:text-gray-300 transition-colors duration-300 text-center">
                    {place.name}
                  </h3>

                  <div className="text-yellow-400 text-lg text-center w-full mb-2">★ <span className="text-white">{place.rating}</span></div>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed font-light text-center">
                    {place.description?.substring(0, 110) || 'Deskripsi tidak tersedia'}...
                  </p>

                  <div className="flex items-center gap-3 mb-8 text-xs text-gray-500 font-light">
                    <img src={markerIcon} alt="Marker" className="w-3 h-3 opacity-50" />
                    <span className="tracking-wider uppercase">{place.province}</span>
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
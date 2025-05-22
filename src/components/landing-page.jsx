import React from 'react';
import { Link } from 'react-router-dom';
import bgLandingPage from '../assets/bg-landing-page.png';
import markerIcon from '../assets/marker.png';


export default function LandingPage() {
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

                {/* Placeholder Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="bg-black rounded-xl overflow-hidden shadow-md border border-white">
                            <img
                                src="https://source.unsplash.com/300x200/?mountain"
                                alt="Wisata"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 text-left">
                                <h3 className="text-lg font-bold">Gunung Jawa</h3>
                                <p className="text-sm text-gray-400 mt-1">
                                    Gunung Jawa merupakan tempat wisata yang indah dan sejuk...
                                </p>
                                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                    <img src={markerIcon} alt="Marker" className="w-3 h-3" />
                                    Jawa Barat
                                </p>

                                <button className="mt-4 px-6 py-1 border border-white text-white rounded-full bg-transparent hover:bg-white hover:text-black transition duration-300">
                                    Detail
                                </button>

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

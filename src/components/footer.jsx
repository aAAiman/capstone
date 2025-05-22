import React from "react";

export default function Footer() {
    return (
        <footer className="bg-black text-white py-8 mt-10">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6">

                {/* Brand / Logo */}
                <div>
                    <h2 className="text-2xl font-bold">WisataIndo</h2>
                    <p className="mt-2 text-gray-400 text-sm">
                        Temukan destinasi wisata terbaik di seluruh Indonesia.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Menu</h3>
                    <ul className="text-gray-400 text-sm space-y-1">
                        <li><a href="#" className="hover:text-white transition">Beranda</a></li>
                        <li><a href="#" className="hover:text-white transition">Tentang</a></li>
                        <li><a href="/#top6" className="hover:text-white transition">Destinasi Top 6</a></li>
                        <li><a href="#" className="hover:text-white transition">Kontak</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Ikuti Kami</h3>
                    <div className="flex space-x-4 mt-2">
                        <a href="#" className="hover:text-blue-400 transition">Facebook</a>
                        <a href="#" className="hover:text-sky-400 transition">Twitter</a>
                        <a href="#" className="hover:text-pink-500 transition">Instagram</a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
                © {new Date().getFullYear()} WisataIndo. All rights reserved.
            </div>
        </footer>
    );
};

import React from "react";

export default function Footer() {
    return (
        <footer className="bg-black text-white py-8 mt-10">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                {/* Brand / Logo */}
                <div>
                    <h2 className="text-2xl font-bold">JelajahJawa.ID</h2>
                    <p className="mt-2 text-gray-400 text-sm">
                        Temukan destinasi wisata terbaik di seluruh Pulau Jawa hanya di JelajahJawa.ID.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Menu</h3>
                    <ul className="text-gray-400 text-sm space-y-1">
                        <li><a href="/" className="hover:text-white transition">Home</a></li>
                        <li><a href="/rekomendasi" className="hover:text-white transition">Rekomendasi</a></li>
                        <li><a href="/wishlist" className="hover:text-white transition">Wishlist</a></li>
                    </ul>
                </div>

                {/* Sections in Landing Page */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Destinasi</h3>
                    <ul className="text-gray-400 text-sm space-y-1">
                        <li><a href="/#top6" className="hover:text-white transition">Top 6</a></li>
                        <li><a href="/#pantai" className="hover:text-white transition">Pantai</a></li>
                        <li><a href="/#gunung" className="hover:text-white transition">Gunung</a></li>
                    </ul>
                </div>

                {/* Kontak */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Kontak</h3>
                    <ul className="text-gray-400 text-sm space-y-1">
                        <li>Email: <a href="mailto:admin@jelajahjawa.id" className="hover:text-white transition">support@jelajahjawa.id</a></li>
                        <li>WhatsApp: <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">+62 812 3456 7890</a></li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
                © {new Date().getFullYear()} JelajahJawa.ID. All rights reserved.
            </div>
        </footer>
    );
};

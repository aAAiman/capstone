export default function TermsModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-xl w-full shadow-lg relative">
        <button
          className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
        <p className="mb-3 text-gray-700">
          Dengan menggunakan aplikasi ini, Anda setuju pada syarat dan ketentuan berikut:
        </p>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>Tidak menggunakan aplikasi untuk tujuan ilegal.</li>
          <li>Konten dan data milik pengguna dilindungi undang-undang.</li>
          <li>Perubahan dapat dilakukan sewaktu-waktu oleh pengembang.</li>
        </ul>
        <p className="mt-6 text-sm text-gray-500">Terakhir diperbarui: 8 Juni 2025</p>
      </div>
    </div>
  );
}

import { Navigate } from "react-router-dom";

// Mengambil informasi autentikasi pengguna
import { useAuth } from "../utils/AuthContext";

// Komponen untuk melindungi halaman berdasarkan status login dan role
function ProtectedRoute({ children, allowedRoles }) {
  // Mengambil data pengguna dan status loading
  const { user, isLoading } = useAuth();

  // Menunggu proses pemeriksaan autentikasi selesai
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">Memeriksa autentikasi...</p>
      </div>
    );
  }

  // Mengarahkan pengguna yang belum login ke halaman login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Memeriksa apakah role pengguna diizinkan
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-600">Akses Ditolak</h1>

        <p className="mt-2 text-gray-600">
          Anda tidak memiliki izin untuk mengakses halaman ini.
        </p>

        <a
          href="/"
          className="mt-5 rounded-lg bg-blue-950 px-5 py-2 text-white hover:bg-blue-900"
        >
          Kembali ke Halaman Utama
        </a>
      </div>
    );
  }

  // Menampilkan halaman jika pengguna memiliki akses
  return children;
}

export default ProtectedRoute;

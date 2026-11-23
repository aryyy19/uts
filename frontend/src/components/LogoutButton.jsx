import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Mengambil fungsi logout dari AuthContext
import { useAuth } from "../utils/AuthContext";

function LogoutButton() {
  // Mengambil fungsi logout
  const { logout } = useAuth();

  // Menggunakan navigate untuk kembali ke halaman login
  const navigate = useNavigate();

  // Menangani proses logout
  const handleLogout = async () => {
    // Meminta konfirmasi sebelum logout
    if (!window.confirm("Apakah Anda yakin ingin keluar?")) {
      return;
    }

    // Menjalankan proses logout
    const result = await logout();

    if (result.success) {
      // Menampilkan notifikasi berhasil
      toast.success("Logout berhasil.");

      // Mengarahkan pengguna ke halaman login
      navigate("/login", { replace: true });
    } else {
      // Menampilkan pesan jika logout gagal
      toast.error(result.message);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
    >
      Logout
    </button>
  );
}

export default LogoutButton;

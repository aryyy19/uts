import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Mengambil fungsi login dari AuthContext
import { useAuth } from "../utils/AuthContext";

function LoginPage() {
  // Mengambil fungsi login dan data pengguna
  const { login } = useAuth();

  // Mengelola input email dan password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Mengelola status proses login
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Menggunakan navigate untuk berpindah halaman
  const navigate = useNavigate();

  // Menangani proses login
  const handleLogin = async (e) => {
    e.preventDefault();

    // Mencegah tombol ditekan berulang kali
    setIsSubmitting(true);

    try {
      // Mengirim email dan password ke AuthContext
      const result = await login(email, password);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Login berhasil.");

      // Mengarahkan pengguna berdasarkan role
      if (result.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat login.");
    } finally {
      // Mengakhiri status proses login
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        {/* Header halaman login */}
        <div className="mb-7 text-center">
          <p className="mb-2 text-sm font-semibold tracking-wider text-blue-800">
            SISTEM INFORMASI AKADEMIK
          </p>

          <h1 className="text-2xl font-bold text-blue-950">Login Pengguna</h1>

          <p className="mt-2 text-sm text-gray-500">
            Silakan masuk menggunakan akun yang telah terdaftar.
          </p>
        </div>

        {/* Formulir login */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Input email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Input password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Tombol login */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-950 py-3 font-semibold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Memproses..." : "Login"}
          </button>
        </form>

        {/* Footer halaman */}
        <p className="mt-6 text-center text-xs text-gray-400">
          Sistem Pendaftaran Mahasiswa Baru
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

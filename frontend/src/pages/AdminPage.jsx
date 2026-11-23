import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Mengambil fungsi hapus data dari RegistrationContext
import { useRegistrations } from "../utils/RegistrationContext";

// Mengimpor komponen tabel dan tombol logout
import RegistrationTable from "../components/RegistrationTable";
import LogoutButton from "../components/LogoutButton";

function AdminPage() {
  // Mengambil fungsi untuk menghapus data pendaftaran
  const { deleteRegistration } = useRegistrations();

  // Menggunakan navigate untuk berpindah halaman
  const navigate = useNavigate();

  // Menangani proses penghapusan data pendaftar
  const handleDelete = async (id) => {
    // Meminta konfirmasi sebelum menghapus data
    if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      return;
    }

    try {
      // Menghapus data melalui RegistrationContext
      await deleteRegistration(id);

      toast.success("Data pendaftaran berhasil dihapus.");
    } catch (error) {
      // Menampilkan pesan jika penghapusan gagal
      toast.error(error.response?.data?.message || "Gagal menghapus data.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header halaman admin */}
        <div className="mb-7 rounded-xl bg-blue-950 px-6 py-8 text-white shadow-md">
          <p className="mb-2 text-sm font-medium tracking-wider text-blue-200">
            ADMINISTRATOR
          </p>

          <h1 className="text-2xl font-bold md:text-3xl">
            Data Pendaftar Mahasiswa Baru
          </h1>

          <p className="mt-2 text-sm text-blue-100">
            Kelola data pendaftaran mahasiswa baru melalui halaman ini.
          </p>
        </div>

        {/* Tombol untuk keluar dari akun */}
        <div className="mb-5 flex justify-end">
          <LogoutButton />
        </div>

        {/* Tabel seluruh data pendaftar */}
        <RegistrationTable
          onEdit={(item) => navigate(`/registrations/${item.id}/edit`)}
          onDelete={handleDelete}
        />

        {/* Footer halaman */}
        <footer className="py-6 text-center text-xs text-gray-500">
          Sistem Pendaftaran Mahasiswa Baru
        </footer>
      </div>
    </div>
  );
}

export default AdminPage;

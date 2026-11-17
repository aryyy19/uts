import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { useRegistrations } from "../utils/RegistrationContext";
import RegistrationForm from "../components/RegistrationForm";

function EditRegistrationPage() {
  // Mengambil ID pendaftar dari URL
  const { id } = useParams();

  // Mengambil fungsi untuk mengambil data berdasarkan ID
  const { getRegistrationById } = useRegistrations();

  // Mengatur perpindahan halaman
  const navigate = useNavigate();

  // Menyimpan data pendaftar yang akan diedit
  const [registration, setRegistration] = useState(null);

  // Menyimpan status loading
  const [isLoading, setIsLoading] = useState(true);

  // Mengambil data pendaftar dari Laravel API
  useEffect(() => {
    const fetchRegistration = async () => {
      try {
        const data = await getRegistrationById(id);
        setRegistration(data);
      } catch (error) {
        toast.error("Data pendaftar tidak ditemukan.");
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegistration();
  }, [id]);

  // Menampilkan loading ketika data sedang diambil
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-gray-500">Memuat data pendaftar...</p>
      </div>
    );
  }

  // Menampilkan halaman edit
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header halaman edit */}
        <div className="mb-7 rounded-xl bg-blue-950 px-6 py-8 text-white shadow-md">
          <p className="mb-2 text-sm font-medium tracking-wider text-blue-200">
            SISTEM INFORMASI AKADEMIK
          </p>

          <h1 className="text-2xl font-bold md:text-3xl">
            Edit Data Pendaftar
          </h1>

          <p className="mt-2 text-sm text-blue-100">
            Perbarui informasi pendaftaran mahasiswa.
          </p>
        </div>

        {/* Formulir edit dengan data yang sudah diambil */}
        {registration && (
          <RegistrationForm
            editingRegistration={registration}
            onCancel={() => navigate("/")}
          />
        )}

        {/* Footer halaman */}
        <footer className="py-6 text-center text-xs text-gray-500">
          Sistem Pendaftaran Mahasiswa Baru
        </footer>
      </div>
    </div>
  );
}

export default EditRegistrationPage;

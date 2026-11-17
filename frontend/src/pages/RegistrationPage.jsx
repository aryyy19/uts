import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useRegistrations } from "../utils/RegistrationContext";
import RegistrationForm from "../components/RegistrationForm";
import RegistrationTable from "../components/RegistrationTable";

function RegistrationPage() {
  // Mengambil fungsi delete dari context
  const { deleteRegistration } = useRegistrations();

  // Menggunakan navigate untuk berpindah halaman
  const navigate = useNavigate();

  // Menangani proses penghapusan data
  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      return;
    }

    try {
      await deleteRegistration(id);
      toast.success("Data pendaftaran berhasil dihapus.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menghapus data.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header halaman */}
        <div className="mb-7 rounded-xl bg-blue-950 px-6 py-8 text-white shadow-md">
          <p className="mb-2 text-sm font-medium tracking-wider text-blue-200">
            SISTEM INFORMASI AKADEMIK
          </p>

          <h1 className="text-2xl font-bold md:text-3xl">
            Pendaftaran Mahasiswa Baru
          </h1>

          <p className="mt-2 text-sm text-blue-100">
            Silakan lengkapi formulir berikut untuk melakukan pendaftaran
            mahasiswa baru.
          </p>
        </div>

        {/* Formulir untuk menambahkan pendaftar */}
        <RegistrationForm />

        {/* Tabel data pendaftar */}
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

export default RegistrationPage;

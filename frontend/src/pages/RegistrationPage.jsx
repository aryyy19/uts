import RegistrationForm from "../components/RegistrationForm";
import LogoutButton from "../components/LogoutButton";

function RegistrationPage() {
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

        {/* Tombol untuk keluar dari akun */}
        <div className="mb-5 flex justify-end">
          <LogoutButton />
        </div>

        {/* Formulir khusus untuk menambahkan data pendaftaran */}
        <RegistrationForm />

        {/* Footer halaman */}
        <footer className="py-6 text-center text-xs text-gray-500">
          Sistem Pendaftaran Mahasiswa Baru
        </footer>
      </div>
    </div>
  );
}

export default RegistrationPage;

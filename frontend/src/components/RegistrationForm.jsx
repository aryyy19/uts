import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useRegistrations } from "../utils/RegistrationContext";
import { useStudyPrograms } from "../utils/StudyProgramContext";

// Nilai awal seluruh input formulir
const initialForm = {
  full_name: "",
  email: "",
  phone: "",
  birth_date: "",
  address: "",
  school_origin: "",
  study_program_id: "",
};

function RegistrationForm({ editingRegistration, onCancel }) {
  // Mengambil fungsi CRUD pendaftaran
  const { addRegistration, updateRegistration } = useRegistrations();

  // Mengambil data program studi dari context terpisah
  const { studyPrograms } = useStudyPrograms();

  // Menyimpan nilai input formulir
  const [form, setForm] = useState(initialForm);

  // Menyimpan dokumen yang dipilih
  const [document, setDocument] = useState(null);

  // Menyimpan status proses pengiriman
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mengakses elemen form untuk mengosongkan input file
  const formRef = useRef(null);

  // Mengisi formulir ketika pengguna memilih data untuk diedit
  // Mengisi formulir ketika pengguna memilih data untuk diedit
  useEffect(() => {
    if (editingRegistration) {
      setForm({
        full_name: editingRegistration.full_name || "",
        email: editingRegistration.email || "",
        phone: editingRegistration.phone || "",
        birth_date: editingRegistration.birth_date?.substring(0, 10) || "",
        address: editingRegistration.address || "",
        school_origin: editingRegistration.school_origin || "",
        study_program_id: String(editingRegistration.study_program_id || ""),
      });

      setDocument(null);
    } else {
      setForm(initialForm);
      setDocument(null);
    }
  }, [editingRegistration]);

  // Menangani perubahan nilai input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Mengosongkan formulir setelah proses berhasil atau dibatalkan
  const resetForm = () => {
    setForm(initialForm);
    setDocument(null);
    formRef.current?.reset();
  };

  // Menangani proses tambah dan update pendaftaran
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingRegistration) {
        // Memperbarui data menggunakan method PUT
        await updateRegistration({
          id: editingRegistration.id,
          data: form,
        });

        toast.success("Data pendaftaran berhasil diperbarui.");
        onCancel();
      } else {
        // Membuat FormData untuk mengirim data dan dokumen
        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
          formData.append(key, value);
        });

        // Menambahkan dokumen jika pengguna memilih file
        if (document) {
          formData.append("document", document);
        }

        // Menambahkan data menggunakan method POST
        await addRegistration(formData);

        toast.success("Pendaftaran berhasil dikirim!");
      }

      // Mengosongkan formulir setelah proses berhasil
      resetForm();
    } catch (error) {
      // Menampilkan pesan validasi dari Laravel jika tersedia
      const errors = error.response?.data?.errors;

      if (errors) {
        toast.error(Object.values(errors)[0][0]);
      } else {
        toast.error(error.response?.data?.message || "Terjadi kesalahan.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Membatalkan proses edit
  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  return (
    <section className="mb-7 rounded-xl bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 border-b border-gray-200 pb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {editingRegistration ? "Edit Data Pendaftar" : "Formulir Pendaftaran"}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {editingRegistration
            ? "Silakan perbarui informasi pendaftar."
            : "Isi informasi pribadi dan pilihan program studi Anda."}
        </p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Input nama lengkap */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          {/* Input email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="contoh@email.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          {/* Input nomor telepon */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Nomor Telepon
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Masukkan nomor telepon"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          {/* Input tanggal lahir */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Tanggal Lahir
            </label>
            <input
              type="date"
              name="birth_date"
              value={form.birth_date}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          {/* Input asal sekolah */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Asal Sekolah
            </label>
            <input
              type="text"
              name="school_origin"
              value={form.school_origin}
              onChange={handleChange}
              placeholder="Masukkan asal sekolah"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          {/* Pilihan program studi dari Laravel API */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Program Studi
            </label>
            <select
              name="study_program_id"
              value={form.study_program_id}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
              required
            >
              <option value="">Pilih Program Studi</option>

              {studyPrograms?.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
            </select>
          </div>

          {/* Input alamat lengkap */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Alamat Lengkap
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Masukkan alamat lengkap"
              rows="3"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          {/* Upload dokumen hanya untuk pendaftaran baru */}
          {!editingRegistration && (
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Upload Dokumen
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setDocument(e.target.files[0] || null)}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:font-medium file:text-blue-900"
              />
              <p className="mt-2 text-xs text-gray-500">
                Format PDF, JPG, JPEG, atau PNG. Maksimal 2 MB.
              </p>
            </div>
          )}

          {editingRegistration && (
            <p className="md:col-span-2 text-xs text-gray-500">
              Dokumen yang sudah diunggah tidak diubah melalui formulir edit
              ini.
            </p>
          )}
        </div>

        {/* Tombol simpan dan batal */}
        <div className="mt-7 flex flex-wrap gap-3 border-t border-gray-200 pt-5">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blue-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Menyimpan..."
              : editingRegistration
                ? "Simpan Perubahan"
                : "Daftar Sekarang"}
          </button>

          {editingRegistration && (
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Batal Edit
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default RegistrationForm;

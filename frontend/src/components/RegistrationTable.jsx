import { useRegistrations } from "../utils/RegistrationContext";

function RegistrationTable({ onEdit, onDelete }) {
  // Mengambil data pendaftaran dari context
  const { registrations, isLoading, isError } = useRegistrations();

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm md:p-8">
      <div className="mb-5 flex flex-col justify-between gap-2 border-b border-gray-200 pb-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Daftar Pendaftar</h2>

          <p className="mt-1 text-sm text-gray-500">
            Data pendaftaran yang tersimpan di database.
          </p>
        </div>

        <span className="w-fit rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-900">
          Total: {registrations.length} pendaftar
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="bg-slate-100 text-gray-700">
            <tr>
              <th className="rounded-l-lg p-3">No</th>
              <th className="p-3">Nama</th>
              <th className="p-3">Email</th>
              <th className="p-3">Program Studi</th>
              <th className="p-3">Status</th>
              <th className="rounded-r-lg p-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  Memuat data pendaftar...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-red-500">
                  Gagal mengambil data pendaftar.
                </td>
              </tr>
            ) : registrations.length > 0 ? (
              registrations.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-slate-50"
                >
                  <td className="p-3">{index + 1}</td>

                  <td className="p-3 font-medium text-gray-800">
                    {item.full_name}
                  </td>

                  <td className="p-3 text-gray-600">{item.email}</td>

                  <td className="p-3 text-gray-600">
                    {item.study_program?.name || "-"}
                  </td>

                  <td className="p-3">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                      {item.status}
                    </span>
                  </td>

                  {/* Tombol edit dan delete */}
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className="rounded-md bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-800 transition hover:bg-blue-200"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(item.id)}
                        className="rounded-md bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  Belum ada data pendaftar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RegistrationTable;

import { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Menghubungkan RegistrationContext dengan Axios
import apiClient from "./apiClient.js";

// Membuat context khusus pendaftaran
const RegistrationContext = createContext();

// Provider untuk menyediakan data pendaftaran
export const RegistrationProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // Mengambil data pendaftaran dari Laravel API
  const {
    data: registrationData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["registrations"],
    queryFn: async () => {
      const res = await apiClient.get("/registrations");
      return res.data;
    },
  });

  // Mengambil data pendaftar berdasarkan ID
  const getRegistrationById = async (id) => {
    const res = await apiClient.get(`/registrations/${id}`);
    return res.data.data;
  };

  // Menambahkan data pendaftaran
  const addRegistration = async (formData) => {
    const res = await apiClient.post("/registrations", formData);

    // Memperbarui data pendaftaran setelah penambahan
    await queryClient.invalidateQueries({
      queryKey: ["registrations"],
    });

    return res.data;
  };

  // Memperbarui data pendaftaran
  const updateRegistration = async ({ id, data }) => {
    const res = await apiClient.put(`/registrations/${id}`, data);

    // Memperbarui data pendaftaran setelah update
    await queryClient.invalidateQueries({
      queryKey: ["registrations"],
    });

    return res.data;
  };

  // Menghapus data pendaftaran
  const deleteRegistration = async (id) => {
    const res = await apiClient.delete(`/registrations/${id}`);

    // Memperbarui data pendaftaran setelah delete
    await queryClient.invalidateQueries({
      queryKey: ["registrations"],
    });

    return res.data;
  };

  // Menyediakan data dan fungsi CRUD pendaftaran
  return (
    <RegistrationContext.Provider
      value={{
        registrations: registrationData?.data || [],
        pagination: registrationData,
        isLoading,
        isError,
        getRegistrationById,
        addRegistration,
        updateRegistration,
        deleteRegistration,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

// Hook untuk menggunakan RegistrationContext
export const useRegistrations = () => {
  return useContext(RegistrationContext);
};

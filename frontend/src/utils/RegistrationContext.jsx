import React, { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Menghubungkan RegistrationContext dengan konfigurasi Axios
import apiClient from "./apiClient.js";

// Membuat context untuk mengelola data pendaftaran
const RegistrationContext = createContext();

// Membuat provider agar data dan fungsi API dapat digunakan komponen lain
export const RegistrationProvider = ({ children }) => {
  // Mengambil fungsi untuk memperbarui cache React Query
  const queryClient = useQueryClient();

  // GET: Mengambil seluruh data pendaftaran dari Laravel API
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

  // GET: Mengambil seluruh data program studi
  const { data: studyPrograms } = useQuery({
    queryKey: ["studyPrograms"],
    queryFn: async () => {
      const res = await apiClient.get("/study-programs");
      return res.data.data;
    },
  });

  // SHOW: Mengambil detail pendaftaran berdasarkan ID
  const getRegistrationById = async (id) => {
    const res = await apiClient.get(`/registrations/${id}`);
    return res.data.data;
  };

  // POST: Menambahkan data pendaftaran baru
  const addRegistration = async (formData) => {
    const res = await apiClient.post("/registrations", formData);

    // Memperbarui daftar pendaftaran setelah berhasil menambahkan data
    await queryClient.invalidateQueries({
      queryKey: ["registrations"],
    });

    return res.data;
  };

  // PUT: Memperbarui data pendaftaran berdasarkan ID
  const updateRegistration = async ({ id, data }) => {
    const res = await apiClient.put(`/registrations/${id}`, data);

    // Memperbarui daftar pendaftaran setelah berhasil mengubah data
    await queryClient.invalidateQueries({
      queryKey: ["registrations"],
    });

    return res.data;
  };

  // DELETE: Menghapus data pendaftaran berdasarkan ID
  const deleteRegistration = async (id) => {
    const res = await apiClient.delete(`/registrations/${id}`);

    // Memperbarui daftar pendaftaran setelah berhasil menghapus data
    await queryClient.invalidateQueries({
      queryKey: ["registrations"],
    });

    return res.data;
  };

  // Menyediakan data dan fungsi agar dapat digunakan komponen lain
  return (
    <RegistrationContext.Provider
      value={{
        registrations: registrationData?.data || [],
        pagination: registrationData,
        studyPrograms,
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

// Custom hook untuk mengakses RegistrationContext
export const useRegistrations = () => {
  return useContext(RegistrationContext);
};

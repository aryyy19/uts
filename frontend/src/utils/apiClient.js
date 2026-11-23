import axios from "axios";

export const API_BASE_URL = "http://127.0.0.1:8000/api";
export const API_TOKEN_LS_KEY = "token";

// Membuat konfigurasi koneksi ke Laravel API
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

// Mengambil token secara otomatis setiap request
apiClient.interceptors.request.use((config) => {
  // Mengambil token dari localStorage
  const token = localStorage.getItem(API_TOKEN_LS_KEY);

  // Menambahkan token ke header jika tersedia
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Melanjutkan request ke server
  return config;
});

// Mengekspor konfigurasi Axios
export default apiClient;

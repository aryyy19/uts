import axios from "axios";

// Membuat konfigurasi koneksi ke Laravel API
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
  },
});

// Mengekspor konfigurasi Axios
export default apiClient;

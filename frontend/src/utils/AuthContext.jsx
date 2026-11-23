import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// Menghubungkan AuthContext dengan konfigurasi Axios
import apiClient, { API_TOKEN_LS_KEY } from "./apiClient.js";

// Membuat context khusus autentikasi
const AuthContext = createContext();

// Provider untuk menyediakan informasi dan fungsi autentikasi
export const AuthProvider = ({ children }) => {
  // Menyimpan data pengguna yang sedang login
  const [user, setUser] = useState(null);

  // Menandakan proses pemeriksaan autentikasi
  const [isLoading, setLoading] = useState(true);

  // Memperbarui informasi pengguna ketika aplikasi pertama kali dibuka
  useEffect(() => {
    mutateUser();
  }, []);

  // Mengambil data pengguna yang sedang login dari Laravel API
  const mutateUser = useCallback(async () => {
    try {
      const response = await apiClient.get("/user");

      // Menyimpan data pengguna ke dalam state
      setUser(response.data);
    } catch (error) {
      // Jika token tidak valid atau belum login
      console.error(error);
      setUser(null);
    } finally {
      // Menyelesaikan proses pemeriksaan autentikasi
      setLoading(false);
    }
  }, []);

  // Fungsi untuk melakukan login
  const login = useCallback(
    async (email, password) => {
      try {
        // Mengirim email dan password ke Laravel API
        const response = await apiClient.post("/login", {
          email,
          password,
        });

        // Menyimpan token login ke localStorage
        localStorage.setItem(API_TOKEN_LS_KEY, response.data.token);

        // Menyimpan data pengguna langsung dari respons login
        setUser(response.data.user);

        return {
          success: true,
          message: response.data.message,
          user: response.data.user,
        };
      } catch (error) {
        // Mengembalikan pesan jika login gagal
        console.error(error);

        return {
          success: false,
          message: error.response?.data?.message || "Login gagal",
        };
      }
    },
    [mutateUser],
  );

  // Fungsi untuk melakukan logout
  const logout = useCallback(async () => {
    try {
      // Memanggil endpoint logout Laravel menggunakan token aktif
      await apiClient.post("/logout");

      return {
        success: true,
        message: "Logout berhasil",
      };
    } catch (error) {
      // Menangani kesalahan ketika logout ke server gagal
      console.error(error);

      return {
        success: false,
        message: error.response?.data?.message || "Logout gagal",
      };
    } finally {
      // Menghapus token dari localStorage
      localStorage.removeItem(API_TOKEN_LS_KEY);

      // Menghapus data pengguna dari state
      setUser(null);
    }
  }, []);

  // Menyiapkan data dan fungsi yang dapat digunakan komponen lain
  const value = useMemo(
    () => ({
      user,
      isLoading,
      mutateUser,
      login,
      logout,
    }),
    [user, isLoading, mutateUser, login, logout],
  );

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

// Custom hook untuk menggunakan AuthContext
export const useAuth = () => {
  const authContext = useContext(AuthContext);

  // Memastikan hook digunakan di dalam AuthProvider
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return authContext;
};

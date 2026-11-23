import { BrowserRouter, Routes, Route } from "react-router-dom";

// Mengimpor halaman aplikasi
import RegistrationPage from "./pages/RegistrationPage";
import EditRegistrationPage from "./pages/EditRegistrationPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";

// Mengimpor komponen untuk melindungi halaman
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman login yang dapat diakses tanpa login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Halaman formulir pendaftaran khusus user */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <RegistrationPage />
            </ProtectedRoute>
          }
        />

        {/* Halaman pengelolaan data khusus admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        {/* Halaman edit pendaftar khusus admin */}
        <Route
          path="/registrations/:id/edit"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EditRegistrationPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

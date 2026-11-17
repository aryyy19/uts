import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegistrationPage from "./pages/RegistrationPage";
import EditRegistrationPage from "./pages/EditRegistrationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman utama pendaftaran */}
        <Route path="/" element={<RegistrationPage />} />

        {/* Halaman khusus edit pendaftar */}
        <Route
          path="/registrations/:id/edit"
          element={<EditRegistrationPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

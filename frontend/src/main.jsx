import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import { RegistrationProvider } from "./utils/RegistrationContext";
import { StudyProgramProvider } from "./utils/StudyProgramContext";
import { AuthProvider } from "./utils/AuthContext";

// Membuat konfigurasi React Query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RegistrationProvider>
          <StudyProgramProvider>
            <App />

            {/* Menampilkan notifikasi */}
            <Toaster position="top-right" reverseOrder={false} />
          </StudyProgramProvider>
        </RegistrationProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);

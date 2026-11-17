import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "react-hot-toast";
import { RegistrationProvider } from "./utils/RegistrationContext";

// Membuat konfigurasi React Query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RegistrationProvider>
        <App />

        {/* Menampilkan notifikasi */}
        <Toaster position="top-right" reverseOrder={false} />
      </RegistrationProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);

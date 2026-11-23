import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient.js";

// Membuat context khusus program studi
const StudyProgramContext = createContext();

// Provider untuk menyediakan data program studi
export const StudyProgramProvider = ({ children }) => {
  // Mengambil data program studi dari Laravel API
  const {
    data: studyPrograms,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["studyPrograms"],
    queryFn: async () => {
      const res = await apiClient.get("/study-programs");
      return res.data.data;
    },
  });

  // Menyediakan data dan status kepada komponen
  return (
    <StudyProgramContext.Provider
      value={{
        studyPrograms,
        isLoading,
        isError,
      }}
    >
      {children}
    </StudyProgramContext.Provider>
  );
};

// Hook untuk menggunakan StudyProgramContext
export const useStudyPrograms = () => {
  return useContext(StudyProgramContext);
};

"use client";
import { createContext, useState, ReactNode, useEffect } from "react";

interface ThemeContextType {
  mode: "light" | "dark";
  toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleMode: () => {},
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    // تحميل الوضع من localStorage لو موجود
    const savedMode = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedMode) setMode(savedMode);
  }, []);

  useEffect(() => {
    // تعديل الـ class على body حسب الوضع
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", mode);
  }, [mode]);

  const toggleMode = () => setMode(mode === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

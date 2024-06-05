'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { } from "vm";

type Theme = 'light' | 'dark' | null;

type ThemeContextProviderProps = {
  children: React.ReactNode
}

type ThemeContextType = {
  theme: Theme;
  toggleDarkTheme: () => void;
  toggleLightTheme: () => void;

};

const ThemeContext = createContext<ThemeContextType | null>(null);

export default function ThemeContextProvider({
  children
}: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<Theme>(null);

  const toggleDarkTheme = () => {
    setTheme('dark');
    window.localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  }

  const toggleLightTheme = () => {
    setTheme('light');
    window.localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
  }


  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme') as Theme | null;

    if(localTheme) {
      setTheme(localTheme);

      if(localTheme  === 'dark') {
        document.documentElement.classList.add('dark');
      }

      return;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches){
      setTheme('dark');
      document.documentElement.classList.add('dark');
      return;
    }

    setTheme('light');
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleDarkTheme,
        toggleLightTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }

  return context;
}

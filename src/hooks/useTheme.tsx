import { useState, useEffect } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    // fallback to light if nothing saved
    return saved === "dark" ? "dark" : "light";
  });

  // apply theme to <html> (Tailwind uses 'dark' on root)
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  // toggle function for convenience
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  // return both so components can use them
  return { theme, setTheme, toggleTheme };
};

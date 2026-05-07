"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";

type ThemeToggleProps = {
  label: string;
  lightLabel: string;
  darkLabel: string;
  systemLabel: string;
};

const themes: Theme[] = ["system", "light", "dark"];

function getStoredTheme() {
  if (typeof window === "undefined") {
    return "system";
  }

  const storedTheme = window.localStorage.getItem("pro-fix-theme") as Theme | null;

  return storedTheme && themes.includes(storedTheme) ? storedTheme : "system";
}

function applyTheme(theme: Theme) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const shouldUseDark = theme === "dark" || (theme === "system" && prefersDark);

  document.documentElement.classList.toggle("dark", shouldUseDark);
  document.documentElement.style.colorScheme = shouldUseDark ? "dark" : "light";
}

export function ThemeToggle({
  darkLabel,
  label,
  lightLabel,
  systemLabel
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    applyTheme(theme);

    const handleSystemThemeChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme]);

  function handleThemeChange(nextTheme: Theme) {
    setTheme(nextTheme);

    if (nextTheme === "system") {
      window.localStorage.removeItem("pro-fix-theme");
    } else {
      window.localStorage.setItem("pro-fix-theme", nextTheme);
    }

    applyTheme(nextTheme);
  }

  return (
    <div
      aria-label={label}
      className="flex rounded-md border border-zinc-300 bg-white p-1 dark:border-zinc-700 dark:bg-zinc-950"
    >
      {themes.map((option) => (
        <button
          aria-pressed={theme === option}
          className={cn(
            "rounded px-2.5 py-1.5 text-xs font-semibold transition-colors",
            theme === option
              ? "bg-blue-800 text-white"
              : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
          )}
          key={option}
          onClick={() => handleThemeChange(option)}
          type="button"
        >
          {option === "system"
            ? systemLabel
            : option === "light"
              ? lightLabel
              : darkLabel}
        </button>
      ))}
    </div>
  );
}

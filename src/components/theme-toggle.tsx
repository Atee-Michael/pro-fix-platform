"use client";

import { useEffect, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";

type ThemeToggleProps = {
  label: string;
  lightLabel: string;
  darkLabel: string;
  systemLabel: string;
};

const themes: Theme[] = ["system", "light", "dark"];
const themeChangeEvent = "pro-fix-theme-change";

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

function subscribeToTheme(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  window.addEventListener("storage", callback);
  window.addEventListener(themeChangeEvent, callback);
  mediaQuery.addEventListener("change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(themeChangeEvent, callback);
    mediaQuery.removeEventListener("change", callback);
  };
}

export function ThemeToggle({
  darkLabel,
  label,
  lightLabel,
  systemLabel
}: ThemeToggleProps) {
  const theme = useSyncExternalStore<Theme>(
    subscribeToTheme,
    getStoredTheme,
    () => "system"
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function handleThemeChange(nextTheme: Theme) {
    if (nextTheme === "system") {
      window.localStorage.removeItem("pro-fix-theme");
    } else {
      window.localStorage.setItem("pro-fix-theme", nextTheme);
    }

    applyTheme(nextTheme);
    window.dispatchEvent(new Event(themeChangeEvent));
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

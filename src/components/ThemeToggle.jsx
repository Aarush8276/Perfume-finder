"use client";
import { useState, useEffect } from "react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("scent_theme") || "dark";
    setIsDark(saved === "dark");
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("scent_theme", next);
  };

  return (
    <button className={styles.toggle} onClick={toggle} aria-label="Toggle theme" title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
      <span className={styles.icon}>{isDark ? "☀️" : "🌙"}</span>
    </button>
  );
}

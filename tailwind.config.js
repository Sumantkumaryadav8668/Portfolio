/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'rgb(var(--brand-primary-rgb) / <alpha-value>)',
          accent: 'rgb(var(--brand-accent-rgb) / <alpha-value>)',
          bg: 'rgb(var(--brand-bg-rgb) / <alpha-value>)',
          bgSec: 'rgb(var(--brand-bg-sec-rgb) / <alpha-value>)',
          card: 'rgb(var(--brand-card-rgb) / <alpha-value>)',
          border: 'rgb(var(--brand-border-rgb) / <alpha-value>)',
          text: 'rgb(var(--brand-text-rgb) / <alpha-value>)',
          muted: 'rgb(var(--brand-muted-rgb) / <alpha-value>)',
          success: 'rgb(var(--brand-success-rgb) / <alpha-value>)',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: [
      {
        dark: {
          "primary": "#2563EB",
          "secondary": "#60A5FA",
          "accent": "#60A5FA",
          "neutral": "#1F2937",
          "base-100": "#030712",
          "base-200": "#111827",
          "base-300": "#1F2937",
          "info": "#60A5FA",
          "success": "#10B981",
          "warning": "#FBBF24",
          "error": "#EF4444",
        },
        light: {
          "primary": "#2563EB",
          "secondary": "#3B82F6",
          "accent": "#60A5FA",
          "neutral": "#F3F4F6",
          "base-100": "#FFFFFF",
          "base-200": "#F9FAFB",
          "base-300": "#E5E7EB",
          "info": "#3B82F6",
          "success": "#10B981",
          "warning": "#FBBF24",
          "error": "#EF4444",
        }
      }
    ],
  },
}

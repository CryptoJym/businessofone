import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Business of One brand colors
        primary: {
          DEFAULT: '#4169E1', // Utlyze Blue
          50: '#f0f4ff',
          100: '#e0e8ff',
          200: '#c1d1ff',
          300: '#8ba8ff',
          400: '#5a7fff',
          500: '#4169E1',
          600: '#2d50c7',
          700: '#1f3a9e',
          800: '#172d7d',
          900: '#0f1f5c',
        },
        accent: {
          DEFAULT: '#16A085',
          50: '#e8f8f5',
          100: '#d1f1ea',
          200: '#a3e3d5',
          300: '#5fceb5',
          400: '#2eb897',
          500: '#16A085',
          600: '#108069',
          700: '#0c6050',
          800: '#084038',
          900: '#042018',
        },
      },
    },
  },
  plugins: [],
};
export default config;
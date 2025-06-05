import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4169E1',
          50: '#E8EDFC',
          100: '#D1DBFA',
          200: '#A3B7F4',
          300: '#7593EF',
          400: '#476FE9',
          500: '#4169E1',
          600: '#2952D9',
          700: '#203FA3',
          800: '#162B6D',
          900: '#0D1837'
        },
        accent: {
          DEFAULT: '#16A085',
          50: '#E3F7F3',
          100: '#C7EFE7',
          200: '#8FDFCF',
          300: '#57CFB7',
          400: '#1FBF9F',
          500: '#16A085',
          600: '#128068',
          700: '#0E604E',
          800: '#0A4034',
          900: '#05201A'
        }
      },
    },
  },
  plugins: [],
}
export default config
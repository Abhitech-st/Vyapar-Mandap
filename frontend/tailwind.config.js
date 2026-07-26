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
        slate: {
          950: '#020617',
          900: '#0f172a',
          850: '#151e32',
          800: '#1e293b',
          700: '#334155'
        },
        emerald: {
          500: '#10b981',
          600: '#059669',
          950: '#022c22'
        },
        rose: {
          500: '#f43f5e',
          600: '#e11d48'
        },
        amber: {
          500: '#f59e0b',
          600: '#d97706'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    },
  },
  plugins: [],
}

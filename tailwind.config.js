/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        uk: {
          navy: '#1D3557',
          red: '#E63946',
          light: '#F1FAEE',
          steel: '#457B9D',
          sky: '#A8DADC',
        },
      },

    },
  },
  plugins: [],
};

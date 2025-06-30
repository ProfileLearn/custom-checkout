// tailwind.config.mjs

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,jsx,mdx}",
    "./components/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#FFFFFF',        // Fondo principal (blanco)
        'surface': '#F7F8F9',           // Fondo de elementos como el radio button (gris muy claro)
        'primary': '#2992D0',           // El azul principal para botones y acentos
        'foreground': '#374151',        // Color de texto principal (gris oscuro)
        'foreground-light': '#6b7280',  // Color de texto secundario (gris más claro)
        'border-color': '#D1D5DB',      // Color de los bordes de los inputs
      },
    },
  },
  plugins: [],
};

export default config;
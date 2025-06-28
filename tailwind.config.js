/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,mdx}", // Le dice a Tailwind que escanee la carpeta 'app'
    "./components/**/*.{js,jsx,mdx}", // También la futura carpeta 'components'
  ],
  theme: {
    extend: {
      // Aquí es donde extenderemos el tema de Tailwind más adelante
    },
  },
  plugins: [],
}
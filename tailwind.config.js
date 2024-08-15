/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}', // Includes all JS/TS/JSX/TSX/MDX files in the pages directory
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', // Includes all JS/TS/JSX/TSX/MDX files in the components directory
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


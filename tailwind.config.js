/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'sans-serif'],
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
      },
      colors: {
        'primary-100': '#f8f4eb',
        'primary-300': '#e4dcc8',
        'primary-500': '#c4a77d',
        'secondary-500': '#1e293b',
        'red-500': '#A8312D',
        'red-100': '#A8312D',
      },
    },
  },
  plugins: [],
}
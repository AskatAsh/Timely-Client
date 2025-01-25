/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "var(--color-text)",
        background: "var(--color-background)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        body: {
          fontFamily: "var(--font-display)",
          backgroundColor: "var(--color-background)",
          color: "var(--color-text)",
        },
      });
    }),
  ],
};
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cascade: {
          50: 'var(--color-cascade-50)',
          100: 'var(--color-cascade-100)',
          200: 'var(--color-cascade-200)',
          300: 'var(--color-cascade-300)',
          400: 'var(--color-cascade-400)',
          500: 'var(--color-cascade-500)',
          600: 'var(--color-cascade-600)',
          700: 'var(--color-cascade-700)',
          800: 'var(--color-cascade-800)',
          900: 'var(--color-cascade-900)',
          950: 'var(--color-cascade-950)',
        },
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-+/,
    },
  ],
};
export default config;

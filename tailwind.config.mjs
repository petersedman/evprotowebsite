/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF2E5',
        navy: {
          DEFAULT: '#00293D',
          muted: 'rgba(0, 41, 61, 0.72)',
        },
        teal: {
          DEFAULT: '#00DB9A',
          dark: '#00B07B',
        },
        red: {
          DEFAULT: '#E60F3D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '800' }],
        hero: ['clamp(3rem, 8vw, 6.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em', fontWeight: '800' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
};

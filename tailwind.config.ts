import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A', // Slate 900 - Precision Camera Black / Titanium
        secondary: '#0284C7', // Sky 600 - Multi-Coated Optics Blue
        accent: '#0284C7', // Optics Blue accent
        cream: '#F8FAFC', // Clean Studio Off-White
        'brand-dark': '#0F172A', // Camera Slate Black
        'brand-sage': '#0284C7', // Precision Optics Blue
        'brand-cream': '#F8FAFC', // Studio Off-White
        text: '#0F172A', // High-contrast deep slate text
        'text-gray': '#64748B', // Muted slate gray text
        'bg-light': '#F8FAFC', // Studio light background
        'border-gray': '#E2E8F0', // Technical light border
        'nav-gray': '#0284C7', // Navigation optic blue
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        heading: ['var(--font-dm-sans)', 'sans-serif'],
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}
export default config 
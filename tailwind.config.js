/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        wood: {
          50:  '#FAFAF8',
          100: '#F5F4F0',
          200: '#E8E6E1',
          300: '#D4D1C9',
          400: '#A39E93',
          500: '#7A756C',
          600: '#5C574F',
          700: '#3D3935',
          800: '#2A2725',
          900: '#1A1918',
        },
        accent: {
          gold: '#C9A962',
          champagne: '#F7E7CE',
          copper: '#B87333',
        },
        cream: {
          50: '#FFFEFB',
          100: '#FEFCF8',
          200: '#FDF9F3',
          300: '#F8F4ED',
          400: '#E8DFD4',
          500: '#D4C4B0',
        },
        sage: {
          50: '#F6F7F4',
          100: '#E8EBE2',
          200: '#D4D9C7',
          300: '#B8C2A0',
          400: '#9CA87A',
          500: '#7F8E5A',
        }
      },
      fontFamily: {
        'display': ['var(--font-display)', 'Playfair Display', 'serif'],
        'serif': ['var(--font-serif)', 'Crimson Pro', 'serif'],
        'sans': ['var(--font-sans)', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      height: {
        'screen-dvh': '100dvh',
      },
      minHeight: {
        'touch': '2.75rem',
      },
      minWidth: {
        'touch': '2.75rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'kenburns-1': 'kenburns1 8s ease-out forwards',
        'kenburns-2': 'kenburns2 8s ease-out forwards',
        'kenburns-3': 'kenburns3 8s ease-out forwards',
        'kenburns-4': 'kenburns4 8s ease-out forwards',
        'logo-bounce': 'logoBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        kenburns1: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.12) translate(-2%, -1%)' },
        },
        kenburns2: {
          '0%': { transform: 'scale(1.05) translate(-1%, 0)' },
          '100%': { transform: 'scale(1) translate(1%, -1%)' },
        },
        kenburns3: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.1) translate(1.5%, -2%)' },
        },
        kenburns4: {
          '0%': { transform: 'scale(1.08) translate(1%, -1%)' },
          '100%': { transform: 'scale(1) translate(-1%, 0)' },
        },
        logoBounce: {
          '0%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.15)' },
          '50%': { transform: 'scale(0.95)' },
          '70%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
}

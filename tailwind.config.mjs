/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
    './src/pages/**/*.astro',
    './src/components/**/*.astro',
    './src/layouts/**/*.astro'
  ],
  
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5ff',
          100: '#e0ebfe',
          200: '#c1d7fe',
          300: '#a2c3fd',
          400: '#83affc',
          500: '#0A2540', // Тёмно-синий (основной)
          600: '#081d30',
          700: '#061527',
          800: '#04101e',
          900: '#020815'
        },
        accent: {
          light: '#00C853', // Зелёный (используется в кнопках)
          DEFAULT: '#00C853',
          dark: '#1e88e5'   // Синий
        },
        neutral: {
          light: '#F8F9FA',
          DEFAULT: '#FFFFFF',
          dark: '#333333'
        }
      },
      
      fontFamily: {
        sans: ['system-ui', 'Inter', 'Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['Menlo', 'Monaco', 'Courier New', 'monospace']
      },
      
      spacing: {
        'safe': '16px',
        'safe-lg': '24px',
        'safe-xl': '32px'
      },
      
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['32px', '40px'],
        '4xl': ['40px', '48px'],
        '5xl': ['48px', '56px']
      },
      
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px'
      },
      
      borderRadius: {
        'none': '0',
        'sm': '4px',
        'base': '8px',
        'lg': '12px',
        'xl': '16px',
        'full': '9999px'
      },
      
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'base': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      },
      
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s cubic-bezier(0.36, 0, 0.66, -0.56) infinite'
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    }
  },
  
  plugins: [],
  
  corePlugins: {
    preflight: true
  }
};

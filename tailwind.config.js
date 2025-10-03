/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Grid column spans
    'col-span-1', 'col-span-2', 'col-span-3', 'col-span-4', 'col-span-5', 'col-span-6',
    'col-span-7', 'col-span-8', 'col-span-9', 'col-span-10', 'col-span-11', 'col-span-12',
    // Grid column starts  
    'col-start-1', 'col-start-2', 'col-start-3', 'col-start-4', 'col-start-5', 'col-start-6',
    'col-start-7', 'col-start-8', 'col-start-9', 'col-start-10', 'col-start-11', 'col-start-12',
    // Grid row spans
    'row-span-1', 'row-span-2', 'row-span-3', 'row-span-4', 'row-span-5', 'row-span-6',
    // Grid row starts
    'row-start-1', 'row-start-2', 'row-start-3', 'row-start-4', 'row-start-5', 'row-start-6',
    // Grid template columns
    'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-5', 'grid-cols-6', 'grid-cols-12',
    // Additional grid utilities that might be needed
    'col-auto', 'col-end-auto', 'row-auto', 'row-end-auto',
    // Background colors for grid items
    'bg-transparent', 'bg-white', 'bg-gray-50', 'text-gray-900', 'text-gray-800', 'text-white', 'text-inherit',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          200: '#C0DAC5', // Custom moss green color
        },
        moss: '#C0DAC5', // Custom moss green color
        dust: '#E4DAD4', // Custom dust color
        terracotta: '#FAC09E', // Custom terracotta color
        pine: '#00413A', // Custom pine green color
        warmgray: '#78716C', // Custom warm gray color
        primary: {
          DEFAULT: '#1E3F3F',
          50: '#E6EFEF',
          100: '#CCDEDF', 
          200: '#99BDBE',
          300: '#669C9E',
          400: '#337B7D',
          500: '#1E3F3F',
          600: '#183232',
          700: '#122626',
          800: '#0C1919',
          900: '#060D0D',
        },
        secondary: {
          DEFAULT: '#B85B14',
          50: '#FFEEE6',
          100: '#FFDCCC',
          200: '#FFB999',
          300: '#FF9666',
          400: '#FF7333',
          500: '#B85B14',
          600: '#934910',
          700: '#6E370C',
          800: '#4A2508',
          900: '#251204',
        },
        accent: {
          DEFAULT: '#F4C4A6',
          50: '#FFFFFF',
          100: '#FEFCFA',
          200: '#FBF1E8',
          300: '#F8E6D6',
          400: '#F6D5C1',
          500: '#F4C4A6',
          600: '#EFA578',
          700: '#EA864A',
          800: '#E5671C',
          900: '#B85014',
        },
        neutral: {
          DEFAULT: '#B8B1A8',
          50: '#F7F6F5',
          100: '#EFEDEB',
          200: '#DFDBD6',
          300: '#CFC9C2',
          400: '#BFB7AD',
          500: '#B8B1A8',
          600: '#A39689',
          700: '#8E7B6A',
          800: '#6B5A4D',
          900: '#483930',
        },
        success: {
          DEFAULT: '#7EA686',
          50: '#F2F7F3',
          100: '#E5EFE7',
          200: '#CBDFCF',
          300: '#B1CFB7',
          400: '#97BF9F',
          500: '#7EA686',
          600: '#658569',
          700: '#4C644E',
          800: '#334333',
          900: '#1A2118',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

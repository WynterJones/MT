/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary green accent
        'finance-green': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // Much darker theme colors
        'dark': {
          50: '#f8fafc',
          100: '#e2e8f0',
          200: '#94a3b8',
          300: '#64748b',
          400: '#475569',
          500: '#334155',
          600: '#1e293b',
          700: '#0f172a',
          800: '#020617',
          900: '#000000',
        },
      },
    },
    // Override default colors to use our dark theme
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      
      // Override gray scale to be much darker
      gray: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#94a3b8',
        400: '#64748b',
        500: '#475569',
        600: '#334155',
        700: '#1e293b',
        800: '#0f172a',
        900: '#000000',
      },
      
      // Override slate to be darker
      slate: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#94a3b8',
        400: '#64748b',
        500: '#475569',
        600: '#334155',
        700: '#1e293b',
        800: '#0f172a',
        900: '#000000',
      },
      
      // Keep existing colors but add our custom ones
      red: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
      },
      
      yellow: {
        50: '#fefce8',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
      },
      
      green: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
      },
      
      blue: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      
      purple: {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',
        700: '#7c3aed',
        800: '#6b21a8',
        900: '#581c87',
      },
      
      // Custom theme colors
      'finance-green': {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
      },
      
      'dark': {
        50: '#f8fafc',
        100: '#e2e8f0',
        200: '#94a3b8',
        300: '#64748b',
        400: '#475569',
        500: '#334155',
        600: '#1e293b',
        700: '#0f172a',
        800: '#020617',
        900: '#000000',
      },
    },
    
    // Override background colors in the theme
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#000000',
      'secondary': '#0f172a',
      'accent': '#16a34a',
    }),
    
    // Override text colors
    textColor: theme => ({
      ...theme('colors'),
      'primary': '#ffffff',
      'secondary': '#e2e8f0',
      'muted': '#94a3b8',
      'accent': '#22c55e',
    }),
    
    // Override border colors
    borderColor: theme => ({
      ...theme('colors'),
      'default': '#1e293b',
      'primary': '#0f172a',
      'accent': '#16a34a',
    }),
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Poppins', 'Inter', 'Space Grotesk', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'DM Sans', 'Roboto', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Source Code Pro', 'Consolas', 'monospace'],
      },
      scale: {
        '106': '1.06',
      },
      colors: {
        primary: {
          50: '#f0f8ff',
          100: '#e0f1fe',
          200: '#bae5fd',
          300: '#7dd0fc',
          400: '#57a3e0', // Dark theme accent
          500: '#3674b5', // Main brand color (light theme accent)
          600: '#2d5e98',
          700: '#24487a',
          800: '#1e3a65',
          900: '#1a2f54',
          950: '#0f1729',
        },
        // Light theme colors
        'light-bg': '#f5f9ff',      // Main background
        'light-alt': '#e5ecf5',     // Section backgrounds (alt)
        'light-text': '#1a1a1a',    // Text & titles
        'light-muted': '#6b7280',   // Muted text
        
        // Dark theme colors
        'dark-bg': '#0e1117',       // Main background
        'dark-card': '#1f2937',     // Card/section backgrounds
        'dark-text': '#f3f4f6',     // Main text
        'dark-muted': '#9ca3af',    // Muted text
        'dark-accent': '#a1e3f9',   // Alternative accent (sky blue)
      },
      backgroundColor: {
        'light': '#f5f9ff',
        'dark': '#0e1117',
      }
    },
  },
  plugins: [],
}


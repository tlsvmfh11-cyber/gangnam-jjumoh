/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B0000', // 딥와인
        secondary: '#FFD700', // 골드
        accent: '#F5F5DC', // 크림/베이지
        dark: '#1a1a1a', // 다크 배경
      },
      fontFamily: {
        sans: ['Pretendard Variable', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-wine-gold': 'linear-gradient(135deg, #8B0000 0%, #B8860B 50%, #FFD700 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
      },
      boxShadow: {
        'glow-gold': '0 0 20px rgba(255, 215, 0, 0.5)',
        'glow-wine': '0 0 30px rgba(139, 0, 0, 0.6)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.8s ease-in-out',
        'slideUp': 'slideUp 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { textShadow: '0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.6)' },
          '100%': { textShadow: '0 0 20px rgba(255, 215, 0, 1), 0 0 40px rgba(255, 215, 0, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}

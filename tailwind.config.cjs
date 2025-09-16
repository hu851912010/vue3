module.exports = {
  content: ['index.html', './src/**/*.{vue,js,ts,jsx,tsx,md}'],
  theme: {
    extend: {
      colors: {
        background: '#0F1216',
        surface: 'rgba(255, 255, 255, 0.05)',
        border: 'rgba(255, 255, 255, 0.1)',
        accent: '#60A5FA',
        textPrimary: '#E5E7EB',
        textSecondary: '#9CA3AF'
      },
      fontFamily: {
        sans: ['Inter', '"Noto Sans SC"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 12px 45px rgba(96, 165, 250, 0.25)'
      }
    }
  },
  plugins: []
};

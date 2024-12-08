module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Include your src folder for Tailwind
  theme: {
    extend: {},
  },
  plugins: [],
};

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Ensure this matches your project's structure
  theme: {
    extend: {}, // You can extend the theme here if needed
  },
  plugins: [require('daisyui')], // Include DaisyUI as a plugin
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#22c55e',
          secondary: '#f6f6f6',
          accent: '#22d3ee',
          neutral: '#f3f4f6',
          'base-100': '#ffffff', // This sets the base background to white
          info: '#3b82f6',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
        },
      },
    ],
  },
};

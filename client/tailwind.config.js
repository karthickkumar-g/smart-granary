export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-pattern': "url('/path/to/your/image.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'color': '#88D66C', 
        'btn-color':'#399918',
        "btn-bg":"#28a745",
      },
      backgroundPosition: {
        'custom-pos': 'center 10%', // Custom background position
      },
      backgroundSize: {
        'custom-size': '200% 200%', // Custom background size
      },
      height:{
        "dheight":'85vh',
        "pheight":"30rem",
      },
      width:{
        "pwidth":"20rem"
      }
    },
  },
  plugins: [],
}
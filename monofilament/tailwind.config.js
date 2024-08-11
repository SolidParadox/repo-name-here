/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,css}"],
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      fontFamily: {
        custom: ['Redjola', 'monospace', 'system-ui']
      }, 
      colors: {
        hard: "#1D0F3C",
        accent: "#6A1D8B",
        middle: "#C89BFF",
        lining: "#C46D87",
        soft: "#E3A8D6"
      },
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      width : {
        'semi': '96dvw'
      },
      height : {
        'semi': '96dvh'
      },
      spacing : {
        'semi' : '2dvw'
      }
    }
  },
  plugins: [],
}


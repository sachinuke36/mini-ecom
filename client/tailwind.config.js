module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    ".src/app/components/**/*.{js,ts,jsx,tsx}", // <- this line is important
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

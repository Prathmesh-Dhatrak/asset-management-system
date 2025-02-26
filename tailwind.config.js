export default {
  content: ["./src/**/*.tsx", "./src/**/*.css"],
  plugins: [require('daisyui'), require("@tailwindcss/forms")],
  daisyui: {
    themes: ["light", "dark"],
  },
};

/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {},
		fontFamily: {
			geo: [" Geologica", "sans-serif"],
			jose: ["Josefin Sans", "sans-serif"],
			sans: ["Inter var", ...defaultTheme.fontFamily.sans],
		},
	},
	plugins: [require("@tailwindcss/forms")],
	darkMode: "class",
};

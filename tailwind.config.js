import { mainColors } from "./src/utils/theme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"gray-text": "#6b757d",
				"gray-bg": "#171624",
				"gray-bg-boxfull": "#1a1a19",
				"gray-bg-box": "#1d1c2a",
				"green-main": "#27a844",
				"blue-main": "#007aff",
				"red-main": "#ff073b",
				"yellow-main": "#fec107",
				"purple-main": "#9571b7",
				"orange-main": "#fd7d13",
				"pink-main": "#ed5481",
			},

			fontFamily: {
				bebas: ["'Bebas Neue'", "'sans - serif'"],
				jose: ["'Josefin Sans'", "'sans - serif'"],
			},
			keyframes: {
				pinger: {
					"75%, 100%": {
						transform: "scale(1.5)",
						opacity: 0,
					},
				},
				drop: {
					"0%": { transform: "translateY(-20px)", opacity: 0 },
					"100%": {
						transform: "translateY(0)",
						opacity: 1,
					},
				},
				colorShift: {
					"0%": { color: mainColors["red-main"] },
					"20%": { color: mainColors["orange-main"] },
					"40%": { color: mainColors["purple-main"] },
					"60%": { color: mainColors["pink-main"] },
					"80%": { color: mainColors["green-main"] },
					"100%": { color: mainColors["blue-main"] },
				},
				wiggle: {
					"0%, 100%": { transform: "rotate(-1deg)" },
					"50%": { transform: "rotate(1deg)" },
				},
				loader: {
					"0%": { right: "100%", "background-color": "#00a36c" },
					"50%": { "background-color": "#646cff" },
					"100%": { right: "0%", "background-color": " #ff5733" },
				},
				zoom: {
					"0%": { transform: "scale(1)" },
					"25%": { transform: `scale(1.25) rotate(-5deg)` },
					"50%": { transform: `scale(1.5)` },
					"75%": { transform: `scale(1.25) rotate(5deg)` },
					"100%": { transform: "scale(1)" },
				},
				rotate: {
					"0%": {
						transform: "rotate(0deg)",
						"background-color": "#ff5733",
					},
					"16%": {
						transform: "rotate(60deg)",
					},
					"32%": {
						transform: "rotate(120deg)",
					},
					"48%": {
						transform: "rotate(180deg)",
						"background-color": "#646cff",
					},
					"64%": {
						transform: "rotate(240deg)",
					},
					"80%": {
						transform: "rotate(300deg)",
						"background-color": "#00a36c",
					},
					"100%": {
						transform: "rotate(360deg)",
					},
				},
			},
			animation: {
				wiggle: "wiggle 5s ease-in-out infinite",
				rotate: "rotate 10s linear infinite forwards",
				zoom: "zoom 2s linear 1 forwards",
				colorShift: "colorShift 45s ease-in-out infinite alternate",
				drop: "drop 0.3s ease-in-out 1 alternate",
			},
		},
	},
	plugins: [],
};

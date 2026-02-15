const konstaConfig = require('konsta/config');

const config = konstaConfig({
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	konsta: {
		colors: {
			primary: '#0A84FF',
		},
	},
	theme: {
		extend: {
			colors: {
				tahoe: {
					bg: 'rgba(30, 30, 30, 0.85)',
					surface: 'rgba(44, 44, 46, 0.65)',
					'surface-solid': '#2c2c2e',
					elevated: 'rgba(58, 58, 60, 0.75)',
					toolbar: 'rgba(30, 30, 30, 0.78)',
					accent: '#0A84FF',
					text: '#FFFFFF',
					'text-secondary': 'rgba(235, 235, 245, 0.6)',
					'text-tertiary': 'rgba(235, 235, 245, 0.3)',
					separator: 'rgba(84, 84, 88, 0.65)',
					red: '#FF453A',
					green: '#30D158',
					pink: '#FF375F',
				},
			},
			fontFamily: {
				sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
			},
		},
	},
	plugins: [],
});

module.exports = config;

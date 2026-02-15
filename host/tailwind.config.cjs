const konstaConfig = require('konsta/config');

const config = konstaConfig({
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'../remote/src/**/*.{html,js,svelte,ts}',
	],
	darkMode: 'class',
	konsta: {
		colors: {
			primary: '#0A84FF',
			'brand-red': '#FF453A',
			'brand-orange': '#FF9F0A',
			'brand-yellow': '#FFD60A',
			'brand-green': '#30D158',
			'brand-teal': '#64D2FF',
			'brand-blue': '#0A84FF',
			'brand-indigo': '#5E5CE6',
			'brand-purple': '#BF5AF2',
			'brand-pink': '#FF375F',
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
					sidebar: 'rgba(30, 30, 30, 0.92)',
					toolbar: 'rgba(30, 30, 30, 0.78)',
					card: 'rgba(44, 44, 46, 0.55)',
					accent: '#0A84FF',
					'accent-hover': '#409CFF',
					text: '#FFFFFF',
					'text-secondary': 'rgba(235, 235, 245, 0.6)',
					'text-tertiary': 'rgba(235, 235, 245, 0.3)',
					separator: 'rgba(84, 84, 88, 0.65)',
					'input-bg': 'rgba(118, 118, 128, 0.24)',
					red: '#FF453A',
					orange: '#FF9F0A',
					yellow: '#FFD60A',
					green: '#30D158',
					teal: '#64D2FF',
					pink: '#FF375F',
				},
			},
			fontFamily: {
				sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
			},
			backdropBlur: {
				tahoe: '40px',
			},
			borderRadius: {
				tahoe: '14px',
				'tahoe-lg': '18px',
			},
			spacing: {
				'safe-b': 'env(safe-area-inset-bottom)',
			},
		},
	},
	plugins: [],
});

module.exports = config;

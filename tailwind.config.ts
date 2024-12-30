import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: ['class'],
	content: ['./pages/**/*.{ts,tsx}', './shared/components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: {
				black: 'var(--black)',
				white: 'var(--white)',
				gray: 'var(--gray)',
				accent: 'var(--accent)',
				primary: 'var(--primary)',
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				destructive: 'var(--destructive)',
				secondary: {
					DEFAULT: 'var(--secondary)',
					foreground: 'var(--secondary-foreground)',
				},
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
export default config

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '1.5rem',
			screens: {
				'xs': '360px',
				'sm': '480px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1536px',
			},
		},
		fontFamily: {
			heading: ['Space Grotesk Variable', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Inter', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
			body: ['Inter Variable', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Inter', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
			mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
		},
		extend: {
			colors: {
				// Brand colors
				brand: {
					primary: '#2563EB',
					'primary-700': '#1D4ED8',
					secondary: '#0EA5A4',
					accent: '#7C3AED',
				},
				// Semantic colors
				semantic: {
					success: '#10B981',
					warning: '#F59E0B',
					danger: '#EF4444',
					info: '#0EA5E9',
				},
				// Neutral colors
				ink: {
					900: '#0B1220',
					700: '#1F2937',
					500: '#6B7280',
					300: '#CBD5E1',
					100: '#F1F5F9',
				},
				surface: {
					DEFAULT: '#0E1726',
					alt: '#111827',
					elevated: '#0F172A',
					'on-surface': '#E5E7EB',
				},
				// State colors
				states: {
					focus: '#93C5FD',
					link: '#3B82F6',
					'link-visited': '#6D28D9',
				},
				// Legacy shadcn colors for compatibility
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#2563EB',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: '#0EA5A4',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				accent: {
					DEFAULT: '#7C3AED',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: '#EF4444',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			spacing: {
				'0': '0',
				'1': '4px',
				'2': '8px',
				'3': '12px',
				'4': '16px',
				'5': '20px',
				'6': '24px',
				'7': '28px',
				'8': '32px',
				'10': '40px',
				'12': '48px',
				'14': '56px',
				'16': '64px',
				'20': '80px',
				'24': '96px',
				'32': '128px',
			},
			borderRadius: {
				sm: '6px',
				md: '10px',
				lg: '16px',
				xl: '24px',
				pill: '999px',
				// Legacy
				'lg-legacy': 'var(--radius)',
				'md-legacy': 'calc(var(--radius) - 2px)',
				'sm-legacy': 'calc(var(--radius) - 4px)',
			},
			boxShadow: {
				soft: '0 10px 30px rgba(16,24,40,0.15)',
				elevated: '0 20px 50px rgba(16,24,40,0.25)',
				focus: '0 0 0 3px rgba(147,197,253,0.8)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				'pulse-glow': {
					'0%, 100%': { 
						opacity: '1',
						transform: 'scale(1)'
					},
					'50%': { 
						opacity: '0.8',
						transform: 'scale(1.05)'
					},
				},
				'fade-in-up': {
					from: {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'fade-in-up': 'fade-in-up 0.5s ease-out',
			},
			transitionDuration: {
				fast: '120ms',
				base: '240ms',
				slow: '420ms',
				epic: '900ms',
			},
			transitionTimingFunction: {
				spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
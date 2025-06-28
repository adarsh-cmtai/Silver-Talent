
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// New custom colors based on the provided palette
				'deep-blue': '#154370', // Deep Corporate Blue
				'action-blue': '#007BFF', // Bright Action Blue
				'vibrant-gold': '#FFB800', // Vibrant Gold/Yellow
				'bg-light': '#F8F9FA', // Light Neutral Gray for backgrounds
				'border-gray': '#DEE2E6', // Medium Gray for borders
				'text-dark': '#343A40', // Dark Gray for text
				'text-medium': '#495057', // Medium Gray for secondary text
				'white': '#FFFFFF', // Pure white
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					"0%": {
						opacity: "0",
						transform: "translateY(10px)"
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)"
					}
				},
				'slide-in-right': {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(0)" }
				},
				'slide-left': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-100%)' }
				},
				'counter': {
					'0%': { transform: 'translateY(0)' },
					'10%': { transform: 'translateY(0)' },
					'25%': { transform: 'translateY(-100%)' },
					'35%': { transform: 'translateY(-100%)' },
					'50%': { transform: 'translateY(-200%)' },
					'60%': { transform: 'translateY(-200%)' },
					'75%': { transform: 'translateY(-300%)' },
					'85%': { transform: 'translateY(-300%)' },
					'100%': { transform: 'translateY(-400%)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'slide-left': 'slide-left 30s linear infinite',
				'counter': 'counter 10s ease infinite'
			},
			fontFamily: {
				'montserrat': ['Montserrat', 'sans-serif'],
				'open-sans': ['Open Sans', 'sans-serif'],
				'poppins': ['Poppins', 'sans-serif'], // Adding Poppins as a font option
				'inter': ['Inter', 'sans-serif'], // Adding Inter as a font option
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

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
				jarvis: {
					glow: 'hsl(var(--jarvis-glow))',
					'glow-soft': 'hsl(var(--jarvis-glow-soft))',
					'glow-intense': 'hsl(var(--jarvis-glow-intense))',
					surface: 'hsl(var(--jarvis-surface))',
					'surface-elevated': 'hsl(var(--jarvis-surface-elevated))',
					glass: 'hsl(var(--jarvis-glass))',
					'glass-border': 'hsl(var(--jarvis-glass-border))',
					hologram: 'hsl(var(--jarvis-hologram))',
					neural: 'hsl(var(--jarvis-neural))',
					energy: 'hsl(var(--jarvis-energy))'
				}
			},
			backgroundImage: {
				'gradient-jarvis': 'var(--gradient-jarvis)',
				'gradient-jarvis-intense': 'var(--gradient-jarvis-intense)',
				'gradient-surface': 'var(--gradient-surface)',
				'gradient-hologram': 'var(--gradient-hologram)',
				'gradient-neural': 'var(--gradient-neural)',
				'gradient-energy': 'var(--gradient-energy)'
			},
			boxShadow: {
				'jarvis': 'var(--shadow-jarvis)',
				'jarvis-intense': 'var(--shadow-jarvis-intense)',
				'surface': 'var(--shadow-surface)',
				'hologram': 'var(--shadow-hologram)',
				'neural': 'var(--shadow-neural)',
				'energy': 'var(--shadow-energy)'
			},
			transitionProperty: {
				'jarvis': 'var(--transition-jarvis)',
				'glow': 'var(--transition-glow)',
				'hologram': 'var(--transition-hologram)',
				'neural': 'var(--transition-neural)'
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
				'pulse-glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px hsl(var(--jarvis-glow) / 0.3)'
					},
					'50%': {
						boxShadow: '0 0 40px hsl(var(--jarvis-glow) / 0.6)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'typing': {
					'0%': {
						width: '0'
					},
					'100%': {
						width: '100%'
					}
				},
				'hologram': {
					'0%': {
						transform: 'translateX(0) skewX(0deg)',
						opacity: '1'
					},
					'25%': {
						transform: 'translateX(2px) skewX(1deg)',
						opacity: '0.9'
					},
					'50%': {
						transform: 'translateX(-1px) skewX(-0.5deg)',
						opacity: '0.95'
					},
					'75%': {
						transform: 'translateX(1px) skewX(0.5deg)',
						opacity: '0.9'
					},
					'100%': {
						transform: 'translateX(0) skewX(0deg)',
						opacity: '1'
					}
				},
				'neural-pulse': {
					'0%': {
						transform: 'scale(1) rotate(0deg)',
						opacity: '0.7'
					},
					'50%': {
						transform: 'scale(1.1) rotate(180deg)',
						opacity: '1'
					},
					'100%': {
						transform: 'scale(1) rotate(360deg)',
						opacity: '0.7'
					}
				},
				'energy-flow': {
					'0%': {
						backgroundPosition: '0% 50%'
					},
					'50%': {
						backgroundPosition: '100% 50%'
					},
					'100%': {
						backgroundPosition: '0% 50%'
					}
				},
				'particle-float': {
					'0%': {
						transform: 'translateY(0px) translateX(0px) rotate(0deg)',
						opacity: '0'
					},
					'10%': {
						opacity: '1'
					},
					'90%': {
						opacity: '1'
					},
					'100%': {
						transform: 'translateY(-100px) translateX(20px) rotate(360deg)',
						opacity: '0'
					}
				},
				'data-stream': {
					'0%': {
						transform: 'translateY(100%) scaleY(0)'
					},
					'50%': {
						transform: 'translateY(0%) scaleY(1)'
					},
					'100%': {
						transform: 'translateY(-100%) scaleY(0)'
					}
				}
			},
			'grid-move': {
				'0%': { transform: 'translate(0, 0)' },
				'100%': { transform: 'translate(60px, 60px)' }
			},
			'scan': {
				'0%': { transform: 'translateY(-100%)', opacity: '0' },
				'50%': { opacity: '1' },
				'100%': { transform: 'translateY(400%)', opacity: '0' }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'typing': 'typing 0.5s steps(40, end)',
				'hologram': 'hologram 4s ease-in-out infinite',
				'neural-pulse': 'neural-pulse 3s ease-in-out infinite',
				'energy-flow': 'energy-flow 6s ease-in-out infinite',
				'particle-float': 'particle-float 8s linear infinite',
				'data-stream': 'data-stream 2s ease-in-out infinite',
				'scan': 'scan 2s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

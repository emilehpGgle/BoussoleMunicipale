import type { Config } from "tailwindcss"

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		screens: {
  			sm: '640px',
  			md: '768px',
  			lg: '1024px',
  			xl: '1280px',
  			'2xl': '1536px',
  			'3xl': '1920px'
  		}
  	},
  	extend: {
  		fontSize: {
  			'h1-lg': '2.75rem',
  			'fluid-xs': 'clamp(0.75rem, 1.5vw, 0.875rem)',
  			'fluid-sm': 'clamp(0.875rem, 2vw, 1rem)',
  			'fluid-base': 'clamp(1rem, 2.5vw, 1.25rem)',
  			'fluid-lg': 'clamp(1.125rem, 3vw, 1.5rem)',
  			'fluid-xl': 'clamp(1.25rem, 3.5vw, 1.875rem)',
  			'fluid-2xl': 'clamp(1.5rem, 4vw, 2.25rem)',
  			'fluid-3xl': 'clamp(1.875rem, 4.5vw, 2.75rem)',
  			'fluid-hero': 'clamp(2.25rem, 5vw, 3.5rem)',
  			'fluid-subtitle': 'clamp(1rem, 2.5vw, 1.375rem)'
  		},
  		spacing: {
  			'fluid-xs': 'clamp(0.5rem, 1.5vw, 0.75rem)',
  			'fluid-sm': 'clamp(1rem, 2.5vw, 1.5rem)',
  			'fluid-md': 'clamp(1.5rem, 4vw, 2.5rem)',
  			'fluid-lg': 'clamp(2.5rem, 6vw, 4rem)',
  			'fluid-xl': 'clamp(3rem, 7vw, 5rem)',
  			'fluid-2xl': 'clamp(4rem, 8vw, 6rem)'
  		},
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
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			'teal-main': {
  				'50': '#EAFCFC',
  				'100': '#D1F7F8',
  				'200': '#A4EDF0',
  				'300': '#76E3E7',
  				'400': '#49D9DE',
  				'500': '#04454A',
  				'600': '#035A60',
  				'700': '#02444A',
  				'800': '#022D33',
  				'900': '#01161B',
  				DEFAULT: '#04454A'
  			},
  			'teal-special': 'hsl(var(--teal-special))',
  			'azure-web': '#EAFCFC',
  			'isabelline': '#FCF7F3',
  			'eerie-black': '#222222',
  			'off-white': '#FFFEFE',
  			'midnight-green': '#04454A',
  			'color-1': 'hsl(var(--color-1))',
  			'color-2': 'hsl(var(--color-2))',
  			'color-3': 'hsl(var(--color-3))',
  			'color-4': 'hsl(var(--color-4))',
  			'color-5': 'hsl(var(--color-5))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			xl: 'calc(var(--radius) + 4px)',
  			'2xl': 'calc(var(--radius) + 8px)',
  			'3xl': 'calc(var(--radius) + 16px)'
  		},
  		boxShadow: {
  			soft: '0 6px 15px rgba(0, 0, 0, 0.08)',
  			'soft-md': '0 8px 20px rgba(0, 0, 0, 0.09)',
  			'primary-glow': '0 0 15px 0px hsl(var(--primary) / 0.35)',
  			'subtle-glow': '0 2px 8px hsl(var(--primary) / 0.2)'
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
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideInUp: {
  				'0%': {
  					transform: 'translateY(20px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			pulseScale: {
  				'0%, 100%': {
  					transform: 'scale(1)'
  				},
  				'50%': {
  					transform: 'scale(1.02)'
  				}
  			},
  			aurora: {
  				from: {
  					backgroundPosition: '50% 50%, 50% 50%'
  				},
  				to: {
  					backgroundPosition: '350% 50%, 350% 50%'
  				}
  			},
  			'border-pulse': {
  				'0%, 100%': {
  					borderColor: '#04454A'
  				},
  				'50%': {
  					borderColor: '#056B72'
  				}
  			},
  			rainbow: {
  				'0%': {
  					'background-position': '0%'
  				},
  				'100%': {
  					'background-position': '200%'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			fadeIn: 'fadeIn 0.6s ease-out',
  			slideInUp: 'slideInUp 0.6s ease-out forwards',
  			pulseScale: 'pulseScale 3s ease-in-out infinite',
  			aurora: 'aurora 60s linear infinite',
  			'border-pulse': 'border-pulse 6s ease-in-out infinite',
  			rainbow: 'rainbow var(--speed, 2s) infinite linear'
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'sans-serif'
  			]
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
} satisfies Config

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config

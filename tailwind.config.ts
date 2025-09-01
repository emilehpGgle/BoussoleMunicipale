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
        'sm': '640px',   // Tablet
        'md': '768px',   // Tablet large  
        'lg': '1024px',  // Laptop
        'xl': '1280px',  // Desktop 16"
        '2xl': '1536px', // Large Desktop
        '3xl': '1920px'  // Ultra-wide
      },
    },
    extend: {
      fontSize: {
        "h1-lg": "2.75rem",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        "teal-main": {
          DEFAULT: "#04454A",
          50: "#EAFCFC",
          100: "#D1F7F8",
          200: "#A4EDF0",
          300: "#76E3E7",
          400: "#49D9DE",
          500: "#04454A",
          600: "#035A60",
          700: "#02444A",
          800: "#022D33",
          900: "#01161B",
        },
        "teal-special": "hsl(var(--teal-special))",
        "azure-web": "#EAFCFC",
        "isabelline": "#FCF7F3",
        "eerie-black": "#222222",
        "off-white": "#FFFEFE",
        "midnight-green": "#04454A",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
        "3xl": "calc(var(--radius) + 16px)",
      },
      boxShadow: {
        soft: "0 6px 15px rgba(0, 0, 0, 0.08)",
        "soft-md": "0 8px 20px rgba(0, 0, 0, 0.09)",
        "primary-glow": "0 0 15px 0px hsl(var(--primary) / 0.35)",
        "subtle-glow": "0 2px 8px hsl(var(--primary) / 0.2)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseScale: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" }, // Reduced scale from 1.03 to 1.02
        },
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
              animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
          fadeIn: "fadeIn 0.6s ease-out",
          slideInUp: "slideInUp 0.6s ease-out forwards",
          pulseScale: "pulseScale 3s ease-in-out infinite", // Increased duration from 2.5s to 3s
          aurora: "aurora 60s linear infinite",
        },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
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

import type { Config } from "tailwindcss";

const config = {
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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      silka: "var(--font-silka)",
    },
    fontSize: {
      sm: ["0.75rem", "1.5em"], // 12px
      md: ["1.5rem", "1.5em"], // 24px
    },
    colors: {
      current: "currentColor",
      transparent: "transparent",
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      turquoise: {
        DEFAULT: "hsl(var(--turquoise))",
        foreground: "hsl(var(--turquoise-foreground))",
      },
      plum: {
        DEFAULT: "hsl(var(--plum))",
        foreground: "hsl(var(--plum-foreground))",
      },
      mustard: {
        DEFAULT: "hsl(var(--mustard))",
        foreground: "hsl(var(--mustard-foreground))",
      },
    },
    borderRadius: {
      none: "0px",
      DEFAULT: "var(--radius)",
      lg: "var(--radius-lg)",
      full: "9999px",
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    ".storybook/**/*.{ts,tsx}",
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
      destructive: "hsl(var(--destructive))",
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
      height: {
        35: "8.75rem",
        50: "12.5rem",
        55: "13.75rem",
        65: "16.25rem",
        70: "17.5rem",
        75: "18.75rem",
        85: "21.25rem",
        90: "22.5rem",
        95: "23.75rem",
        100: "25rem",
        105: "26.25rem",
        110: "27.5rem",
        115: "28.75rem",
        120: "30rem",
        125: "31.25rem",
        130: "32.5rem",
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

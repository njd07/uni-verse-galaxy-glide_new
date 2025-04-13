
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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Universe custom colors
        universe: {
          dark: "#121626",
          darker: "#0A0E1D",
          card: "#16213E",
          blue: "#2E8DEA",
          purple: "#7E69AB",
          pink: "#D946EF",
          neonBlue: "#42C6FF",
          neonPurple: "#7B5CFA",
          neonPink: "#F062E5",
          highPriority: "#FF5757",
          mediumPriority: "#FFD700",
          lowPriority: "#42C6FF",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "scale-out": {
          from: { transform: "scale(1)", opacity: "1" },
          to: { transform: "scale(0.95)", opacity: "0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        glow: {
          "0%, 100%": { filter: "brightness(100%)" },
          "50%": { filter: "brightness(150%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-out-right": "slide-out-right 0.3s ease-out",
        "slide-in-left": "slide-in-left 0.3s ease-out",
        "slide-out-left": "slide-out-left 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "scale-out": "scale-out 0.2s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-blue-purple": "linear-gradient(90deg, #42C6FF 0%, #7B5CFA 100%)",
        "gradient-purple-pink": "linear-gradient(90deg, #7B5CFA 0%, #F062E5 100%)",
        "gradient-blue-pink": "linear-gradient(90deg, #42C6FF 0%, #F062E5 100%)",
        "starry-night": "url('/lovable-uploads/b97d0169-ecab-4f57-bb6e-9295162791b4.png')",
      },
      boxShadow: {
        neon: "0 0 5px rgba(66, 198, 255, 0.5), 0 0 20px rgba(66, 198, 255, 0.3)",
        "neon-purple": "0 0 5px rgba(123, 92, 250, 0.5), 0 0 20px rgba(123, 92, 250, 0.3)",
        "neon-pink": "0 0 5px rgba(240, 98, 229, 0.5), 0 0 20px rgba(240, 98, 229, 0.3)",
      },
      textShadow: {
        blue: "0 0 5px rgba(66, 198, 255, 0.5), 0 0 20px rgba(66, 198, 255, 0.3)",
        purple: "0 0 5px rgba(123, 92, 250, 0.5), 0 0 20px rgba(123, 92, 250, 0.3)",
        pink: "0 0 5px rgba(240, 98, 229, 0.5), 0 0 20px rgba(240, 98, 229, 0.3)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow-blue": {
          textShadow: "0 0 5px rgba(66, 198, 255, 0.5), 0 0 20px rgba(66, 198, 255, 0.3)",
        },
        ".text-shadow-purple": {
          textShadow: "0 0 5px rgba(123, 92, 250, 0.5), 0 0 20px rgba(123, 92, 250, 0.3)",
        },
        ".text-shadow-pink": {
          textShadow: "0 0 5px rgba(240, 98, 229, 0.5), 0 0 20px rgba(240, 98, 229, 0.3)",
        },
        ".gradient-border": {
          position: "relative",
          "&::before": {
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "inherit",
            padding: "2px",
            background: "linear-gradient(90deg, #42C6FF, #7B5CFA, #F062E5)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            pointerEvents: "none",
          },
        },
        ".gradient-border-hover": {
          "&:hover::before": {
            opacity: 1,
          },
          "&::before": {
            opacity: 0.7,
            transition: "opacity 0.3s ease",
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
} satisfies Config;

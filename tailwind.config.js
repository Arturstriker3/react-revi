/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      scale: {
        102: "1.02",
      },
      animation: {
        legendary: "legendary-pulse 2s ease-in-out infinite",
        mythical: "mythical-pulse 2s ease-in-out infinite",
        epic: "epic-pulse 2s ease-in-out infinite",
        rare: "rare-pulse 2s ease-in-out infinite",
        glitter: "glitter 2s ease-in-out infinite",
        rainbow: "rainbow-shift 3s linear infinite",
      },
      keyframes: {
        "legendary-pulse": {
          "0%, 100%": {
            boxShadow:
              "0 0 15px rgba(245, 158, 11, 0.6), 0 0 30px rgba(245, 158, 11, 0.4), 0 0 45px rgba(245, 158, 11, 0.2)",
          },
          "50%": {
            boxShadow:
              "0 0 20px rgba(245, 158, 11, 0.8), 0 0 40px rgba(245, 158, 11, 0.6), 0 0 60px rgba(245, 158, 11, 0.4)",
          },
        },
        "mythical-pulse": {
          "0%, 100%": {
            boxShadow:
              "0 0 15px rgba(168, 85, 247, 0.6), 0 0 30px rgba(168, 85, 247, 0.4), 0 0 45px rgba(168, 85, 247, 0.2)",
          },
          "50%": {
            boxShadow:
              "0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.6), 0 0 60px rgba(168, 85, 247, 0.4)",
          },
        },
        "epic-pulse": {
          "0%, 100%": {
            boxShadow:
              "0 0 15px rgba(236, 72, 153, 0.6), 0 0 30px rgba(236, 72, 153, 0.4), 0 0 45px rgba(236, 72, 153, 0.2)",
          },
          "50%": {
            boxShadow:
              "0 0 20px rgba(236, 72, 153, 0.8), 0 0 40px rgba(236, 72, 153, 0.6), 0 0 60px rgba(236, 72, 153, 0.4)",
          },
        },
        "rare-pulse": {
          "0%, 100%": {
            boxShadow:
              "0 0 15px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4), 0 0 45px rgba(59, 130, 246, 0.2)",
          },
          "50%": {
            boxShadow:
              "0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.4)",
          },
        },
        glitter: {
          "0%, 100%": {
            opacity: "0.6",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.5)",
          },
        },
        "rainbow-shift": {
          "0%": {
            filter: "hue-rotate(0deg)",
          },
          "100%": {
            filter: "hue-rotate(360deg)",
          },
        },
      },
    },
  },
  plugins: [],
};

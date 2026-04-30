import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        surface: "var(--color-surface)",
        overlay: "var(--color-overlay)",
        border: "var(--color-border)",
        ink: {
          100: "var(--color-text-placeholder)",
          200: "var(--color-text-muted)",
          300: "var(--color-text-secondary)",
          400: "var(--color-text-primary)",
          700: "var(--color-text-secondary)",
          800: "var(--color-text-primary)",
          900: "var(--color-text-primary)",
        },
        accent: {
          500: "var(--color-accent)",
          600: "var(--color-accent-hover)",
          muted: "var(--color-accent-muted)",
        },
        warm: {
          100: "var(--color-warm)",
          700: "var(--color-warm-hover)",
        },
        danger: "var(--color-danger)",
        muted: "var(--color-text-muted)",
      },
      boxShadow: {
        "inner-sm": "inset 0 1px 2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;

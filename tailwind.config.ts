import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/scenes/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                void: "#050505",
                space: "#0A0A12",
                "neon-cyan": "#00F0FF",
                "neon-purple": "#7000FF",
                "neon-pink": "#FF0055",
                "glass-10": "rgba(255, 255, 255, 0.03)",
                "glass-20": "rgba(255, 255, 255, 0.07)",
                "glass-30": "rgba(255, 255, 255, 0.12)",
                "glass-border": "rgba(255, 255, 255, 0.1)",
            },
            fontFamily: {
                display: ["Rajdhani", "sans-serif"],
                body: ["Inter", "sans-serif"],
            },
            animation: {
                float: "float 6s ease-in-out infinite",
                glow: "glow 3s ease-in-out infinite alternate",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                glow: {
                    from: { boxShadow: "0 0 10px -5px #00F0FF" },
                    to: { boxShadow: "0 0 20px 5px #7000FF" },
                },
            },
        },
    },
    plugins: [],
};

export default config;

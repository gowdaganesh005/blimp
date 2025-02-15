import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        chirp:['Sora','san-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }:{addUtilities:any}) => {
        addUtilities({
            /* Hide scrollbar for Chrome, Safari, and Opera */
            ".scrollbar-hidden::-webkit-scrollbar": {
                display: "none",
            },
            ".scrollbar-hidden": {
                "scrollbar-width": "none", /* Firefox */
                "-ms-overflow-style": "none", /* IE and Edge */
            },
        });
    }),
],

} satisfies Config;

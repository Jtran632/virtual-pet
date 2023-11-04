import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      cursor: {
        'shover': 'url(../../public/treasureGame/shovel.png), pointer',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'lakeside': "url('../../public/lakeside.jpg')",
          'desert': "url('../../public/desert.jpg')",
          'campsite': "url('../../public/campsite.jpg')",
          'meadow': "url('../../public/meadow.png')",
          'beach': "url('../../public/beach.png')",
          'fields': "url('../../public/fields.png')",
          'hill': "url('../../public/hill.png')",
          'topDirt': "url('../../public/topDirt.png')",
          'bottomDirt': "url('../../public/bottomDirt.png')",
      },
      fontFamily: {
        'pixel': ['pixel'],
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" }
        },
        pingSlow: {
          '0%, 100%': {transform: 'scale(1.2) translateY(-25%)', opacity: '1', AnimationEffect: "cubic-bezier(0.8,0,1,1)"},
          '50%': {
            transform: 'translateY(0)',
            AnimationEffect: 'cubic-bezier(0, 0, 0.2, 1)',
          }
        }
      },
      animation: {
        wiggle: "wiggle 3s ease-in-out infinite",
        pingSlow: "pingSlow 1s ",
      },
    },
  },
  plugins: [],
}
export default config

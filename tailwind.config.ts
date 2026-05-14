import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F4F1EA',
        'paper-deep': '#EAE5D9',
        ink: '#161513',
        'ink-soft': '#3A3631',
        'ink-mute': '#7A736A',
        rule: '#D9D2C2',
        // Brand accents
        'buds': '#1F3A2B',
        'buds-soft': '#3D6B4F',
        'thread': '#1A1A1C',
        'thread-soft': '#4A4A4D',
        'nft': '#2742FF',
        'nft-soft': '#5C7BFF',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'hairline': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em' }],
      },
      letterSpacing: {
        'widest-2': '0.22em',
      },
    },
  },
  plugins: [],
};

export default config;

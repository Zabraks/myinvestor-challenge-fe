import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--color-primary))',
        secondary: 'hsl(var(--color-secondary))',
        'bg-primary': 'hsl(var(--color-background))',
        'bg-secondary': 'hsl(var(--color-foreground))',
      },
      spacing: {
        base: 'var(--spacing-base)',
        gap: 'var(--spacing-gap)',
      },
      fontSize: {
        base: 'var(--font-size-base)',
        lg: 'var(--font-size-lg)',
      },
    },
  },
  plugins: [],
};

export default config;

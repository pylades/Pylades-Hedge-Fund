// In order to see all the keys you can create the full tailwind configuration file
// npx tailwind init tailwind-full.config.js --full

module.exports = {
  purge: {
    content: ['./**/*.ts', './**/*.tsx'],
    options: {},
  },
  future: { removeDeprecatedGapUtilities: true },
  theme: {
    colors: {
      black: '#000000',
      white: '#ffffff',
      gray: { light: '#dbdbdb' },
    },
    fontSize: {
      xs: '0.781rem',
      sm: '0.875rem',
    },
    maxWidth: {
      xl: '40.5rem',
    },
    extend: {
      fontFamily: {
        mono: ['Source Code Pro', 'monospace'],
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
  },
};

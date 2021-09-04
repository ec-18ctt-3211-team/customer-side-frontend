module.exports = {
  mode: 'jit',
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      success: '#2BA75D',
      error: '#C35757',
      white: '#ffffff',
      brown: {
        DEFAULT: '#88604A',
        50: '#E6D9D1',
        100: '#DDCBC1',
        200: '#CBAFA0',
        300: '#B9947F',
        400: '#A7785E',
        500: '#88604A',
        600: '#674938',
        700: '#463126',
        800: '#251A14',
        900: '#040302',
      },
      gray: {
        DEFAULT: '#817E7E',
        50: '#F2F2F2',
        100: '#E6E5E5',
        200: '#CDCBCB',
        300: '#B3B2B2',
        400: '#9A9898',
        500: '#817E7E',
        600: '#676565',
        700: '#4D4C4C',
        800: '#343232',
        900: '#1A1919',
      },
    },
  },
  variants: {},
  plugins: [],
  purge: {
    // Filenames to scan for classes
    content: [
      './src/**/*.html',
      './src/**/*.js',
      './src/**/*.jsx',
      './src/**/*.ts',
      './src/**/*.tsx',
      './public/index.html',
    ],
    // Options passed to PurgeCSS
    options: {
      // Whitelist specific selectors by name
      // safelist: [],
    },
  },
};

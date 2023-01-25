import { extendTheme } from '@chakra-ui/react';

export const myTheme = extendTheme({
  colors: {
    primary: '#0a5230',
    secondary: '#22022e',
    titleLight: '#e1e1e1',
    titleDark: '#161616',
    subtitleDark: '#00c96b',
    subtitleLight: '#007c42',
    textDark: '#1b1b1b',
    textLight: '#d1d1d1',
  },
  breakpoints: {
    sm: '40rem', //640px
    md: '48rem', //768px
    lg: '64rem', //1024px
    xl: '80rem', //1280px
    '2xl': '96rem', //1536px
  },
});

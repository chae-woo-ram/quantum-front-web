'use client';

import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: {
      main: '#8ca03b', // 기본 색상
      contrastText: '#fff',
    },
    secondary: {
      main: '#f0f0f0', // 보조 색상
    },
  },
});

export default theme;

'use client';

import { createTheme } from '@mui/material/styles';
import { pretendard } from './localFonts.fonts';

// 테마를 설정합니다.
const theme = createTheme({
  typography: {
    fontFamily: pretendard.style.fontFamily,
    fontSize: 14,
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

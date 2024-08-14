'use client';

import { GlobalStyle } from '@/styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import StyledComponentsRegistry from './registry';

const Providers = (props: React.PropsWithChildren) => {
  return (
    <StyledComponentsRegistry>
      <GlobalStyle />
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </StyledComponentsRegistry>
  );
};

export default Providers;

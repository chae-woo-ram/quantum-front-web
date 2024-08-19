'use client';

import { GlobalStyle } from '@/styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

const Providers = (props: React.PropsWithChildren) => {
  return (
    // <StyledComponentsRegistry> {/* </StyledComponentsRegistry> */}
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </>
  );
};

export default Providers;

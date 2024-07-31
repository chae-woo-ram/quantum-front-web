'use client';

import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html, body { 
    max-width: 100vw;

    ::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
  }

  main{
    width: 100%;
  }

  ul, ol {
    list-style: none;
  } 

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    all: unset;
    cursor: pointer;
  }

`;

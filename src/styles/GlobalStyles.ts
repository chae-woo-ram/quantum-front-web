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

  body {
    margin: 0;
  }

  main {
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

  /* 크롬 자동완성시 input css 변경 방지 */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s;
    -webkit-text-fill-color: #fff !important;
  }

  /* 이미지 드래그시 잔상방지 */
  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  }
  
  && .tsqd-open-btn-container {
    display: none !important;
  }
`;

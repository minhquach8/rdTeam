import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html, body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Nunito Sans', sans-serif;
    position: relative;
    top: 300px;
    background: #ff9c00;
    min-height: calc(100vh - 100px); 
}
    footer {
        height: 100px;
    }
`;
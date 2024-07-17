import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body, html {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        width: 100vw;
        height: 100vh;
    }
    /* @font-face {
        font-family: "AUTHENTICSans60";
        font-weight: 60;
        font-display: swap;
        src: local("AUTHENTICSans-60"), url("AUTHENTICSans-60.woff") format("woff");
    } */

`;

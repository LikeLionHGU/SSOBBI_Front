import { createGlobalStyle } from "styled-components";
import SUITBold from "../fonts/SUIT-Bold.ttf";
import SUITExtraBold from "../fonts/SUIT-ExtraBold.ttf";
import SUITExtraLight from "../fonts/SUIT-ExtraLight.ttf";
import SUITHeavy from "../fonts/SUIT-Heavy.ttf";
import SUITLight from "../fonts/SUIT-Light.ttf";
import SUITMedium from "../fonts/SUIT-Medium.ttf";
import SUITRegular from "../fonts/SUIT-Regular.ttf";
import SUITSemiBold from "../fonts/SUIT-SemiBold.ttf";
import SUITThin from "../fonts/SUIT-Thin.ttf";

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
    @font-face {
        font-family: "SUITBold";
        font-display: swap;
        src: url("SUITBold"), url(${SUITBold}) format('woff2'),
    }
    @font-face {
        font-family: "SUITExtraBold";
        font-display: swap;
        src: url("SUITExtraBold"), url(${SUITExtraBold}) format('woff2'),
    }
    @font-face {
        font-family: "SUITExtraLight";
        font-display: swap;
        src: url("SUITExtraLight"), url(${SUITExtraLight}) format('woff2'),
    }
    @font-face {
        font-family: "SUITHeavy";
        font-display: swap;
        src: url("SUITHeavy"), url(${SUITHeavy}) format('woff2'),
    }
    @font-face {
        font-family: "SUITLight";
        font-display: swap;
        src: url("SUITLight"), url(${SUITLight}) format('woff2'),
    }
    @font-face {
        font-family: "SUITMedium";
        font-display: swap;
        src: url("SUITMedium"), url(${SUITMedium}) format('woff2'),
    }
    @font-face {
        font-family: "SUITRegular";
        font-display: swap;
        src: url("SUITRegular"), url(${SUITRegular}) format('woff2'),
    }
    @font-face {
        font-family: "SUITSemiBold";
        font-display: swap;
        src: url("SUITSemiBold"), url(${SUITSemiBold}) format('woff2'),
    }
    @font-face {
        font-family: "SUITThin";
        font-display: swap;
        src: url("SUITThin"), url(${SUITThin}) format('woff2'),
    }

`;

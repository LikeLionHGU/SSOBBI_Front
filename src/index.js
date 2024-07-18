import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage";
import CreatePage from "./pages/CreatePage";
import KakaoLoginRedirect from "./pages/KakaoLoginRedirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/ssobbi",
    element: <MainPage />,
  },
  {
    path: "/ssobbi/create",
    element: <CreatePage />,
  },
  {
    path: "/login/oauth/kakao",
    element: <KakaoLoginRedirect />,
  },
]);

const themeColors = {
  colors: {
    COLOR10: "#F0FFF7",
    COLOR20: "#D0FFE5",
    COLOR30: "#AFFFD4",
    COLOR40: "#8FFFC2",
    COLOR50: "#6FFFB1",
    COLOR60: "#57EA9B",
    COLOR70: "#3FC87E",
    COLOR80: "#2AA663",
    COLOR90: "#19844A",
    COLOR100: "#0D6234",
    COLORBlack: "#001E0E",
    COLORDark: "#000804",
    COLORGray: "#F2F6F4",
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    {/* <React.StrictMode> */}
    <GlobalStyle />
    <ThemeProvider theme={themeColors}>
      <RouterProvider router={router} />
    </ThemeProvider>
    {/* </React.StrictMode> */}
  </RecoilRoot>
);

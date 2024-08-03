import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import AuthWrapper from "./hooks/AuthWrapper";
import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/Web/MainPage";
import CreatePage from "./pages/Web/CreatePage";
import CalenderPage from "./pages/Web/CalenderPage";
import KakaoLoginRedirect from "./pages/KakaoLoginRedirect";
import IncomePage from "./pages/Web/IncomePage";
import OverConsumptionPage from "./pages/Web/OverConsumptionPage";
import MyPage from "./pages/Web/MyPage";

//Mobile Version
import MobMainPage from "./pages/Mob/MobMainPage";
import MobCalenderPage from "./pages/Mob/MobCalenderPage";
import MobCreatePage from "./pages/Mob/MobCreatePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/ssobbi",
    element: (
      <AuthWrapper>
        <div className="default-page">
          <MainPage />
        </div>
        <div className="mobile-page">
          <MobMainPage />
        </div>
      </AuthWrapper>
    ),
  },
  {
    path: "/ssobbi/create",
    element: (
      <AuthWrapper>
        <div className="default-page">
          <CreatePage />
        </div>
        <div className="mobile-page">
          <MobCreatePage />
        </div>
      </AuthWrapper>
    ),
  },
  {
    path: "/ssobbi/calender",
    element: (
      <AuthWrapper>
        <div className="default-page">
          <CalenderPage />
        </div>
        <div className="mobile-page">
          <MobCalenderPage />
        </div>
      </AuthWrapper>
    ),
  },
  {
    path: "/login/oauth/kakao",
    element: <KakaoLoginRedirect />,
  },
  {
    path: "/ssobbi/income",
    element: (
      <AuthWrapper>
        <div className="default-page">
          <IncomePage />
        </div>
      </AuthWrapper>
    ),
  },
  {
    path: "/ssobbi/create/check",
    element: (
      <AuthWrapper>
        <div className="default-page">
          <OverConsumptionPage />
        </div>
      </AuthWrapper>
    ),
  },
  {
    path: "/ssobbi/mypage",
    element: (
      <AuthWrapper>
        <div className="default-page">
          <MyPage />
        </div>
      </AuthWrapper>
    ),
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
      <RouterProvider router={router}>
        <AuthWrapper>
          <Outlet />
        </AuthWrapper>
      </RouterProvider>
    </ThemeProvider>
    {/* </React.StrictMode> */}
  </RecoilRoot>
);

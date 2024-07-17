import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import MainPage from "./pages/MainPage";
import CreatePage from "./pages/CreatePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/create",
    element: <CreatePage />,
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
    COLORDark: "000804",
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={themeColors}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

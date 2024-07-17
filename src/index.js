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
    MAINCOLOR: "#e23910",
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

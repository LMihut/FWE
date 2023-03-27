import  React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./components/GlobalStyle"
import { Layout } from "./components/Layout";
import { theme } from "./components/theme";
import { DashboardPage } from "./pages/Dashboard/DashBoardPage";


export const App = () => {
  useEffect(() => {
    (async function() {
      const helloRequest = await fetch("/api");
      const halloJson = await helloRequest.json();
      console.log(halloJson);
    })();
  });
  return (
    <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
        <Layout> 
          <DashboardPage />
        </Layout>
    </ThemeProvider> 
    </>
  );
}

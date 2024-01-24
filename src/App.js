// src/components/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import Auth from "./components/Auth";
import Loading from "./components/Loading";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import SettingsPage from "./pages/SettingsPage";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #222;
    color: white;
  }
`;

const AppContainer = styled.div`
  display: flex;
  overflow: hidden;
  height: 90vh;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;

const App = () => {
  return (
    <Router>
      <Loading>
        {(loading) => (
          <Auth>
            {(user) => (
              <>
                <TopBar user={user} />
                <AppContainer>
                  <GlobalStyle />
                  <SideBar user={user} />
                  <MainContent>
                    <Routes>
                      <Route
                        path="/"
                        element={<HomePage user={user} loading={loading} />}
                      />
                      <Route
                        path="/account"
                        element={<AccountPage user={user} />}
                      />
                      <Route
                        path="/settings"
                        element={<SettingsPage user={user} />}
                      />
                    </Routes>
                  </MainContent>
                </AppContainer>
              </>
            )}
          </Auth>
        )}
      </Loading>
    </Router>
  );
};

export default App;

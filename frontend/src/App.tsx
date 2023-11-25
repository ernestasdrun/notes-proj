import React, { useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./styles/theme";
import { PaletteMode } from "@mui/material";
import { useSelector } from "react-redux";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserHomePage from "./pages/UserHomePage";
import SignUpPage from "./pages/SignUpPage";
import RemindPasswordPage from "./pages/RemindPasswordPage";
import { selectMode } from "./styles/modeSlice";
import { useAppSelector } from "./app/hooks";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  const mode = useSelector(selectMode);
  const theme = useMemo(() => createTheme(themeSettings(mode as PaletteMode)), [mode]);
  const isAuth = Boolean(useAppSelector((state) => state.auth.user?.token));

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isAuth ? <Navigate to="/home"/> : <HomePage />}/>
            <Route path="/login" element={isAuth ? <Navigate to="/home"/> : <LoginPage />}/>
            <Route path="/signup" element={isAuth ? <Navigate to="/home"/> : <SignUpPage />}/>
            <Route path="/reset" element={isAuth ? <Navigate to="/home"/> : <RemindPasswordPage />}/>
            <Route path="/home" element={isAuth ? <UserHomePage /> : <Navigate to="/login"/>}/>
            <Route path="/profile" element={isAuth ? <UserProfilePage /> : <Navigate to="/login"/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
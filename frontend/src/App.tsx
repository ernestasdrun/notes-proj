import React, { useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./styles/theme";
import { PaletteMode } from "@mui/material";
import { useSelector } from "react-redux";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserHomePage from "./pages/UserHomePage";
import SignUpPage from "./pages/SignUpPage";
import RemindPasswordPage from "./pages/RemindPasswordPage";

interface RootStateMode {
  mode: PaletteMode;
}

function App() {
  const mode = useSelector<RootStateMode>((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode as PaletteMode)), [mode]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/signup" element={<SignUpPage />}/>
            <Route path="/reset" element={<RemindPasswordPage />}/>
            <Route path="/home" element={<UserHomePage />}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;

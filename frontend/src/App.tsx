import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { createTheme } from "@mui/material/styles";
import { themeSettings } from './theme';
import { PaletteMode } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import HomePage from './scenes/homePage/HomePage';
import Navbar from './components/Navbar';

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
        <HomePage />
      </ThemeProvider>
    </div>
  );
}

export default App;

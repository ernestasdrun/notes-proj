import { createSlice } from "@reduxjs/toolkit";
import { PaletteMode } from "@mui/material";

const initialState = {
    mode: <PaletteMode>"light",
}

export const modeSlice = createSlice({
    name: "mode",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
    }
});

interface RootStateMode {
    theme: {
        mode: PaletteMode,
    },
}

export const selectMode = (state: RootStateMode) => state.theme.mode;
export const { setMode } = modeSlice.actions;
export default modeSlice.reducer;
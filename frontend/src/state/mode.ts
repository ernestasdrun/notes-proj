import { createSlice } from "@reduxjs/toolkit";
import { PaletteMode } from "@mui/material";

export interface IUser {
    _id: string;
    userName: string;
    email: string;
}

const initialState = {
    mode: <PaletteMode>"light",
    user: <IUser | null>null,
}

export const modeSlice = createSlice({
    name: "mode",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setUser: (state, userInfo) => {
            console.log("user info: ");
            state.user = userInfo.payload as IUser;
        },
        logOutUser: (state) => {
            state.user = null;
        },
    }
});

export const { setMode, setUser, logOutUser } = modeSlice.actions;
export default modeSlice.reducer;
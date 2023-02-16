import { createSlice } from "@reduxjs/toolkit";

/*interface IUser {
    _id: string;
    userName: string;
    email: string;
}

const initialState = {
    user: <IUser | null>null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, userInfo) => {
            console.log("user info: ");
            state.user = userInfo.payload as IUser;
        },
        logOutUser: (state) => {
            state.user = null;
        },
    }
});

export const { setUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;*/
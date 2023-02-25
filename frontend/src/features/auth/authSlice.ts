import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authService from "./authService";
import * as UserApi from "../../network/users_api";

interface RegisterUser {
    username: string,
    email: string,
    password: string,
}

interface ICategories {
    categories: string[]
}

interface CategoryUpdateUser {
    userId: string,
    username: string,
    categories: string[],
}

interface CategoryUpdatGroup {
    _id: string,
    name: string,
    categories: string[],
    users: string[],
    createdAt: string,
    updatedAt: string,
}

export interface IUser {
    userId: string;
    username: string;
    token: string;
    categories: string[];
}

const initialState = {
    user: <IUser | null>null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const registerUser = createAsyncThunk("auth/signup", async (user: RegisterUser, thunkAPI) => {
    try {
        return await authService.register(user);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const message: string = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const loginUser = createAsyncThunk("auth/login", async (user: UserApi.LoginCredentials, thunkAPI) => {
    try {
        return await authService.login(user);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const message: string = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ""
        },
        resetCategories: (state, action: PayloadAction<CategoryUpdateUser | CategoryUpdatGroup>) => {
            if (state.user) state.user.categories = action.payload.categories;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                console.log(action.payload),
                state.isLoading = false,
                state.isSuccess = true,
                state.user = action.payload
            })
            .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
                console.log(action.payload),
                state.isLoading = false,
                state.isError = true,
                state.message = action.payload,
                state.user = null
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                console.log(action.payload),
                state.isLoading = false,
                state.isSuccess = true,
                state.user = action.payload
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
                console.log(action.payload),
                state.isLoading = false,
                state.isError = true,
                state.message = action.payload,
                state.user = null
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null
            })
    },
});

export const { reset, resetCategories } = authSlice.actions;
export default authSlice.reducer;
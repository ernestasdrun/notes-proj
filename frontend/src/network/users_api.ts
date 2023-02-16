import { User } from "../models/user";
import { fetchData } from "./fetchData";

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
    passwordConfirm?: string,
}

export interface LoginCredentials {
    username: string,
    password: string,
}

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData(`http://127.0.0.1:5001/api/users`, { 
        method: "GET",
    });
    return response.json();
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData(`http://127.0.0.1:5001/api/users/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData(`http://127.0.0.1:5001/api/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export async function logout() {
    await fetchData(`http://127.0.0.1:5001/api/users/logout`, { 
        method: "POST",
    })
}
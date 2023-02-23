import { User } from "../models/user";
import { fetchData } from "./fetchData";
import { CategoryInput } from "./groups_api";

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

export async function getLoggedInUser(token: string): Promise<User> {
    const response = await fetchData(`http://127.0.0.1:5001/api/users`, { 
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
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

export async function addCategory(category: CategoryInput, token: string): Promise<User> {
    const response = await fetchData(`http://127.0.0.1:5001/api/users/addCat`, { 
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(category),
    });
    return response.json();
}

export async function removeCategory(category: CategoryInput, token: string): Promise<User> {
    const response = await fetchData(`http://127.0.0.1:5001/api/users/remCat`, { 
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(category),
    });
    return response.json();
}
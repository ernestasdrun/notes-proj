import axios from "axios";

const API_URL = "http://127.0.0.1:5001/api/users/";

const register = async (userData: any) => {
    const response = await axios.post(API_URL + "signup", userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data;
};

const login = async (userData: any) => {
    const response = await axios.post(API_URL + "login", userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data;
};

const logout = () => {
    localStorage.removeItem("user");
}

const authService = {
    register,
    login,
    logout,
};

export default authService;
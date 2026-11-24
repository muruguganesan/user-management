import api from "../api/axios";
import type { LoginFormDataType, RegisterFormDataType } from "../schemas/authSchemas";

const register = async (data: RegisterFormDataType) => {
    const response = await api.post("/auth/register", data);
    return response;
}

const login = async (data: LoginFormDataType) => {
    const response = await api.post("/auth/login", data);

    const { access_token } = response.data;
    localStorage.setItem("access_token", access_token);
    return response;
}

export { register, login };
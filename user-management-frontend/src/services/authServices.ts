import api from "../api/axios";
import type { LoginFormDataType, RegisterFormDataType } from "../schemas/authSchemas";

const register = (data: RegisterFormDataType) => {
    const response = api.post("/auth/register", data);
    return response;
}

const login = (data: LoginFormDataType) => {
    const response = api.post("/auth/login", data);
    return response;
}

export { register, login };
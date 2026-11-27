import api from "../api/axios";
import type { LoginFormDataType, RegisterFormDataType } from "../schemas/authSchemas";
import { tokenStore } from "./tokenStore";

const register = async (data: RegisterFormDataType) => {
    const response = await api.post("/auth/register", data);
    return response;
}

const login = async (data: LoginFormDataType) => {
    const response = await api.post("/auth/login", data);

    const { access_token } = response.data;
    tokenStore.set(access_token);
    return response;
}

const logoutUser = async () => {
    try {
        const response = await api.post('/auth/logout');
        return response;
    }
    finally {
        tokenStore.clear();
    }
}

const logoutAllUser = async () => {
    try {
        const response = await api.post('/auth/logout-all');
        return response;
    }
    finally {
        tokenStore.clear();
    }
}

export { register, login, logoutUser, logoutAllUser };
import api from "../api/axios";
import type { RegisterFormDataType } from "../schemas/authSchemas";

const register = (data: RegisterFormDataType) => {
    const response = api.post("/auth/register", data);
    return response;
}

export { register };
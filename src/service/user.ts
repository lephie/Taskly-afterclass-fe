import type { LoginRequest, RegisterRequest } from "@/types/user";
import http from "@/utils/http";


export const login = async (payload: LoginRequest) => {
    const {data} = await http.post("user/login", payload);
    return data;
}

export const register = async (payload: RegisterRequest) => {
    const {data} = await http.post("user/register", payload);
    return data;
}
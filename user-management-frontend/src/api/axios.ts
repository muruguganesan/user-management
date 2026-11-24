import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
const PORT = import.meta.env.VITE_PORT;
import { tokenStore } from '../services/tokenStore';

// Creating Instance
const api = axios.create({
    baseURL: `http://localhost:${PORT}/api/v1`,
    withCredentials: true
    // headers: {
    //     "Content-Type": "application/json"
    // }
});

// Separate instance to prevent refresh interceptor recursion
const refreshApi = axios.create({
    baseURL: `http://localhost:${PORT}/api/v1`,
    withCredentials: true
});


// Attach access token
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    //    const token = localStorage.getItem('access_token');
    const token = tokenStore.get();
    if (token) {
        config.headers.authorization = `Bearer ${token}`
    }

    return config;
});

let refreshPromise: Promise<string> | null = null;


// Handle expired access token
api.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
        const originalRequest = error.config as
            | (InternalAxiosRequestConfig & {
                _retry?: boolean;
            })
            | undefined;

        if (
            error.response?.status !== 401 ||
            !originalRequest ||
            originalRequest._retry ||
            originalRequest.url?.includes("/auth/refresh") ||
            originalRequest.url?.includes("/auth/login")
        ) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            // Share one refresh request across concurrent failures
            if (!refreshPromise) {
                refreshPromise = refreshApi
                    .post("/auth/refresh")
                    .then((response) => {
                        const newToken = response.data.accessToken;
                        console.log("newToken",newToken);

                        tokenStore.set(newToken);

                        return newToken;
                    })
                    .finally(() => {
                        refreshPromise = null;
                    });
            }

            const newAccessToken = await refreshPromise;

            // Retry original request
            originalRequest.headers.Authorization =
                `Bearer ${newAccessToken}`;

            return api(originalRequest);

        } catch (refreshError) {
            tokenStore.clear();

            // Application-level logout/navigation handling
            window.dispatchEvent(
                new Event("auth:expired")
            );

            return Promise.reject(refreshError);
        }
    }
);

export default api;
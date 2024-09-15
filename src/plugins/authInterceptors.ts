import { useAuthStore } from "@/stores/auth";
import { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export const bearerTokenRequestInterceptor = (config: InternalAxiosRequestConfig) => {
    const authStore = useAuthStore();
    console.log("Request interceptor: ", authStore.isAuthenticated);

    if (authStore.isAuthenticated) {
        config.headers["Authorization"] = "Bearer " + authStore.authenticatedUser?.token;
        console.log(config.headers);
    }
    return config;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const refreshTokenResponseInterceptor = async (error: any, apiInstance: AxiosInstance) => {
    const authStore = useAuthStore();
    const originalConfig = error.config;

    if (error.response?.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        console.log("Response interceptor: ", authStore.isAuthenticated, error);

        try {
            // Refresh token then retry once
            await authStore.refreshToken();

            // Place refreshed access token in the request header
            originalConfig.headers.headers["Authentication"] = "Bearer " + authStore.authenticatedUser?.token;

            return apiInstance(originalConfig);
        } catch (_error) {
            console.error("Refresh token failed");
            console.error(_error);

            return Promise.reject(_error);
        }
    }

    return Promise.reject(error);
};

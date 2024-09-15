import { defineStore } from "pinia";
import { Ref } from "vue";

import { KeycloakService } from "@/services/keycloak";
import { User } from "@/types/user";

export const useAuthStore = defineStore(
    "auth",
    () => {
        const keycloakOptions = {
            url: import.meta.env.VITE_KEYCLOAK_URL,
            clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
            realm: import.meta.env.VITE_KEYCLOAK_REALM,
            silentCheckSsoRedirectUri: `${location.origin}/public/silent-check-sso.html`,
        };

        const keycloakService = KeycloakService(keycloakOptions);

        const isAuthenticated: Ref<boolean> = keycloakService.isAuthenticated;
        const authenticatedUser: Ref<User | undefined> = keycloakService.authenticatedUser;

        const initialize = async (onInitializeCallback: () => void) => {
            await keycloakService.initialize(onInitializeCallback);
        };

        const refreshToken = async (): Promise<boolean> => {
            return await keycloakService.refreshToken();
        };

        const logout = async () => {
            keycloakService.logout(import.meta.env.VITE_APP_URL);
        };

        return {
            isAuthenticated,
            authenticatedUser,
            initialize,
            refreshToken,
            logout,
        };
    },
    { persist: true },
);

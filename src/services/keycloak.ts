import Keycloak, { KeycloakConfig } from "keycloak-js";
import { ref, Ref, toRef } from "vue";

import { User } from "@/types/user";

export const KeycloakService = (config: KeycloakConfig) => {
    const keycloakInstance: Ref<Keycloak> = ref(new Keycloak(config));

    const isAuthenticated: Ref<boolean> = toRef(!!keycloakInstance.value.authenticated);
    const authenticatedUser: Ref<User | undefined> = ref(undefined);

    const _setAuthenticatedUser = () => {
        if (
            keycloakInstance.value.token &&
            keycloakInstance.value.refreshToken &&
            keycloakInstance.value.idTokenParsed
        ) {
            authenticatedUser.value = {
                username: keycloakInstance.value.idTokenParsed.preferred_username,
                token: keycloakInstance.value.token,
                refreshToken: keycloakInstance.value.refreshToken,
            };
        }
    };

    const _clearAuthenticatedUser = () => {
        isAuthenticated.value = false;
        authenticatedUser.value = undefined;
    };

    const initialize = async (onInitializeCallback: () => void) => {
        try {
            isAuthenticated.value = await keycloakInstance.value.init({ onLoad: "login-required" });
        } catch (exception) {
            console.error("Could not initialize Keycloak.");
            console.error(exception);
        }

        _setAuthenticatedUser();

        onInitializeCallback();
    };

    const refreshToken = async (): Promise<boolean> => {
        try {
            await keycloakInstance.value.updateToken(480);
            _setAuthenticatedUser();

            return !!keycloakInstance.value.authenticated;
        } catch (error) {
            console.error("Failed to refresh token");
            console.error(error);
            return false;
        }
    };

    const logout = (url: string) => {
        try {
            keycloakInstance.value.logout({ redirectUri: url });
        } catch (error) {
            console.error(error);
        }
        _clearAuthenticatedUser();
    };

    return {
        isAuthenticated,
        authenticatedUser,
        initialize,
        logout,
        refreshToken,
    };
};

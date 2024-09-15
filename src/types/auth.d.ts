import "pinia";
import { Store } from "pinia";

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $auth: Store;
    }
}

export {};

import axios from "axios";

//import devProducts from "../../products-dev.json";

import { ApiDTO } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const api = axios.create({
    baseURL: "http://localhost:5181/api/v1/",
    decompress: true,
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Accept-Encoding": "compress, gzip",
    },
});

export default {
    async fetchProducts(): Promise<ApiDTO> {
        const stub = "product";
        return await api.get(stub);
    },
};

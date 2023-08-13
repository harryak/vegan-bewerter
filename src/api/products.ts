import axios from "axios";

import devProducts from "../../products-dev.json";

import { ApiDTO } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const api = axios.create({
  baseURL: "https://localhost/api/",
  decompress: true,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    "Accept-Encoding": "compress, gzip",
  },
});

export default {
  async fetchProducts(): Promise<ApiDTO> {
    return devProducts;
    //return await api.get("products");
  },
};

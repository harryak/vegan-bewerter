import axios from "axios";

import { Product } from "@/types";

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
  async fetchProducts(): Promise<Product[]> {
    return [
      {
        brand: { id: "0", name: "Test" },
        store: [{ id: "0", name: "ALDI" }],
        name: "Test",
        ratings: [
          {
            author: "Felix",
            stars: 4,
          },
        ],
        categories: ["Streichkeese"],
      },
    ];
    //return await api.get("products");
  },
};

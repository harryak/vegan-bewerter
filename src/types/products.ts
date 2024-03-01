export interface Brand {
    id: string;
    name: string;
}

export interface Category {
    id: string;
    name: string;
}

export interface Rating {
    author: string;
    stars: number;
    comment?: string;
}

export interface Store {
    id: string;
    name: string;
}

export interface Product {
    id?: string;
    brand: string;
    name: string;
    stores: string[];
    categories: string[];
    ratings: Rating[];
}

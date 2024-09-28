export interface NamedEntry {
    id: string;
    name: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Brand extends NamedEntry {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Category extends NamedEntry {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Store extends NamedEntry {}

export interface Rating {
    author: string;
    stars: number;
    comment?: string;
}

export interface Product extends NamedEntry {
    brand: Brand;
    stores: Store[];
    categories: Category[];
    ratings: Rating[];
}

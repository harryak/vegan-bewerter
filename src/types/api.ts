export interface BrandResponseDTO {
    id: string;
    name: string;
}

export interface ProductCategoryResponseDTO {
    id: string;
    displayName: string;
}

export interface ProductRatingResponseDTO {
    id: string;
    author: string;
    totalStars: number;
    comment?: string;
}

export interface ProductResponseDTO {
    id: string;
    brand: string;
    displayName: string;
    eans: string[];
    stores: string[];
    categories: string[];
    ratings: number[];
    totalRating: number;
}

export interface StoreResponseDTO {
    id: string;
    name: string;
}

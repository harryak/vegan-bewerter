export interface BrandRequestDTO {
    name: string;
}

export interface BrandResponseDTO {
    id: string;
    name: string;
}

export interface ProductCategoryRequestDTO {
    displayName: string;
}

export interface ProductCategoryResponseDTO {
    id: string;
    displayName: string;
}

export interface ProductRatingRequestDTO {
    author: string;
    totalStars: number;
    comment?: string;
}

export interface ProductRatingResponseDTO {
    id: string;
    author: string;
    totalStars: number;
    comment?: string;
}

export interface ProductRequestDTO {
    brand: string;
    displayName: string;
    eans: string[];
    stores: string[];
    categories: string[];
    ratings: number[];
    totalRating: number;
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

export interface StoreRequestDTO {
    name: string;
}

export interface StoreResponseDTO {
    id: string;
    name: string;
}

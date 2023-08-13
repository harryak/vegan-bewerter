export interface Rating {
  author: string;
  stars: number;
  comment?: string;
}

export interface Store {
  id: string;
  name: string;
}

export interface Brand {
  id: string;
  name: string;
}

export interface Product {
  brand: Brand;
  store: Store[];
  name: string;
  ratings: Rating[];
  categories: string[];
}

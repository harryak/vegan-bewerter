interface Rating {
  author: string;
  stars: number;
  comment: string;
}

interface Store {
  id: string;
  name: string;
}

interface Product {
  brand: string;
  store: Store[];
  name: string;
  ratings: Rating[];
  categories: string[];
}

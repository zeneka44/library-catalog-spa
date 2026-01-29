export interface Book {
  id: string;
  title: string;
  authors?: string[];
  description?: string;
  imageLinks?: {
    thumbnail?: string;
  };
  isLiked?: boolean;
  publisher?: string;
  publishedDate?: string;
  editionCount?: number;
  rating?: number;
  ratingCount?: number;
}

export interface ProductsState {
  items: Book[];
  filter: "all" | "liked";
  isLoading: boolean;
}

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
}

export interface ProductsState {
  items: Book[];
  filter: "all" | "liked";
}

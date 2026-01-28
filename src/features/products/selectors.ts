import { RootState } from "@/store/store";

export const selectAllProducts = (state: RootState) => state.products.items;

export const selectFilter = (state: RootState) => state.products.filter;

export const selectFilteredProducts = (state: RootState) => {
  const { items, filter } = state.products;
  if (filter === "liked") {
    return items.filter((item) => item.isLiked);
  }
  return items;
};

export const selectProductById = (id: string) => (state: RootState) =>
  state.products.items.find((p) => p.id === id);

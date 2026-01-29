import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, ProductsState } from "@/shared/types/product";

const initialState: ProductsState = {
  items: [],
  filter: "all",
  isLoading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Book[]>) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    setLoadingState: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const product = state.items.find((p) => p.id === action.payload);
      if (product) {
        product.isLiked = !product.isLiked;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
    addProduct: (state, action: PayloadAction<Book>) => {
      state.items.unshift(action.payload);
    },
    setFilter: (state, action: PayloadAction<"all" | "liked">) => {
      state.filter = action.payload;
    },
  },
});

export const {
  setProducts,
  setLoadingState,
  toggleLike,
  deleteProduct,
  addProduct,
  setFilter,
} = productsSlice.actions;
export default productsSlice.reducer;

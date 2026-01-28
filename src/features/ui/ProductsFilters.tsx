"use client";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { setFilter, setProducts } from "@/features/products/slice";
import { selectFilter } from "@/features/products/selectors";
import { googleBooksApi } from "@/shared/api/openlibrary";
import { useEffect } from "react";

export default function ProductsFilters() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectFilter);

  useEffect(() => {
    const loadInitialBooks = async () => {
      const books = await googleBooksApi.searchBooks("fiction", 20);
      dispatch(setProducts(books));
    };
    loadInitialBooks();
  }, [dispatch]);

  return (
    <div className="mb-6">
      <div className="flex gap-4">
        <button
          onClick={() => dispatch(setFilter("all"))}
          className={`px-4 py-2 rounded ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Все книги
        </button>
        <button
          onClick={() => dispatch(setFilter("liked"))}
          className={`px-4 py-2 rounded ${
            filter === "liked" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Избранное
        </button>
      </div>
    </div>
  );
}

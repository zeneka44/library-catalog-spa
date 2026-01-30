"use client";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { setFilter, setProducts } from "@/features/products/slice";
import { selectFilter } from "@/features/products/selectors";
import { googleBooksApi } from "@/shared/api/openlibrary";
import { useEffect } from "react";
import styles from "./ProductsFilters.module.css";

export default function ProductsFilters() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectFilter);
  const allProducts = useAppSelector((state) => state.products.items);

  useEffect(() => {
    if (allProducts.length === 0) {
      const loadInitialBooks = async () => {
        const books = await googleBooksApi.searchBooks("fiction", 20);
        dispatch(setProducts(books));
      };
      loadInitialBooks();
    }
  }, [dispatch, allProducts.length]);

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <button
          onClick={() => dispatch(setFilter("all"))}
          className={`${styles.button} ${
            filter === "all" ? styles.buttonActive : styles.buttonInactive
          }`}
        >
          Все книги
        </button>
        <button
          onClick={() => dispatch(setFilter("liked"))}
          className={`${styles.button} ${
            filter === "liked" ? styles.buttonActive : styles.buttonInactive
          }`}
        >
          Избранное
        </button>
      </div>
    </div>
  );
}

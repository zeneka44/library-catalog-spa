"use client";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { setFilter, setProducts } from "@/features/products/slice";
import { selectFilter } from "@/features/products/selectors";
import { booksApi } from "@/shared/api/openlibrary";
import { useEffect, useRef } from "react";
import styles from "./ProductsFilters.module.css";

const STORAGE_KEY = "library-catalog-products";

export default function ProductsFilters() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectFilter);
  const allProducts = useAppSelector((state) => state.products.items);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    const loadBooks = async () => {
      const savedProducts = localStorage.getItem(STORAGE_KEY);
      if (savedProducts) {
        try {
          const products = JSON.parse(savedProducts);
          dispatch(setProducts(products));
          return;
        } catch {
        }
      }

      const books = await booksApi.searchBooks("fiction", 20);
      dispatch(setProducts(books));
    };

    loadBooks();
  }, [dispatch]);

  useEffect(() => {
    if (allProducts.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allProducts));
    }
  }, [allProducts]);

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

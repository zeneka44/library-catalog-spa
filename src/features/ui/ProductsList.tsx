"use client";

import { useAppSelector } from "@/store/store";
import {
  selectFilteredProducts,
  selectAllProducts,
} from "@/features/products/selectors";
import ProductCard from "./ProductCard";
import styles from "./ProductsList.module.css";

export default function ProductsList() {
  const products = useAppSelector(selectFilteredProducts);
  const allProducts = useAppSelector(selectAllProducts);

  if (allProducts.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>Loading books...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>Book list is empty</p>
        <p className={styles.emptyText}>
          Add your first book using the &quot;Add book&quot; button
        </p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

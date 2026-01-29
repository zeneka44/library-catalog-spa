"use client";

import { useAppSelector } from "@/store/store";
import { selectFilteredProducts } from "@/features/products/selectors";
import ProductCard from "./ProductCard";
import styles from "./ProductsList.module.css";

export default function ProductsList() {
  const products = useAppSelector(selectFilteredProducts);

  if (products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>Список книг пуст</p>
        <p className={styles.emptyText}>
          Добавьте первую книгу через кнопку &quot;Добавить книгу&quot;
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

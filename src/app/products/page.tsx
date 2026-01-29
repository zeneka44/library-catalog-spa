"use client";

import ProductsList from "@/features/ui/ProductsList";
import ProductsFilters from "@/features/ui/ProductsFilters";
import Link from "next/link";
import styles from "./page.module.css";

export default function ProductsPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerInner}>
            <div>
              <h1 className={styles.headerTitle}>Booklet</h1>
              <p className={styles.headerSubtitle}>Ваш книжный каталог</p>
            </div>
            <Link href="/create-product" className={styles.addButton}>
              Добавить книгу
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <ProductsFilters />
        <ProductsList />
      </main>
    </div>
  );
}

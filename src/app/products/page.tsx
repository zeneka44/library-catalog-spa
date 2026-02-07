"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductsList from "@/features/ui/ProductsList";
import ProductsFilters from "@/features/ui/ProductsFilters";
import ProductModal from "@/features/ui/ProductModal";
import Link from "next/link";
import styles from "./page.module.css";

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerInner}>
            <div>
              <h1 className={styles.headerTitle}>Booklet</h1>
              <p className={styles.headerSubtitle}>Your book catalog</p>
            </div>
            <Link href="/create-product" className={styles.addButton}>
              Add book
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <ProductsFilters />
        <ProductsList />
      </main>

      {productId && <ProductModal id={decodeURIComponent(productId)} />}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsPageContent />
    </Suspense>
  );
}

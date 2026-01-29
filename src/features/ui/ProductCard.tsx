"use client";

import { Book } from "@/shared/types/product";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch } from "@/store/store";
import { toggleLike, deleteProduct } from "@/features/products/slice";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  readonly product: Book;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.card}>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch(toggleLike(product.id));
        }}
        className={styles.likeButton}
      >
        <Image
          src="/love.svg"
          alt="Like"
          width={20}
          height={20}
          className={`${styles.likeIcon} ${
            product.isLiked ? styles.likeIconActive : styles.likeIconInactive
          }`}
        />
      </button>

      <Link href={`/products/${encodeURIComponent(product.id)}`}>
        <div className={styles.imageContainer}>
          <Image
            src={product.imageLinks?.thumbnail || "/placeholder.png"}
            alt={product.title}
            fill
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          {product.rating && (
            <div className={styles.rating}>
              <span className="text-[var(--warning)]">⭐</span>
              <span className={styles.ratingValue}>{product.rating}</span>
              <span className={styles.ratingCount}>
                ({product.ratingCount || 0})
              </span>
            </div>
          )}

          <h3 className={styles.title}>{product.title}</h3>

          {product.authors && product.authors.length > 0 && (
            <p className={styles.authors}>{product.authors[0]}</p>
          )}

          <div className={styles.actions}>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                alert("Книга добавлена в корзину!");
              }}
              className={styles.addToCartButton}
            >
              В корзину
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (confirm("Удалить эту книгу?")) {
                  dispatch(deleteProduct(product.id));
                }
              }}
              className={styles.deleteButton}
            >
              <Image
                src="/trash.svg"
                alt="Delete"
                width={20}
                height={20}
                className={styles.deleteIcon}
              />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

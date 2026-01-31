"use client";

import { Book } from "@/shared/types/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/store";
import { toggleLike, deleteProduct } from "@/features/products/slice";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  readonly product: Book;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleOpenDetails = () => {
    router.push(`/products?id=${encodeURIComponent(product.id)}`);
  };

  return (
    <div className={styles.card} onClick={handleOpenDetails}>
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

      <div className={styles.imageContainer}>
        <Image
          src={product.imageLinks?.thumbnail || "/placeholder.png"}
          alt={product.title}
          fill
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.rating}>
          {product.rating ? (
            <>
              <Image src="/star.svg" alt="Rating" width={16} height={16} />
              <span className={styles.ratingValue}>{product.rating}</span>
              <span className={styles.ratingCount}>
                ({product.ratingCount || 0})
              </span>
            </>
          ) : (
            <span className={styles.ratingCount}>Нет оценок</span>
          )}
        </div>

        <h3 className={styles.title}>{product.title}</h3>

        {product.authors && product.authors.length > 0 && (
          <p className={styles.authors}>{product.authors[0]}</p>
        )}

        <div className={styles.actions}>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleOpenDetails();
            }}
            className={styles.detailsButton}
          >
            Подробнее
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
    </div>
  );
}

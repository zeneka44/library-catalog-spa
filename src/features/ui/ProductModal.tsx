"use client";

import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { selectProductById } from "@/features/products/selectors";
import { toggleLike, deleteProduct } from "@/features/products/slice";
import Link from "next/link";
import Image from "next/image";
import styles from "./ProductModal.module.css";

type ProductModalProps = {
  id: string;
};

export default function ProductModal({ id }: ProductModalProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => selectProductById(id)(state));

  const handleClose = () => {
    router.push("/products");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this book?")) {
      dispatch(deleteProduct(id));
      router.push("/products");
    }
  };

  const handleToggleLike = () => {
    dispatch(toggleLike(id));
  };

  if (!product) {
    return (
      <div className={styles.modalOverlay} onClick={handleClose}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.closeButton} onClick={handleClose}>
            ✕
          </button>
          <div className={styles.notFound}>
            <h2>Book not found</h2>
            <p>Unfortunately, this book is no longer in the catalog</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={handleClose}>
          ✕
        </button>

        <div className={styles.grid}>
          <div className={styles.imageWrapper}>
            {product.imageLinks?.thumbnail ? (
              <Image
                src={product.imageLinks.thumbnail}
                alt={product.title}
                width={250}
                height={375}
                className={styles.image}
              />
            ) : (
              <div className={styles.imagePlaceholder}>No cover</div>
            )}
          </div>

          <div className={styles.content}>
            <h2 className={styles.title}>{product.title}</h2>

            {product.authors?.length > 0 && (
              <p className={styles.authors}>
                <strong>Authors:</strong> {product.authors.join(", ")}
              </p>
            )}

            <div className={styles.details}>
              <div className={styles.detailsRow}>
                <span className={styles.ratingLabel}>Rating:</span>
                {product.rating ? (
                  <>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH}/star.svg`}
                      alt="Rating"
                      width={16}
                      height={16}
                    />
                    <span className={styles.ratingValue}>{product.rating}</span>
                    <span className={styles.ratingCount}>
                      ({product.ratingCount || 0})
                    </span>
                  </>
                ) : (
                  <span className={styles.ratingCount}>No ratings yet</span>
                )}
              </div>
              {product.publishedDate && (
                <p>
                  <strong>Publication year:</strong> {product.publishedDate}
                </p>
              )}
            </div>

            {product.description && (
              <div className={styles.descriptionSection}>
                <h3 className={styles.descriptionTitle}>Description</h3>
                <p className={styles.descriptionText}>{product.description}</p>
              </div>
            )}

            <div className={styles.actions}>
              <button
                onClick={handleToggleLike}
                className={`${styles.actionButton} ${
                  product.isLiked ? styles.actionButtonActive : ""
                }`}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/love.svg`}
                  alt="Like"
                  width={20}
                  height={20}
                />
                {product.isLiked ? "Saved to Favorites" : "Add to Favorites"}
              </button>
              <button
                onClick={handleDelete}
                className={`${styles.actionButton} ${styles.deleteButton}`}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/trash.svg`}
                  alt="Delete"
                  width={20}
                  height={20}
                />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

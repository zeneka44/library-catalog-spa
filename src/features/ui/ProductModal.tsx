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
    if (confirm("Вы уверены, что хотите удалить эту книгу?")) {
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
            <h2>Книга не найдена</h2>
            <p>К сожалению, эта книга больше не в каталоге</p>
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
              <div className={styles.imagePlaceholder}>Нет обложки</div>
            )}
          </div>

          <div className={styles.content}>
            <h2 className={styles.title}>{product.title}</h2>

            {product.authors?.length > 0 && (
              <p className={styles.authors}>
                <strong>Авторы:</strong> {product.authors.join(", ")}
              </p>
            )}

            <div className={styles.details}>
              <div className={styles.detailsRow}>
                <span className={styles.ratingLabel}>Рейтинг:</span>
                {product.rating ? (
                  <>
                    <Image
                      src="/star.svg"
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
                  <span className={styles.ratingCount}>Нет оценок</span>
                )}
              </div>
              {product.publishedDate && (
                <p>
                  <strong>Год публикации:</strong> {product.publishedDate}
                </p>
              )}
            </div>

            {product.description && (
              <div className={styles.descriptionSection}>
                <h3 className={styles.descriptionTitle}>Описание</h3>
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
                <Image src="/love.svg" alt="Like" width={20} height={20} />
                {product.isLiked ? "В избранном" : "В избранное"}
              </button>
              <button
                onClick={handleDelete}
                className={`${styles.actionButton} ${styles.deleteButton}`}
              >
                <Image src="/trash.svg" alt="Delete" width={20} height={20} />
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

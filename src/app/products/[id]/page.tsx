"use client";

import { useParams, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { selectProductById } from "@/features/products/selectors";
import { toggleLike, deleteProduct } from "@/features/products/slice";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const id = decodeURIComponent(params.id as string);

  const product = useAppSelector((state) => selectProductById(id)(state));

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1 className={styles.notFoundTitle}>Книга не найдена</h1>
        <p className={styles.notFoundText}>
          К сожалению, эта книга больше не в каталоге
        </p>
        <Link href="/products" className={styles.notFoundLink}>
          Вернуться к каталогу
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm("Вы уверены, что хотите удалить эту книгу?")) {
      dispatch(deleteProduct(id));
      router.push("/products");
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/products" className={styles.backLink}>
        Вернуться к каталогу
      </Link>

      <div className={styles.grid}>
        <div className={styles.imageWrapper}>
          {product.imageLinks?.thumbnail ? (
            <Image
              src={product.imageLinks.thumbnail}
              alt={product.title}
              width={300}
              height={450}
              className={styles.image}
            />
          ) : (
            <div className={styles.imagePlaceholder}>Нет обложки</div>
          )}
        </div>

        <div className={styles.content}>
          <h1 className={styles.mainTitle}>{product.title}</h1>

          {product.authors && product.authors.length > 0 && (
            <p className={styles.authors}>
              <span className={styles.authorsLabel}>Авторы:</span>{" "}
              {product.authors.join(", ")}
            </p>
          )}

          <div className={styles.details}>
            {product.publisher && (
              <p>
                <span className={styles.detailLabel}>Издатель:</span>{" "}
                {product.publisher}
              </p>
            )}
            {product.publishedDate && (
              <p>
                <span className={styles.detailLabel}>Год публикации:</span>{" "}
                {product.publishedDate}
              </p>
            )}
          </div>

          {product.description && (
            <div className={styles.descriptionSection}>
              <h2 className={styles.descriptionTitle}>Описание</h2>
              <p className={styles.descriptionText}>{product.description}</p>
            </div>
          )}

          <div className={styles.actions}>
            <button
              onClick={() => dispatch(toggleLike(id))}
              className={`${styles.likeButton} ${
                product.isLiked
                  ? styles.likeButtonActive
                  : styles.likeButtonInactive
              }`}
            >
              {product.isLiked ? "В избранном" : "Добавить в избранное"}
            </button>

            <button onClick={handleDelete} className={styles.deleteButton}>
              Удалить книгу
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

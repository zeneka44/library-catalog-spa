"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/store";
import { addProduct } from "@/features/products/slice";
import Link from "next/link";
import { Book } from "@/shared/types/product";
import styles from "./page.module.css";

export default function CreateProductPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    description: "",
    publisher: "",
    publishedDate: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Название книги обязательно";
    }
    if (formData.title.length < 3) {
      newErrors.title = "Название должно быть минимум 3 символа";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newBook: Book = {
      id: Date.now().toString(),
      title: formData.title,
      authors: formData.authors
        ? formData.authors.split(",").map((a) => a.trim())
        : undefined,
      description: formData.description || undefined,
      publisher: formData.publisher || undefined,
      publishedDate: formData.publishedDate || undefined,
      imageLinks: undefined,
      isLiked: false,
    };

    dispatch(addProduct(newBook));
    router.push("/products");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/products" className={styles.backLink}>
          ← Вернуться к каталогу
        </Link>
        <h1 className={styles.title}>Добавить новую книгу</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.fieldGroup}>
          <label htmlFor="title" className={styles.label}>
            Название книги
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Введите название книги"
            className={`${styles.input} ${
              errors.title ? styles.inputError : ""
            }`}
          />
          {errors.title && (
            <p className={styles.errorMessage}>{errors.title}</p>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="authors" className={styles.label}>
            Автор
          </label>
          <input
            type="text"
            id="authors"
            name="authors"
            value={formData.authors}
            onChange={handleChange}
            placeholder="Автор"
            className={styles.input}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="description" className={styles.label}>
            Описание
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Введите описание книги"
            rows={4}
            className={styles.textarea}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="publisher" className={styles.label}>
            Издатель
          </label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            placeholder="Введите издателя"
            className={styles.input}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="publishedDate" className={styles.label}>
            Дата публикации
          </label>
          <input
            type="date"
            id="publishedDate"
            name="publishedDate"
            value={formData.publishedDate}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>
            Добавить книгу
          </button>
          <Link href="/products" className={styles.cancelButton}>
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
}

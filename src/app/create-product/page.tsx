"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { addProduct } from "@/features/products/slice";
import { selectAllProducts } from "@/features/products/selectors";
import Link from "next/link";
import Image from "next/image";
import { Book } from "@/shared/types/product";
import styles from "./page.module.css";

const STORAGE_KEY = "library-catalog-products";

export default function CreateProductPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector(selectAllProducts);
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    description: "",
    publishedDate: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "title":
        if (!value.trim()) return "Field is required";
        if (value.length < 3) return "Title must be at least 3 characters";
        return "";
      case "authors":
        if (!value.trim()) return "Field is required";
        if (value.length < 2)
          return "Author name must be at least 2 characters";
        return "";
      case "description":
        if (!value.trim()) return "Field is required";
        if (value.length < 10)
          return "Description must be at least 10 characters";
        return "";
      case "publishedDate": {
        if (!value) return "Field is required";
        const selectedDate = new Date(value);
        const today = new Date();
        if (selectedDate > today)
          return "Publication date cannot be in the future";
        return "";
      }
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) newErrors[name] = error;
    });
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
      publishedDate: formData.publishedDate || undefined,
      imageLinks: undefined,
      isLiked: false,
    };

    dispatch(addProduct(newBook));
    const nextProducts = [newBook, ...allProducts];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProducts));
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

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/products" className={styles.backLink}>
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/arrow-left.svg`}
            alt="Back"
            width={20}
            height={20}
            className={styles.backIcon}
          />
          Back to catalog
        </Link>
        <h1 className={styles.title}>Add new book</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.fieldGroup}>
          <label htmlFor="title" className={styles.label}>
            Book title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
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
            Author
          </label>
          <input
            type="text"
            id="authors"
            name="authors"
            value={formData.authors}
            onChange={handleChange}
            placeholder="Enter author name"
            className={`${styles.input} ${
              errors.authors ? styles.inputError : ""
            }`}
          />
          {errors.authors && (
            <p className={styles.errorMessage}>{errors.authors}</p>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter book description"
            rows={4}
            className={`${styles.textarea} ${
              errors.description ? styles.inputError : ""
            }`}
          />
          {errors.description && (
            <p className={styles.errorMessage}>{errors.description}</p>
          )}
        </div>
        <div className={styles.fieldGroup}>
          <label htmlFor="publishedDate" className={styles.label}>
            Publication date
          </label>
          <input
            type="date"
            id="publishedDate"
            name="publishedDate"
            value={formData.publishedDate}
            onChange={handleChange}
            className={`${styles.input} ${
              errors.publishedDate ? styles.inputError : ""
            }`}
          />
          {errors.publishedDate && (
            <p className={styles.errorMessage}>{errors.publishedDate}</p>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>
            Add book
          </button>
          <Link href="/products" className={styles.cancelButton}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/store";
import { addProduct } from "@/features/products/slice";
import Link from "next/link";
import { Book } from "@/shared/types/product";

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

  const handleSubmit = (e: React.FormEvent) => {
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
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href="/products"
          className="text-blue-500 hover:text-blue-600 mb-4 inline-block"
        >
          ← Вернуться к каталогу
        </Link>
        <h1 className="text-3xl font-bold">Добавить новую книгу</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 space-y-4"
      >
        {}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Название книги
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Введите название книги"
            className={`w-full p-3 border rounded-lg ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {}
        <div>
          <label htmlFor="authors" className="block text-sm font-medium mb-1">
            Автор
          </label>
          <input
            type="text"
            id="authors"
            name="authors"
            value={formData.authors}
            onChange={handleChange}
            placeholder="Автор"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Описание
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Введите описание книги"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {}
        <div>
          <label htmlFor="publisher" className="block text-sm font-medium mb-1">
            Издатель
          </label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            placeholder="Введите издателя"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {}
        <div>
          <label
            htmlFor="publishedDate"
            className="block text-sm font-medium mb-1"
          >
            Дата публикации
          </label>
          <input
            type="date"
            id="publishedDate"
            name="publishedDate"
            value={formData.publishedDate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 font-medium"
          >
            Добавить книгу
          </button>
          <Link
            href="/products"
            className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 font-medium text-center"
          >
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
}

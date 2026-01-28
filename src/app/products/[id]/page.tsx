"use client";

import { useParams, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { selectProductById } from "@/features/products/selectors";
import { toggleLike, deleteProduct } from "@/features/products/slice";
import Link from "next/link";
import Image from "next/image";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const id = decodeURIComponent(params.id as string);

  const product = useAppSelector((state) => selectProductById(id)(state));

  if (!product) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Книга не найдена</h1>
        <p className="text-gray-600 mb-6">
          К сожалению, эта книга больше не в каталоге
        </p>
        <Link
          href="/products"
          className="text-blue-500 hover:text-blue-600 font-medium"
        >
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
    <div className="p-6 max-w-4xl mx-auto">
      {}
      <Link
        href="/products"
        className="text-blue-500 hover:text-blue-600 mb-6 inline-block"
      >
        Вернуться к каталогу
      </Link>

      {}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {}
        <div className="flex justify-center md:justify-start">
          {product.imageLinks?.thumbnail ? (
            <Image
              src={product.imageLinks.thumbnail}
              alt={product.title}
              width={300}
              height={450}
              className="rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-72 h-96 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              Нет обложки
            </div>
          )}
        </div>

        {}
        <div className="md:col-span-2">
          {}
          <h1 className="text-4xl font-bold mb-2">{product.title}</h1>

          {}
          {product.authors && product.authors.length > 0 && (
            <p className="text-lg text-gray-600 mb-4">
              <span className="font-semibold">Авторы:</span>{" "}
              {product.authors.join(", ")}
            </p>
          )}

          {}
          <div className="space-y-2 mb-6 text-gray-700">
            {product.publisher && (
              <p>
                <span className="font-semibold">Издатель:</span>{" "}
                {product.publisher}
              </p>
            )}
            {product.publishedDate && (
              <p>
                <span className="font-semibold">Год публикации:</span>{" "}
                {product.publishedDate}
              </p>
            )}
          </div>

          {}
          {product.description && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Описание</h2>
              <p className="text-gray-700 leading-7">{product.description}</p>
            </div>
          )}

          {}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => dispatch(toggleLike(id))}
              className={`px-6 py-3 rounded-lg font-medium text-lg transition ${
                product.isLiked
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {product.isLiked ? "В избранном" : "Добавить в избранное"}
            </button>

            <button
              onClick={handleDelete}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium text-lg transition"
            >
              Удалить книгу
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

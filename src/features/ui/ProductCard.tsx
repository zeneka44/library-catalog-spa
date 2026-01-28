"use client";

import { Book } from "@/shared/types/product";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch } from "@/store/store";
import { toggleLike, deleteProduct } from "@/features/products/slice";

interface ProductCardProps {
  product: Book;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  return (
    <Link href={`/products/${encodeURIComponent(product.id)}`}>
      <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer">
        <Image
          src={product.imageLinks?.thumbnail || "/placeholder.png"}
          alt={product.title}
          width={300}
          height={192}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">
            {product.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3">
            {product.description || "Нет описания"}
          </p>
          <div className="flex justify-between mt-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(toggleLike(product.id));
              }}
              className={`text-2xl ${product.isLiked ? "text-red-500" : "text-gray-400"}`}
            >
              ❤️
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(deleteProduct(product.id));
              }}
              className="text-xl text-gray-400 hover:text-red-500"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

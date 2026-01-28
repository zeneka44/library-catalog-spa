"use client";

import { useAppSelector } from "@/store/store";
import { selectFilteredProducts } from "@/features/products/selectors";
import ProductCard from "./ProductCard";

export default function ProductsList() {
  const products = useAppSelector(selectFilteredProducts);

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-xl mb-2">Список книг пуст</p>
        <p>Добавьте первую книгу через кнопку &quot;Добавить книгу&quot;</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

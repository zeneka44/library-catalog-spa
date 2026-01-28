"use client";

import ProductsList from "@/features/ui/ProductsList";
import ProductsFilters from "@/features/ui/ProductsFilters";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Каталог книг</h1>
        <Link
          href="/create-product"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Добавить книгу
        </Link>
      </div>
      <ProductsFilters />
      <ProductsList />
    </div>
  );
}

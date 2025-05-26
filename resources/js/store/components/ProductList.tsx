import React from "react"
import { Product } from "@/shared/contexts/ProductsContext"
import { ProductCard } from "./ProductCard"

export const ProductList: React.FC<{ products: Product[]; loading: boolean }> = ({
  products,
  loading,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {loading
      ? Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-64 bg-white rounded-lg animate-pulse shadow" />
        ))
      : products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
  </div>
)


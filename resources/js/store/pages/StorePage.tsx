// src/pages/StorePage.tsx
import React, { useEffect, useState } from "react";
import { useProducts, Product } from "@/shared/contexts/ProductsContext";
import { Footer } from "../components/Footer";
import { Testimonials } from "../components/Testimonials";
import { ProductCard } from "../components/ProductCard";
import { HeroBanner } from "../components/HeroBanner";
import { StoreHeader } from "../components/StoreHeader";
import { ProductDetailModal } from "../components/ProductDetailModal";

export const StorePage: React.FC = () => {
  const { products, loading, getProducts } = useProducts();
  const [selected, setSelected] = useState<Product | null>(null);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      <StoreHeader />
      <HeroBanner />

      <main id="products" className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6">Todos os Produtos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-white rounded-lg animate-pulse shadow"
                />
              ))
            : products.map((p) => (
                <div key={p.id} onClick={() => setSelected(p)}>
                  <ProductCard product={p} />
                </div>
              ))}
        </div>
      </main>

      <Testimonials />
      <Footer />

      {selected && (
        <ProductDetailModal
          product={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
};


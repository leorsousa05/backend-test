import { useProducts } from "@/shared/contexts/ProductsContext";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard: React.FC = () => {
  const { products, loading, error, getProducts } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const stats = [
    { label: "Total", value: products.length, border: "border-blue-500" },
    { label: "Ativos", value: products.filter(p => p.active).length, border: "border-green-500" },
    { label: "Inativos", value: products.filter(p => !p.active).length, border: "border-red-500" },
  ];

  return (
    <div className="p-6 bg-gray-50 h-[calc(100vh-61px)] text-gray-800 overflow-auto">
      <header className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Painel de Produtos</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white transition px-5 py-2 rounded-lg"
          onClick={() => navigate("/products/create")}
        >
          + Novo Produto
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {stats.map(({ label, value, border }) => (
          <div
            key={label}
            className={`bg-white p-5 rounded-2xl shadow border-l-4 ${border}`}
          >
            <h4 className="text-lg font-medium mb-2">{label}</h4>
            <p className="text-4xl font-bold">{loading ? "..." : value}</p>
          </div>
        ))}
      </div>

      <section>
        <h3 className="text-2xl font-semibold mb-4">Lista de Produtos</h3>
        {error && <p className="mb-4 text-red-600">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-lg animate-pulse h-40 shadow"
                />
              ))
            : products.map(product => (
                <div
                  key={product.id}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
                >
                  <h4 className="text-xl font-medium mb-2">{product.name}</h4>
                  <p className="text-sm mb-4 line-clamp-2">
                    {product.description || "—"}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-600">R$ {product.price}</span>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        product.active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.active ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                  <button
                    className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white transition py-2 rounded"
                    onClick={() => navigate(`/products/${product.id}/edit`)}
                  >
                    Editar
                  </button>
                </div>
              ))}
        </div>
      </section>
    </div>
  );
};


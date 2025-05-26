import { useProducts } from "@/shared/contexts/ProductsContext";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard: React.FC = () => {
  const { products, loading, error, getProducts } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="p-6 bg-[#16161a] h-[calc(100vh-61px)] text-[#fffffe] overflow-auto">
      <header className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Painel de Produtos</h2>
        <button
          className="bg-[#7f5af0] hover:bg-[#9f7bf0] transition px-5 py-2 rounded-lg"
          onClick={() => navigate("/products/create")}
        >
          + Novo Produto
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#24242a] p-5 rounded-2xl shadow-md">
          <h4 className="text-lg font-medium mb-2">Total de Produtos</h4>
          <p className="text-4xl font-bold">{loading ? "..." : products.length}</p>
        </div>
        <div className="bg-[#24242a] p-5 rounded-2xl shadow-md">
          <h4 className="text-lg font-medium mb-2">Ativos</h4>
          <p className="text-4xl font-bold">
            {loading ? "..." : products.filter(p => p.active).length}
          </p>
        </div>
        <div className="bg-[#24242a] p-5 rounded-2xl shadow-md">
          <h4 className="text-lg font-medium mb-2">Inativos</h4>
          <p className="text-4xl font-bold">
            {loading ? "..." : products.filter(p => !p.active).length}
          </p>
        </div>
      </div>

      <section>
        <h3 className="text-2xl font-semibold mb-4">Lista de Produtos</h3>
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#24242a] p-6 rounded-lg animate-pulse h-40"
              />
            ))}
          </div>
        )}
        {!loading && !error && products.length === 0 && (
          <p className="text-center text-gray-400">Nenhum produto encontrado.</p>
        )}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map(product => (
              <div
                key={product.id}
                className="bg-[#24242a] p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <h4 className="text-xl font-medium mb-2">{product.name}</h4>
                <p className="text-sm mb-4 line-clamp-2">
                  {product.description || "—"}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold">R$ {product.price}</span>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      product.active ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {product.active ? "Ativo" : "Inativo"}
                  </span>
                </div>
                <button
                  className="mt-4 w-full bg-[#7f5af0] hover:bg-[#9f7bf0] transition py-2 rounded"
                  onClick={() => navigate(`/products/${product.id}/edit`)}
                >
                  Editar
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};


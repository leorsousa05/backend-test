import { Product, useProducts } from "@/shared/contexts/ProductsContext";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Products: React.FC = () => {
  const { products, loading, error, getProducts, deleteProduct } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
  };

  return (
    <div className="p-6 bg-gray-50 h-[calc(100vh-61px)] text-gray-800">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestão de Produtos</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          onClick={() => navigate("/products/create")}
        >
          + Novo Produto
        </button>
      </header>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      {loading ? (
        <p>Carregando produtos...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">Ainda não há produtos cadastrados.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {products.map((p: Product) => (
            <div key={p.id} className="bg-white p-5 rounded-lg shadow">
              <h2 className="text-xl mb-2">{p.name}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {p.description || "Descrição não informada."}
              </p>
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-blue-600">R$ {p.price}</span>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    p.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {p.active ? "Ativo" : "Inativo"}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded transition"
                  onClick={() => navigate(`/products/${p.id}`)}
                >
                  Ver
                </button>
                <button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
                  onClick={() => navigate(`/products/${p.id}/edit`)}
                >
                  Editar
                </button>
                <button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
                  onClick={() => handleDelete(p.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
);
};


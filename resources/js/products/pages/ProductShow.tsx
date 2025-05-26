import { Product, useProducts } from "@/shared/contexts/ProductsContext";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ProductShow: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProduct } = useProducts();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const p = await getProduct(Number(id));
      if (!p) return navigate("/products");
      setProduct(p);
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading) return <div className="p-6 bg-gray-50  text-gray-800">Carregando produto...</div>;

  return (
    <div className="p-6 bg-gray-50 h-[calc(100vh-61px)] text-gray-800">
      <button onClick={() => navigate("/products")} className="mb-4 text-blue-600 underline">← Voltar</button>
      <h1 className="text-3xl font-bold mb-6">{product?.name}</h1>
      <dl className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <dt className="font-medium">Slug:</dt>
          <dd className="text-gray-700">{product?.slug || "—"}</dd>
        </div>
        <div>
          <dt className="font-medium">Descrição:</dt>
          <dd className="text-gray-700">{product?.description || "—"}</dd>
        </div>
        <div>
          <dt className="font-medium">Preço:</dt>
          <dd className="text-blue-600 font-bold">R$ {product?.price}</dd>
        </div>
        <div>
          <dt className="font-medium">Estoque:</dt>
          <dd className="text-gray-700">{product?.stock}</dd>
        </div>
        <div>
          <dt className="font-medium">Status:</dt>
          <dd>
            <span
              className={`px-2 py-1 rounded ${
                product?.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {product?.active ? "Ativo" : "Inativo"}
            </span>
          </dd>
        </div>
      </dl>
    </div>
);
};


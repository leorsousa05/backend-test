import React from "react";
import { Product } from "@/shared/contexts/ProductsContext";

interface Props {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<Props> = ({ product, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
    <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 overflow-hidden">
      <header className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-800">&times;</button>
      </header>
      <div className="p-4 space-y-4 text-gray-800">
        <p>{product.description || "Sem descrição disponível."}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">R$ {product.price}</span>
          <span
            className={`px-2 py-1 text-xs rounded ${
              product.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {product.active ? "Em estoque" : "Indisponível"}
          </span>
        </div>
        <div>
          <strong>Estoque:</strong> {product.stock}
        </div>
      </div>
      <footer className="p-4 border-t flex justify-end">
        <button
          onClick={onClose}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded mr-2 transition"
        >
          Fechar
        </button>
        <button
          onClick={() => {/* adicionar ao carrinho */}}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          Comprar
        </button>
      </footer>
    </div>
  </div>
);


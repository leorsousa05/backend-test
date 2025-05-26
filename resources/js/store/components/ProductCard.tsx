import React from "react"
import { Product } from "@/shared/contexts/ProductsContext"
import { useNavigate } from "react-router-dom"

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate()
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <div className="h-40 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-400">
        Sem imagem
      </div>
      <h2 className="text-lg font-medium mb-2 truncate">{product.name}</h2>
      <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">
        {product.description || "Sem descrição disponível."}
      </p>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xl font-bold text-blue-600">R$ {product.price}</span>
        <span
          className={`px-2 py-1 text-xs rounded ${
            product.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {product.active ? "Em estoque" : "Indisponível"}
        </span>
      </div>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
      >
        Ver detalhes
      </button>
    </div>
  )
}


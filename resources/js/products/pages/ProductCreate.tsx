import { useProducts } from "@/shared/contexts/ProductsContext";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductCreate: React.FC = () => {
  const { createProduct } = useProducts();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0.00");
  const [stock, setStock] = useState(0);
  const [active, setActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const result = await createProduct({ name, slug, description, price, stock, active });
    setSubmitting(false);
    if (result) navigate("/products");
  };

  return (
    <div className="p-6 bg-gray-50 h-[calc(100vh-61px)] text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Criar Novo Produto</h1>
      <form onSubmit={handleSubmit} className="max-w-lg space-y-6 bg-white p-6 rounded-lg shadow">
        <div>
          <label htmlFor="name" className="block mb-1">Nome do Produto <span className="text-red-600">*</span></label>
          <input
            id="name"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Ex: Camisa Polo"
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block mb-1">Slug (URL Amigável)</label>
          <input
            id="slug"
            value={slug}
            onChange={e => setSlug(e.target.value)}
            placeholder="ex-camisa-polo"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <small className="text-gray-500">Se vazio, será gerado automaticamente.</small>
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descrição detalhada do produto"
            className="w-full p-3 border border-gray-300 rounded h-24"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block mb-1">Preço (R$) <span className="text-red-600">*</span></label>
            <input
              id="price"
              required
              type="number"
              step="0.01"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="stock" className="block mb-1">Estoque <span className="text-red-600">*</span></label>
            <input
              id="stock"
              required
              type="number"
              value={stock}
              onChange={e => setStock(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
        </div>
        <div className="flex items-center">
          <input
            id="active"
            type="checkbox"
            checked={active}
            onChange={e => setActive(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="active">Ativo</label>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded disabled:opacity-50 transition"
          >
            {submitting ? "Criando..." : "Criar Produto"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
);
};


import React from "react"

export const StoreHeader: React.FC = () => (
  <header className="bg-white shadow mb-8">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-800">Minha Loja</h1>
      <nav className="space-x-6">
        <a href="/" className="text-gray-600 hover:text-gray-800">Início</a>
        <a href="/store" className="text-gray-600 hover:text-gray-800">Produtos</a>
        <a href="/cart" className="text-gray-600 hover:text-gray-800">Carrinho</a>
      </nav>
    </div>
  </header>
)


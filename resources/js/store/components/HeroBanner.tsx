import React from "react";

export const HeroBanner: React.FC = () => (
  <section className="bg-blue-600 text-white py-20">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h1 className="text-5xl font-bold mb-4">Bem-vindo à Nossa Loja</h1>
      <p className="text-xl mb-8">Os melhores produtos, preços imbatíveis e entrega rápida.</p>
      <a
        href="#products"
        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
      >
        Ver Produtos
      </a>
    </div>
  </section>
);


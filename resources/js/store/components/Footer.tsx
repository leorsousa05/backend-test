import React from "react";

export const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-gray-300 py-10">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <h3 className="font-semibold mb-4">Nossa Loja</h3>
        <p>Rua Exemplo, 1234<br />Cidade, Estado<br />CEP 00000-000</p>
      </div>
      <div>
        <h3 className="font-semibold mb-4">Links</h3>
        <ul>
          <li><a href="/" className="hover:text-white">Início</a></li>
          <li><a href="/store" className="hover:text-white">Produtos</a></li>
          <li><a href="/cart" className="hover:text-white">Carrinho</a></li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-4">Suporte</h3>
        <ul>
          <li><a href="/faq" className="hover:text-white">FAQ</a></li>
          <li><a href="/contact" className="hover:text-white">Contato</a></li>
        </ul>
      </div>
    </div>
    <div className="text-center mt-8 text-sm">&copy; {new Date().getFullYear()} Minha Loja. Todos os direitos reservados.</div>
  </footer>
);


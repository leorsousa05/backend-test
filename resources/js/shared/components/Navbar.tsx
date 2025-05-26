import React from "react";

export const Navbar: React.FC = () => (
  <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
    <h1 className="text-xl font-bold text-gray-800">Dashboard de Produtos</h1>
    <nav className="space-x-4">
      <a href="/" className="text-gray-600 hover:text-blue-600 transition">
        Home
      </a>
      <a href="/help" className="text-gray-600 hover:text-green-600 transition">
        Help
      </a>
    </nav>
  </div>
);


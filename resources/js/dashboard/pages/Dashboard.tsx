import { useProducts } from "@/shared/contexts/ProductsContext";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Icon } from "@iconify/react";

export const Dashboard: React.FC = () => {
  const { products, loading, error, getProducts } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const total       = products.length;
  const activeCount = products.filter(p => p.active).length;
  const inactive    = total - activeCount;
  const avgPrice    = total
    ? (products.reduce((sum, p) => sum + parseFloat(p.price), 0) / total).toFixed(2)
    : "0.00";
  const lowStock    = products.filter(p => p.stock < 5).length;
  const noSlug      = products.filter(p => !p.slug).length;
  const totalValue  = products
    .reduce((sum, p) => sum + parseFloat(p.price) * p.stock, 0)
    .toFixed(2);

  const top5Expensive = [...products]
    .sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    .slice(0, 5);

  const widgets = [
    { label: "Total",         value: total,       icon: "mdi:package-variant" },
    { label: "Ativos",        value: activeCount, icon: "mdi:check-circle-outline" },
    { label: "Inativos",      value: inactive,    icon: "mdi:close-circle-outline" },
    { label: "Preço Médio",   value: `R$ ${avgPrice}`, icon: "mdi:trending-up" },
    { label: "Baixo Estoque", value: lowStock,    icon: "mdi:warehouse" },
    { label: "Sem Slug",      value: noSlug,      icon: "mdi:link-off" },
    { label: "Valor Estoque", value: `R$ ${totalValue}`, icon: "mdi:currency-brl" },
  ];

  const pieData = [
    { name: "Ativos",   value: activeCount },
    { name: "Inativos", value: inactive },
  ];
  const COLORS = ["#4ade80", "#f87171"];

  const priceTrendData = products.map(p => ({
    name: p.name.length > 10 ? p.name.slice(0, 10) + "…" : p.name,
    price: parseFloat(p.price),
  }));

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Painel de Produtos</h2>
        <button
          onClick={() => navigate("/products/create")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
        >
          + Novo Produto
        </button>
      </div>

      {/* Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6 mb-10">
        {widgets.map(({ label, value, icon }) => (
          <div
            key={label}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
          >
            <Icon icon={icon} className="text-blue-600" width="32" height="32" />
            <span className="mt-2 text-xs text-gray-500 uppercase">{label}</span>
            <span className="mt-1 text-2xl font-semibold">
              {loading ? "..." : value}
            </span>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Distribuição de Status</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Tendência de Preços</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={priceTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Lista de Produtos */}
      <section>
        <h3 className="text-2xl font-semibold mb-4">Lista de Produtos</h3>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 rounded-lg animate-pulse h-40 shadow"
                />
              ))
            : products.map(product => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow p-6 flex flex-col"
                >
                  <h4 className="text-lg font-medium mb-2 truncate">
                    {product.name}
                  </h4>
                  <p className="text-sm mb-4 flex-grow line-clamp-2">
                    {product.description || "—"}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-blue-600">
                      R$ {product.price}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        product.active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.active ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/products/${product.id}/edit`)}
                    className="mt-auto bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
                  >
                    Editar
                  </button>
                </div>
              ))}
        </div>
      </section>
    </div>
  );
};


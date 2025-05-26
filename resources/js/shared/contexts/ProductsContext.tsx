import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

export interface Product {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  price: string;
  stock: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

interface ProductContextData {
  products: Product[];
  loading: boolean;
  error: string | null;
  getProducts: () => Promise<void>;
  getProduct: (id: number) => Promise<Product | null>;
  createProduct: (data: Omit<Partial<Product>, "id" | "created_at" | "updated_at">) => Promise<Product | null>;
  updateProduct: (id: number, data: Partial<Product>) => Promise<Product | null>;
  deleteProduct: (id: number) => Promise<void>;
}

const ProductContext = createContext<ProductContextData>({} as any);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

  const headers = {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };

  const getProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/products`, { headers });
      if (!res.ok) throw new Error("Falha ao carregar produtos");
      const json = await res.json();
      setProducts(json.data);
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getProduct = async (id: number): Promise<Product | null> => {
    setError(null);
    try {
      const res = await fetch(`${API}/products/${id}`, { headers });
      if (!res.ok) {
        toast.error(`Erro ao buscar produto #${id}`);
        return null;
      }
      const json = await res.json();
      return json as Product;
    } catch {
      toast.error("Erro de conexão. Tente novamente.");
      return null;
    }
  };

  const createProduct = async (
    data: Omit<Partial<Product>, "id" | "created_at" | "updated_at">
  ): Promise<Product | null> => {
    setError(null);
    try {
      const res = await fetch(`${API}/products`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        const msg = json.errors
          ? Object.values(json.errors).flat()[0]
          : json.message || "Erro ao criar produto";
        toast.error(msg);
        return null;
      }
      setProducts(prev => [json as Product, ...prev]);
      toast.success("Produto criado com sucesso");
      return json as Product;
    } catch {
      toast.error("Erro de conexão. Tente novamente.");
      return null;
    }
  };

  const updateProduct = async (
    id: number,
    data: Partial<Product>
  ): Promise<Product | null> => {
    setError(null);
    try {
      const res = await fetch(`${API}/products/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        const msg = json.errors
          ? Object.values(json.errors).flat()[0]
          : json.message || "Erro ao atualizar produto";
        toast.error(msg);
        return null;
      }
      setProducts(prev => prev.map(p => (p.id === id ? (json as Product) : p)));
      toast.success("Produto atualizado com sucesso");
      return json as Product;
    } catch {
      toast.error("Erro de conexão. Tente novamente.");
      return null;
    }
  };

  const deleteProduct = async (id: number) => {
    setError(null);
    try {
      const res = await fetch(`${API}/products/${id}`, {
        method: "DELETE",
        headers,
      });
      if (!res.ok) {
        const json = await res.json();
        toast.error(json.message || "Erro ao excluir produto");
        return;
      }
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success("Produto excluído com sucesso");
    } catch {
      toast.error("Erro de conexão. Tente novamente.");
    }
  };

  useEffect(() => {
    token ? getProducts() : setProducts([]);
  }, [token]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        getProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);



import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";

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
  getProduct: (id: number) => Promise<Product>;
  createProduct: (data: Omit<Partial<Product>, "id" | "created_at" | "updated_at">) => Promise<Product>;
  updateProduct: (id: number, data: Partial<Product>) => Promise<Product>;
  deleteProduct: (id: number) => Promise<void>;
}

const ProductContext = createContext<ProductContextData>({
  products: [],
  loading: false,
  error: null,
  getProducts: async () => {},
  getProduct: async () => {
    throw new Error("getProduct não implementado");
  },
  createProduct: async () => {
    throw new Error("createProduct não implementado");
  },
  updateProduct: async () => {
    throw new Error("updateProduct não implementado");
  },
  deleteProduct: async () => {},
});

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  });

  const getProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/v1/products", {
        headers: apiHeaders(),
      });
      if (!res.ok) throw new Error("Falha ao carregar produtos");
      const data: Product[] = await res.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getProduct = async (id: number) => {
    setError(null);
    const res = await fetch(`/api/v1/products/${id}`, {
      headers: apiHeaders(),
    });
    if (!res.ok) throw new Error("Produto não encontrado");
    const data: Product = await res.json();
    return data;
  };

  const createProduct = async (data: Omit<Partial<Product>, "id" | "created_at" | "updated_at">) => {
    setError(null);
    const res = await fetch("/api/v1/products", {
      method: "POST",
      headers: apiHeaders(),
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Erro ao criar produto");
    setProducts((prev) => [json as Product, ...prev]);
    return json as Product;
  };

  const updateProduct = async (id: number, data: Partial<Product>) => {
    setError(null);
    const res = await fetch(`/api/v1/products/${id}`, {
      method: "PUT",
      headers: apiHeaders(),
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Erro ao atualizar produto");
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? (json as Product) : p))
    );
    return json as Product;
  };

  const deleteProduct = async (id: number) => {
    setError(null);
    const res = await fetch(`/api/v1/products/${id}`, {
      method: "DELETE",
      headers: apiHeaders(),
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.message || "Erro ao excluir produto");
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };


  useEffect(() => {
    if (token) {
      getProducts();
    } else {
      setProducts([]);
    }
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


import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./auth/pages/Login";
import { Sidebar } from "./shared/components/Sidebar";
import { Navbar } from "./shared/components/Navbar";
import { Users } from "./admin/pages/Users";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { JSX } from "react";
import { ProductProvider } from "./shared/contexts/ProductsContext";
import { Products } from "./products/pages/Products";
import { ProductEdit } from "./products/pages/ProductEdit";
import { ProductShow } from "./products/pages/ProductShow";
import { ProductCreate } from "./products/pages/ProductCreate";
import { Dashboard } from "./dashboard/pages/Dashboard";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Você precisa estar autenticado para acessar essa página.");
    return <Navigate to="/" />;
  }
  return children;
};

export const App = () => {
  const Layout = (page: JSX.Element) => (
    <ProductProvider>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          {page}
        </div>
      </div>
    </ProductProvider>
  );

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route index element={<Login />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute>{Layout(<Dashboard />)}</ProtectedRoute>}
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <div className="flex">
                <Sidebar />
                <div className="flex-1">
                  <Navbar />
                  <Users />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>{Layout(<Products />)}</ProtectedRoute>
          }
        />
        <Route
          path="/products/create"
          element={
            <ProtectedRoute>
              {Layout(<ProductCreate />)}
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              {Layout(<ProductShow />)}
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id/edit"
          element={
            <ProtectedRoute>
              {Layout(<ProductEdit />)}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};
;

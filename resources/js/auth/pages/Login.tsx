import { useState, FormEvent } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/shared/contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Login realizado com sucesso!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err: any) {
      let message = "Erro ao efetuar login.";
      if (err.response) {
        const status = err.response.status;
        if (status === 500) message = "Erro do servidor";
        else if (status === 401) message = "Credenciais inválidas";
        else if (err.response.errors?.email) message = err.response.errors.email;
      } else if (err.message) {
        message = err.message;
      }
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Bem-vindo de volta!
          </h2>
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Seu e-mail
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                <span className="px-3 text-blue-600">
                  <Icon icon="mdi:email-outline" width="24" height="24" />
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full py-2 px-3 text-gray-800 focus:outline-none rounded-r-lg"
                  placeholder="seuemail@exemplo.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Sua senha
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                <span className="px-3 text-blue-600">
                  <Icon icon="mdi:lock-outline" width="24" height="24" />
                </span>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full py-2 px-3 text-gray-800 focus:outline-none rounded-r-lg"
                  placeholder="********"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Carregando..." : "Entrar agora"}
            </button>
          </form>
          <p
            onClick={() => navigate("/forgot-password")}
            className="text-center text-sm text-gray-500 mt-4 hover:text-blue-600 cursor-pointer transition"
          >
            Esqueceu sua senha?
          </p>
        </div>
      </div>
    </>
  );
}


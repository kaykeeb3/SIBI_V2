import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../services/auth/auth-service";
import logo from "/assets/logo-dark.svg";

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Login realizado com sucesso!");
      navigate("/");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        // Adicionando um tratamento para a mensagem de erro
        if (error.message.includes("Request failed with status code 400")) {
          toast.error("Credenciais inválidas. Verifique seu e-mail e senha.");
        } else {
          toast.error(error.message || "Erro ao realizar login.");
        }
      } else {
        toast.error("Erro desconhecido.");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    loginMutation.mutate({ email, password });
  };

  return (
    <div className="container-fluid h-75 d-flex justify-content-center align-items-center">
      <div className="text-center w-100" style={{ maxWidth: "400px" }}>
        <img src={logo} alt="Logo" className="img-fluid mb-4" />
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label">
              Email<span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label">
              Senha<span className="text-danger">*</span>
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100 mb-3"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Entrando..." : "Login"}
          </button>
          <div className="text-start">
            <a href="#" className="text-decoration-underline">
              Esqueceu a senha?
            </a>
          </div>
        </form>
        <footer className="mt-5 text-muted">
          <small>
            copyright &copy;{" "}
            <a href="/" className="text-decoration-underline">
              biblioteca.virtual
            </a>{" "}
            2024.
          </small>
        </footer>
      </div>
    </div>
  );
}

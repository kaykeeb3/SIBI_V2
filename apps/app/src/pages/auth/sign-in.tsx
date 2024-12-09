import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../services/auth/auth-service";
import logo from "../../assets/logo-dark.svg";
import { Button, Input } from "rsuite";
import { z } from "zod";

// Definindo o schema de validação com Zod
const loginSchema = z.object({
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres").nonempty("Senha é obrigatória"),
});

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Login realizado com sucesso!");
      connectSocket();
      navigate("/");
      setIsLoading(false);
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        if (error.message.includes("Request failed with status code 400")) {
          toast.error("Credenciais inválidas. Verifique seu e-mail e senha.");
        } else {
          toast.error(error.message || "Erro ao realizar login.");
        }
      } else {
        toast.error("Erro desconhecido.");
      }
      setIsLoading(false);
    },
  });

  const connectSocket = () => {
    console.log("Conectando ao socket...");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação dos campos
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      // Exibindo os erros
      const errorMessages: { email?: string; password?: string } = {};
      result.error.errors.forEach((error) => {
        if (error.path[0] === "email") {
          errorMessages.email = error.message;
        } else if (error.path[0] === "password") {
          errorMessages.password = error.message;
        }
      });
      setErrors(errorMessages);
      return;
    }

    setIsLoading(true);
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="container-fluid h-75 d-flex justify-content-center align-items-center">
      <div className="text-center w-100" style={{ maxWidth: "400px" }}>
        <img src={logo} alt="Logo" className="img-fluid mb-5 mt-5" />
        <form onSubmit={handleSubmit} className="p-2">
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <Input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(value) => setEmail(value)}
              style={{
                borderColor: "#a4b1be33",
              }}
              onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = "#8234e9"}
              onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = "#a4b1be33"}
              onMouseEnter={(e) => (e.target as HTMLInputElement).style.borderColor = "#8234e9"}
              onMouseLeave={(e) => (e.target as HTMLInputElement).style.borderColor = "#a4b1be33"}
            />
            {errors.email && <span className="text-danger small mt-1">{errors.email}</span>}
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label">
              Senha
            </label>
            <Input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(value) => setPassword(value)}
              style={{
                borderColor: "#a4b1be33",
              }}
              onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = "#8234e9"}
              onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = "#a4b1be33"}
              onMouseEnter={(e) => (e.target as HTMLInputElement).style.borderColor = "#8234e9"}
              onMouseLeave={(e) => (e.target as HTMLInputElement).style.borderColor = "#a4b1be33"}
            />
            {errors.password && <span className="text-danger small mt-1">{errors.password}</span>}
          </div>
          <Button
            type="submit"
            className="w-100 mb-3"
            appearance="primary"
            loading={isLoading}
            disabled={isLoading}
            style={{
              backgroundColor: "#8234e9",
            }}
          >
            {isLoading ? "Entrando..." : "Login"}
          </Button>
          {/*<div className="text-start">
            <small className="fs-6">
              <Link to="/reset-password" className="custom-link">
                Esqueceu a senha?
              </Link>
            </small>
          </div>*/}
        </form>
        <footer className="mt-5 text-muted">
          <small>
            copyright &copy;{" "}
            <Link to="/" className="text-decoration-underline">
              biblioteca.digital
            </Link>{" "}
            2024.
          </small>
        </footer>
      </div>
    </div>
  );
}

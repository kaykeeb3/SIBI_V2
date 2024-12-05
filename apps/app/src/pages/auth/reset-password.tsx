import { useState } from "react";
import { Button, Input } from "rsuite";
import logo from "../../../public/assets/logo-dark.svg";
import { Link } from "react-router-dom";

export function ResetPassword() {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert("Por favor, preencha o campo de email.");
      return;
    }

    alert(`Um email para redefinição foi enviado para: ${email}`);
  };

  return (
    <div className="container-fluid  h-50 mt-5 d-flex justify-content-center align-items-center">
      <div className="text-center w-100" style={{ maxWidth: "400px" }}>
        <img src={logo} alt="Logo" className="img-fluid mb-5 mt-5" />
        <form onSubmit={handleSubmit} className="p-3">
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
              required
              style={{
                borderColor: "#a4b1be33",
              }}
              onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = "#9d4edd"}
              onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = "#a4b1be33"}
              onMouseEnter={(e) => (e.target as HTMLInputElement).style.borderColor = "#9d4edd"}
              onMouseLeave={(e) => (e.target as HTMLInputElement).style.borderColor = "#a4b1be33"}
            />
          </div>
          <Button
            type="submit"
            className="w-100"
            appearance="primary"
            style={{
              backgroundColor: "#9d4edd",
            }}
            disabled
          >
            Enviar email para redefinir senha
          </Button>
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

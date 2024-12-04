import logo from "/assets/logo-dark.svg";

export function SignIn() {
  return (
    <div className="container-fluid h-75 d-flex justify-content-center align-items-center">
      <div className="text-center w-100" style={{ maxWidth: "400px" }}>
        <img src={logo} alt="Logo" className="img-fluid mb-4" />
        <form>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label">
              Email<span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
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
              required
            />
          </div>
          <button type="submit" className="btn w-100 mb-3">
            Login
          </button>
          <div className="text-start">
            <a href="#" className="text-decoration-underline">
              Esqueceu a senha?
            </a>
          </div>
        </form>
        <footer className="mt-4 text-muted">
          <small>Copyright © <small className="text-decoration-underline">biblioteca.virual</small> 2024.</small>
        </footer>
      </div>
    </div>
  );
}

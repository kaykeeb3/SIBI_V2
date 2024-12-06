import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="display-4">404 - Página não encontrada</h1>
      <p className="lead">
        Volte para o{' '}
        <Link className="text-primary" to="/">
          Dashboard
        </Link>
        .
      </p>
    </div>
  );
}

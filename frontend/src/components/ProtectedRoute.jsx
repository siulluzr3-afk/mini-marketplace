// Componente para proteger rutas

import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, requireSeller = false, requireBuyer = false }) {
  const { isAuthenticated, isSeller, isBuyer, loading } = useAuth();

  // Mostrar loading mientras se verifica autenticación
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si requiere ser seller pero no lo es
  if (requireSeller && !isSeller()) {
    return <Navigate to="/" replace />;
  }

  // Si requiere ser buyer pero no lo es
  if (requireBuyer && !isBuyer()) {
    return <Navigate to="/" replace />;
  }

  return children;
}

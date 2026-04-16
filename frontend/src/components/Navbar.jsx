// Barra de navegación

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export default function Navbar() {
  const { user, logout, isAuthenticated, isSeller } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold hover:text-blue-200">
            🛒 Mini Marketplace
          </Link>

          {/* Links de navegación */}
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-blue-200">
              Productos
            </Link>

            {isAuthenticated ? (
              <>
                {isSeller() ? (
                  <Link to="/seller/products" className="hover:text-blue-200">
                    Mis Productos
                  </Link>
                ) : (
                  <>
                    <Link to="/cart" className="hover:text-blue-200 relative">
                      Carrito
                      {itemCount > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {itemCount}
                        </span>
                      )}
                    </Link>
                    <Link to="/orders" className="hover:text-blue-200">
                      Mis Órdenes
                    </Link>
                  </>
                )}

                <div className="flex items-center gap-3">
                  <span className="text-sm">
                    {user?.name} ({isSeller() ? 'Vendedor' : 'Comprador'})
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                  >
                    Salir
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

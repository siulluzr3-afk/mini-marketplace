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
    <nav className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="bg-slate-800 py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold hover:opacity-80 transition-opacity">
              <span className="text-2xl">🛒</span>
              <span>MiniMarket</span>
            </Link>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <span>Hola, {user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm hover:text-amazon-400 transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <div className="flex gap-3">
                  <Link
                    to="/login"
                    className="text-sm hover:text-amazon-400 transition-colors"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/register"
                    className="text-sm hover:text-amazon-400 transition-colors"
                  >
                    Crear cuenta
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-amazon-400 transition-colors text-sm font-medium">
              Todos los productos
            </Link>

            {isAuthenticated && (
              <>
                {isSeller() ? (
                  <Link to="/seller/products" className="hover:text-amazon-400 transition-colors text-sm font-medium">
                    Mis Productos
                  </Link>
                ) : (
                  <>
                    <Link to="/cart" className="flex items-center gap-2 hover:text-amazon-400 transition-colors text-sm font-medium relative">
                      <span>Carrito</span>
                      {itemCount > 0 && (
                        <span className="bg-amazon-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                          {itemCount}
                        </span>
                      )}
                    </Link>
                    <Link to="/orders" className="hover:text-amazon-400 transition-colors text-sm font-medium">
                      Devoluciones y Pedidos
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

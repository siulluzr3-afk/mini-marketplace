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
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-3 text-2xl font-bold hover:scale-105 transition-transform">
            <span className="text-4xl">🛍️</span>
            <span className="bg-white text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
              Mini Market
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 hover:text-yellow-300 transition-colors font-medium">
              <span className="text-xl">🏪</span>
              <span>Productos</span>
            </Link>

            {isAuthenticated ? (
              <>
                {isSeller() ? (
                  <Link to="/seller/products" className="flex items-center gap-2 bg-yellow-400 text-indigo-900 px-4 py-2 rounded-full hover:bg-yellow-300 transition-all font-bold shadow-lg hover:shadow-xl">
                    <span className="text-xl">📦</span>
                    <span>Mis Productos</span>
                  </Link>
                ) : (
                  <>
                    <Link to="/cart" className="flex items-center gap-2 hover:text-yellow-300 transition-colors font-medium relative">
                      <span className="text-2xl">🛒</span>
                      <span>Carrito</span>
                      {itemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse shadow-lg">
                          {itemCount}
                        </span>
                      )}
                    </Link>
                    <Link to="/orders" className="flex items-center gap-2 hover:text-yellow-300 transition-colors font-medium">
                      <span className="text-xl">📋</span>
                      <span>Mis Órdenes</span>
                    </Link>
                  </>
                )}

                <div className="flex items-center gap-3 ml-4 pl-4 border-l-2 border-white/30">
                  <div className="text-right">
                    <p className="text-sm font-semibold">{user?.name}</p>
                    <p className="text-xs text-yellow-200">
                      {isSeller() ? '⭐ Vendedor' : '👤 Comprador'}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    🚪 Salir
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="bg-white text-indigo-600 hover:bg-yellow-300 hover:text-indigo-900 px-6 py-2 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  🔑 Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-6 py-2 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  ✨ Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

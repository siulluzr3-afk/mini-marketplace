import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { isAuthenticated, isSeller } = useAuth();

  useEffect(() => {
    productsAPI.getAll()
      .then(res => setProducts(res.data.products))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-gray-600">Cargando productos...</div></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-medium text-slate-900">Todos los productos</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No hay productos disponibles</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map(p => (
              <div key={p.id} className="bg-white border border-gray-200 rounded hover:shadow-lg transition-shadow p-4">
                <Link to={'/products/'+p.id}>
                  <div className="h-48 bg-gray-100 mb-3 flex items-center justify-center overflow-hidden rounded">
                    {p.imageUrl ? (
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" font-size="40" text-anchor="middle" dy=".3em"%3E📦%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    ) : (
                      <span className="text-6xl">📦</span>
                    )}
                  </div>
                  <h3 className="font-medium text-sm text-slate-900 mb-1 line-clamp-2 h-10">{p.name}</h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2 h-8">{p.description}</p>
                  <div className="mb-2">
                    <span className="text-2xl font-bold text-slate-900">${p.price}</span>
                  </div>
                  {p.stock <= 0 && (
                    <p className="text-xs text-red-600 mb-2">Agotado</p>
                  )}
                  {p.stock > 0 && p.stock <= 5 && (
                    <p className="text-xs text-orange-600 mb-2">Solo quedan {p.stock} unidades</p>
                  )}
                </Link>
                {isAuthenticated && !isSeller() && p.stock > 0 && (
                  <button
                    onClick={() => addToCart(p.id,1).then(r=>r.success&&alert('Producto agregado al carrito'))}
                    className="w-full bg-amazon-400 hover:bg-amazon-500 text-white py-2 px-4 rounded text-sm font-medium transition-colors mt-2"
                  >
                    Agregar al carrito
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

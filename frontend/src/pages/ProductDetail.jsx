import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isAuthenticated, isSeller } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    productsAPI.getById(id).then(res => setProduct(res.data.product));
  }, [id]);

  if (!product) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-gray-600">Cargando producto...</div></div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <button onClick={() => navigate(-1)} className="text-amazon-600 hover:text-amazon-700 hover:underline text-sm mb-4">
          ← Volver a resultados
        </button>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Columna de imagen */}
          <div className="md:col-span-2">
            <div className="bg-white border border-gray-200 rounded p-8 sticky top-4">
              <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden rounded">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="text-8xl">📦</div>';
                    }}
                  />
                ) : (
                  <span className="text-8xl">📦</span>
                )}
              </div>
            </div>
          </div>

          {/* Columna de información */}
          <div className="md:col-span-3">
            <div className="mb-4">
              <h1 className="text-2xl font-normal text-slate-900 mb-2">{product.name}</h1>
              <p className="text-sm text-gray-600">Vendido por: {product.seller.name}</p>
            </div>

            <div className="border-t border-gray-300 pt-4 mb-4">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-normal text-slate-900">${product.price}</span>
              </div>

              {product.stock > 0 ? (
                <p className="text-lg text-green-700">En stock</p>
              ) : (
                <p className="text-lg text-red-700">Agotado</p>
              )}

              {product.stock > 0 && product.stock <= 10 && (
                <p className="text-sm text-orange-700">Solo quedan {product.stock} en stock</p>
              )}
            </div>

            <div className="border-t border-gray-300 pt-4 mb-4">
              <h2 className="text-lg font-bold mb-2">Acerca de este artículo</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {isAuthenticated && !isSeller() && product.stock > 0 && (
              <div className="border border-gray-300 rounded p-4 bg-white">
                <div className="mb-4">
                  <label className="text-sm font-bold text-gray-700 block mb-2">Cantidad:</label>
                  <select
                    value={quantity}
                    onChange={e=>setQuantity(+e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50"
                  >
                    {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                      <option key={i+1} value={i+1}>{i+1}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={()=>addToCart(product.id,quantity).then(r=>r.success?(alert('Producto agregado al carrito'),navigate('/cart')):alert(r.error))}
                  className="w-full bg-amazon-400 hover:bg-amazon-500 text-white py-2 px-4 rounded font-medium transition-colors mb-2"
                >
                  Agregar al carrito
                </button>

                <button
                  onClick={()=>addToCart(product.id,quantity).then(r=>r.success&&navigate('/checkout'))}
                  className="w-full bg-amazon-500 hover:bg-amazon-600 text-white py-2 px-4 rounded font-medium transition-colors"
                >
                  Comprar ahora
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

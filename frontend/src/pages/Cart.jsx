import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function Cart() {
  const { cartItems, total, updateQuantity, removeItem, clearCart, refreshCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {refreshCart()}, []);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-8xl mb-4">🛒</div>
          <h1 className="text-3xl font-normal mb-4">Tu carrito está vacío</h1>
          <button onClick={() => navigate('/')} className="bg-amazon-400 hover:bg-amazon-500 text-white py-2 px-6 rounded font-medium transition-colors">
            Ver productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-medium">Carrito de compras</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="bg-white border border-gray-200 rounded p-4 flex gap-4">
                <div className="w-32 h-32 bg-gray-50 flex items-center justify-center flex-shrink-0 rounded overflow-hidden">
                  {item.product.imageUrl ? (
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div class="text-5xl">📦</div>';
                      }}
                    />
                  ) : (
                    <div className="text-5xl">📦</div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-slate-900 mb-1">{item.product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.product.description.slice(0,80)}...</p>
                  <p className="text-xl font-bold text-slate-900">${item.product.price}</p>
                  <p className="text-xs text-green-700 mt-1">En stock</p>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <select
                    value={item.quantity}
                    onChange={e=>updateQuantity(item.id,+e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 text-sm bg-gray-50"
                  >
                    {[...Array(Math.min(item.product.stock, 10))].map((_, i) => (
                      <option key={i+1} value={i+1}>Cantidad: {i+1}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeItem(item.id).then(refreshCart)}
                    className="text-amazon-600 hover:text-amazon-700 text-sm hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="bg-white border border-gray-200 rounded p-4 h-fit sticky top-4">
          <div className="mb-4">
            <p className="text-lg mb-2">
              Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} artículos): <span className="font-bold text-slate-900">${total.toFixed(2)}</span>
            </p>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-amazon-400 hover:bg-amazon-500 text-white py-2 rounded font-medium transition-colors mb-2"
          >
            Proceder al pago
          </button>
          <button
            onClick={() => clearCart().then(() => navigate('/'))}
            className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 rounded font-medium transition-colors text-sm"
          >
            Vaciar carrito
          </button>
        </div>
      </div>
    </div>
  );
}

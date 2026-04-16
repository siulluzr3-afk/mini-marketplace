import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { ordersAPI } from '../services/api';

export default function Checkout() {
  const { cartItems, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">No hay items en el carrito</h1>
        <button onClick={() => navigate('/')} className="bg-blue-600 text-white py-2 px-6 rounded">Ver productos</button>
      </div>
    );
  }

  async function handleCheckout() {
    setLoading(true);
    try {
      const response = await ordersAPI.create();
      clearCart();
      alert('Compra realizada exitosamente!');
      navigate('/orders');
    } catch (error) {
      alert(error.response?.data?.error || 'Error al procesar la compra');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Resumen de tu orden</h2>
        <div className="space-y-3">
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-semibold">{item.product.name}</p>
                <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
              </div>
              <p className="font-bold">Precio: {(item.product.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t flex justify-between text-xl font-bold">
          <span>TOTAL:</span>
          <span className="text-blue-600">Precio: {total.toFixed(2)}</span>
        </div>
      </div>
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-6">
        <p className="font-semibold">Nota: Esta es una compra simulada</p>
        <p className="text-sm">Al confirmar, se creará una orden y se actualizará el stock de los productos.</p>
      </div>
      <div className="flex gap-4">
        <button onClick={() => navigate('/cart')} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded hover:bg-gray-300">Volver al Carrito</button>
        <button onClick={handleCheckout} disabled={loading} className="flex-1 bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:bg-green-300">{loading ? 'Procesando...' : 'Confirmar Compra'}</button>
      </div>
    </div>
  );
}

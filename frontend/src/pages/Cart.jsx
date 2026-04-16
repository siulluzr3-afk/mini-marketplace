import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function Cart() {
  const { cartItems, total, updateQuantity, removeItem, clearCart, refreshCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {refreshCart()}, []);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
        <button onClick={() => navigate('/')} className="bg-blue-600 text-white py-2 px-6 rounded">Ver productos</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mi Carrito</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="bg-white rounded shadow p-4 flex gap-4">
              <div className="w-24 h-24 bg-gray-200 flex items-center justify-center">
                {item.product.imageUrl ? <img src={item.product.imageUrl} alt={item.product.name} className="h-full"/> : '📦'}
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{item.product.name}</h3>
                <p className="text-sm text-gray-600">{item.product.description.slice(0,60)}...</p>
                <p className="text-lg font-bold text-blue-600 mt-2">Precio: {item.product.price}</p>
              </div>
              <div className="flex flex-col gap-2">
                <input type="number" min="1" max={item.product.stock} value={item.quantity} onChange={e=>updateQuantity(item.id,+e.target.value)} className="w-16 px-2 py-1 border rounded"/>
                <button onClick={() => removeItem(item.id).then(refreshCart)} className="bg-red-500 text-white text-xs py-1 px-2 rounded">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded shadow p-6 h-fit">
          <h2 className="text-2xl font-bold mb-4">Resumen</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between"><span>Productos:</span><span>{cartItems.length}</span></div>
            <div className="flex justify-between text-xl font-bold"><span>Total:</span><span className="text-blue-600">Precio: {total.toFixed(2)}</span></div>
          </div>
          <button onClick={() => navigate('/checkout')} className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 mb-2">Proceder al Checkout</button>
          <button onClick={() => clearCart().then(() => navigate('/'))} className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300">Vaciar Carrito</button>
        </div>
      </div>
    </div>
  );
}

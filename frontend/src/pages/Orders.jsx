import { useState, useEffect } from 'react';
import { ordersAPI } from '../services/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ordersAPI.getMyOrders()
      .then(r => setOrders(r.data.orders))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center p-8">Cargando...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mis Órdenes</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No tienes órdenes aún</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-lg font-bold">Orden #{order.id}</p>
                  <p className="text-sm text-gray-600">Fecha: {new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">Total: {order.total.toFixed(2)}</p>
                  <span className={`inline-block px-3 py-1 rounded text-sm ${order.status==='COMPLETED'?'bg-green-100 text-green-800':order.status==='PENDING'?'bg-yellow-100 text-yellow-800':'bg-gray-100 text-gray-800'}`}>{order.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

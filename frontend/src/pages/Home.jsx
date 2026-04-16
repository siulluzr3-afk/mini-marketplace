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

  if (loading) return <div className="text-center p-8">Cargando...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p.id} className="bg-white rounded shadow p-4">
            <div className="h-40 bg-gray-200 mb-4 flex items-center justify-center">
              {p.imageUrl ? <img src={p.imageUrl} alt={p.name} className="h-full"/> : '📦'}
            </div>
            <h3 className="font-bold">{p.name}</h3>
            <p className="text-sm text-gray-600 my-2">{p.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-blue-600">Precio: {p.price}</span>
              <span className="text-sm">Stock: {p.stock}</span>
            </div>
            <div className="mt-4 flex gap-2">
              <Link to={'/products/'+p.id} className="flex-1 bg-gray-200 py-2 px-4 rounded text-center">Ver</Link>
              {isAuthenticated && !isSeller() && p.stock > 0 && (
                <button onClick={() => addToCart(p.id,1).then(r=>r.success&&alert('Agregado'))} className="flex-1 bg-blue-600 text-white py-2 px-4 rounded">Agregar</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

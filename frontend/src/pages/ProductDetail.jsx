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

  if (!product) return <div className="text-center p-8">Cargando...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">← Volver</button>
      <div className="bg-white rounded shadow-lg p-8 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="h-96 bg-gray-200 flex items-center justify-center">
            {product.imageUrl ? <img src={product.imageUrl} alt={product.name} className="max-h-full"/> : <span className="text-6xl">📦</span>}
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <p className="text-3xl font-bold text-blue-600 mb-4">Precio: {product.price}</p>
            <p className="text-lg mb-4">Stock disponible: {product.stock}</p>
            <p className="text-sm text-gray-500 mb-6">Vendedor: {product.seller.name}</p>
            {isAuthenticated && !isSeller() && product.stock > 0 && (
              <div className="flex gap-4">
                <input type="number" min="1" max={product.stock} value={quantity} onChange={e=>setQuantity(+e.target.value)} className="w-20 px-3 py-2 border rounded"/>
                <button onClick={()=>addToCart(product.id,quantity).then(r=>r.success?(alert('Agregado'),navigate('/cart')):alert(r.error))} className="flex-1 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700">Agregar al Carrito</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

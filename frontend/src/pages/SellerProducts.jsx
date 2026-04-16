import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';

export default function SellerProducts() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({name:'',description:'',price:'',stock:'',imageUrl:''});

  useEffect(() => {loadProducts()}, []);

  function loadProducts() {
    productsAPI.getMyProducts().then(r => setProducts(r.data.products));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const productData = {
      ...form,
      price: parseFloat(form.price) || 0,
      stock: parseInt(form.stock) || 0
    };
    const action = editingId ? productsAPI.update(editingId, productData) : productsAPI.create(productData);
    action.then(() => {
      loadProducts();
      resetForm();
      alert(editingId ? 'Producto actualizado' : 'Producto creado');
    }).catch(err => alert(err.response?.data?.error));
  }

  function handleEdit(p) {
    setForm({name:p.name,description:p.description,price:p.price,stock:p.stock,imageUrl:p.imageUrl||''});
    setEditingId(p.id);
    setShowForm(true);
  }

  function handleDelete(id) {
    if (!confirm('¿Eliminar este producto?')) return;
    productsAPI.delete(id).then(() => {
      loadProducts();
      alert('Producto eliminado');
    });
  }

  function resetForm() {
    setForm({name:'',description:'',price:'',stock:'',imageUrl:''});
    setEditingId(null);
    setShowForm(false);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mis Productos</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700">{showForm ? 'Cancelar' : '+ Nuevo Producto'}</button>
      </div>

      {showForm && (
        <div className="bg-white rounded shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Editar Producto' : 'Nuevo Producto'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Nombre del producto" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required className="w-full px-3 py-2 border rounded"/>
            <textarea placeholder="Descripción detallada del producto" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} required className="w-full px-3 py-2 border rounded" rows="3"/>
            <input type="number" step="0.01" min="0" placeholder="Precio (ej: 99.99)" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} required className="w-full px-3 py-2 border rounded"/>
            <input type="number" min="0" placeholder="Cantidad en stock (ej: 100)" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})} required className="w-full px-3 py-2 border rounded"/>
            <div>
              <input type="url" placeholder="URL directa de imagen (ej: https://picsum.photos/400)" value={form.imageUrl} onChange={e=>setForm({...form,imageUrl:e.target.value})} className="w-full px-3 py-2 border rounded"/>
              <p className="text-xs text-gray-500 mt-1">
                💡 Usa URLs directas de imágenes que terminen en .jpg, .png, .webp o servicios como: https://picsum.photos/400
              </p>
            </div>
            <div className="flex gap-4">
              <button type="button" onClick={resetForm} className="flex-1 bg-gray-200 py-2 rounded">Cancelar</button>
              <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded">Guardar</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p.id} className="bg-white rounded shadow p-4">
            <div className="h-40 bg-gray-100 mb-4 flex items-center justify-center overflow-hidden rounded">
              {p.imageUrl ? (
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="text-6xl">📦</div>';
                  }}
                />
              ) : (
                <div className="text-6xl">📦</div>
              )}
            </div>
            <h3 className="font-bold">{p.name}</h3>
            <p className="text-sm text-gray-600 my-2">{p.description}</p>
            <div className="flex justify-between text-sm mb-4">
              <span className="font-bold">Precio: {p.price}</span>
              <span>Stock: {p.stock}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(p)} className="flex-1 bg-yellow-500 text-white py-2 rounded">Editar</button>
              <button onClick={() => handleDelete(p.id)} className="flex-1 bg-red-500 text-white py-2 rounded">Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && !showForm && (
        <div className="text-center py-12 text-gray-600">
          <p className="text-xl">No tienes productos. ¡Crea uno ahora!</p>
        </div>
      )}
    </div>
  );
}

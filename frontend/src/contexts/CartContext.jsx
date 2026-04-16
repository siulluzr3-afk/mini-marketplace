// Context para manejar el carrito de compras

import { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  // Cargar carrito al iniciar si el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      setCartItems([]);
      setTotal(0);
      setItemCount(0);
    }
  }, [isAuthenticated]);

  // Cargar carrito desde el backend
  async function loadCart() {
    setLoading(true);
    try {
      const response = await cartAPI.get();
      setCartItems(response.data.cartItems);
      setTotal(response.data.total);
      setItemCount(response.data.itemCount);
    } catch (error) {
      console.error('Error al cargar carrito:', error);
    } finally {
      setLoading(false);
    }
  }

  // Agregar producto al carrito
  async function addToCart(productId, quantity = 1) {
    try {
      await cartAPI.add(productId, quantity);
      await loadCart(); // Recargar carrito
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Error al agregar al carrito';
      return { success: false, error: message };
    }
  }

  // Actualizar cantidad de un item
  async function updateQuantity(cartItemId, quantity) {
    try {
      await cartAPI.update(cartItemId, quantity);
      await loadCart(); // Recargar carrito
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Error al actualizar cantidad';
      return { success: false, error: message };
    }
  }

  // Eliminar item del carrito
  async function removeItem(cartItemId) {
    try {
      await cartAPI.remove(cartItemId);
      await loadCart(); // Recargar carrito
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Error al eliminar item';
      return { success: false, error: message };
    }
  }

  // Vaciar carrito completo
  async function clearCart() {
    try {
      await cartAPI.clear();
      setCartItems([]);
      setTotal(0);
      setItemCount(0);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Error al vaciar carrito';
      return { success: false, error: message };
    }
  }

  const value = {
    cartItems,
    total,
    itemCount,
    loading,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    refreshCart: loadCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook personalizado para usar el contexto
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider');
  }
  return context;
}

// Context para manejar la autenticación

import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Cargar usuario al iniciar si hay token
  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Cargar información del usuario
  async function loadUser() {
    try {
      const response = await authAPI.getCurrentUser();
      setUser(response.data.user);
    } catch (error) {
      console.error('Error al cargar usuario:', error);
      logout();
    } finally {
      setLoading(false);
    }
  }

  // Registrar nuevo usuario
  async function register(name, email, password, role = 'BUYER') {
    try {
      const response = await authAPI.register({ name, email, password, role });
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setToken(token);
      setUser(user);
      
      return { success: true, user };
    } catch (error) {
      const message = error.response?.data?.error || 'Error al registrar';
      return { success: false, error: message };
    }
  }

  // Iniciar sesión
  async function login(email, password) {
    try {
      const response = await authAPI.login({ email, password });
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setToken(token);
      setUser(user);
      
      return { success: true, user };
    } catch (error) {
      const message = error.response?.data?.error || 'Error al iniciar sesión';
      return { success: false, error: message };
    }
  }

  // Cerrar sesión
  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  }

  // Verificar si el usuario es vendedor
  function isSeller() {
    return user?.role === 'SELLER';
  }

  // Verificar si el usuario es comprador
  function isBuyer() {
    return user?.role === 'BUYER';
  }

  const value = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    isSeller,
    isBuyer,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personalizado para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
}

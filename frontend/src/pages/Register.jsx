// Página de registro

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'BUYER',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // Validar contraseñas
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    const result = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.role
    );

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white border border-gray-300 rounded p-8 shadow-sm">
          <div className="text-center mb-6">
            <Link to="/" className="inline-block text-3xl font-bold text-slate-900 mb-4">
              🛒 MiniMarket
            </Link>
            <h2 className="text-2xl font-normal mb-2">Crear cuenta</h2>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">Tu nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amazon-400 focus:border-amazon-400"
                placeholder="Nombre y apellido"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amazon-400 focus:border-amazon-400"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amazon-400 focus:border-amazon-400"
                placeholder="Mínimo 6 caracteres"
              />
              <p className="text-xs text-gray-600 mt-1">La contraseña debe tener al menos 6 caracteres.</p>
            </div>

            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">
                Volver a escribir la contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amazon-400 focus:border-amazon-400"
                placeholder="Confirmar contraseña"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">Tipo de cuenta</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amazon-400 focus:border-amazon-400"
              >
                <option value="BUYER">Comprador</option>
                <option value="SELLER">Vendedor</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amazon-400 hover:bg-amazon-500 text-white py-2 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creando cuenta...' : 'Continuar'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-600">
            <p>
              Al crear una cuenta, aceptas las Condiciones de Uso y el Aviso de Privacidad de MiniMarket.
            </p>
          </div>

          <div className="mt-4 text-center text-sm">
            <p className="text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="text-amazon-600 hover:text-amazon-700 hover:underline">
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>© 2024 MiniMarket. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}

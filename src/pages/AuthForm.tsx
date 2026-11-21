// src/pages/AuthForm.tsx
// Formulário compartilhado entre Login e Cadastro.

import { FormEvent, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HttpError } from '../services/http';

interface Props {
  mode: 'login' | 'register';
}

export const AuthForm: React.FC<Props> = ({ mode }) => {
  const isRegister = mode === 'register';
  const { user, login, register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (isRegister) {
        await register({ name, email, password });
      } else {
        await login({ email, password });
      }
      navigate('/', { replace: true });
    } catch (err) {
      if (err instanceof HttpError && err.status === 401) {
        setError('E-mail ou senha inválidos.');
      } else if (err instanceof HttpError && err.status === 409) {
        setError('Este e-mail já está cadastrado.');
      } else if (err instanceof HttpError && err.status === 400) {
        setError('Verifique os dados (e-mail válido e senha com ao menos 6 caracteres).');
      } else {
        setError('Não foi possível conectar ao servidor.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8 space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Clima</h1>
          <p className="text-slate-600 text-sm mt-1">
            {isRegister ? 'Crie sua conta' : 'Entre na sua conta'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{error}</div>
        )}

        {isRegister && (
          <input
            className={inputClass}
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={120}
          />
        )}
        <input
          className={inputClass}
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={inputClass}
          type="password"
          placeholder="Senha (mín. 6 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={isRegister ? 6 : undefined}
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-teal-600 text-white py-2 font-medium hover:bg-teal-700 disabled:opacity-60"
        >
          {submitting ? 'Aguarde...' : isRegister ? 'Cadastrar' : 'Entrar'}
        </button>

        <p className="text-sm text-slate-600 text-center">
          {isRegister ? (
            <>Já tem conta? <Link to="/login" className="text-teal-700 font-medium">Entrar</Link></>
          ) : (
            <>Não tem conta? <Link to="/register" className="text-teal-700 font-medium">Cadastre-se</Link></>
          )}
        </p>
      </form>
    </div>
  );
};

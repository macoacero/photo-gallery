'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const users: User[] = JSON.parse(localStorage.getItem('users')  || '[]');

    const user = users?.find(user => user.username === username && user.password === password);

    if (user) {
      alert('Inicio de sesión exitoso');
      router.push('/galery'); 
      localStorage.setItem('currentUser', JSON.stringify(user.username));
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      alert('Usuario o contraseña inválidos');
    }
  };

  return (
    <div>
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
          <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-3xl font-bold text-center text-gray-700">Login</h1>
            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="user"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Usuario
                </label>
                <input
                  type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Contraseña
                </label>
                <input
                  type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mt-2">
                <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                  Login
                </button>
              </div>
            </form>

            <p className="mt-4 text-sm text-center text-gray-700">
             ¿No tienes cuenta aún?{" "}
              <Link
                href="/register"
                className="font-medium text-blue-600 hover:underline"
              >
                Regístrate
              </Link>
            </p>
          </div>
        </div>
    </div>
  );
};

export default Login;
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalDispatch } from '@/context/globalContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useGlobalDispatch();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        dispatch({ type: 'LOGIN', payload: { token } });

        router.replace('/dashboard');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='bg-gray-200'>
      <div className='flex justify-center items-center h-screen'>
        <form className='w-1/3 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <h2 className=' text-gray-900 text-2xl font-bold mb-6'>
            WebReinvent Log In
          </h2>
          {error && <p className='text-red-500 mb-4'>{error}</p>}
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='email'
            >
              Email
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='password'
            >
              Password
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

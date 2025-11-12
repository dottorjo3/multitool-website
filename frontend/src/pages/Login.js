import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authAPI } from '../services/api';

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await authAPI.login(email, password);
      
      // Salva token e user info
      authAPI.setToken(result.token);
      if (result.refreshToken) {
        authAPI.setRefreshToken(result.refreshToken);
      }
      localStorage.setItem('user', JSON.stringify(result.user));
      
      // Redirect alla home
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError(err.message || t('login.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleDemoUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await authAPI.restoreDemoUser();
      
      // Salva token e user info
      authAPI.setToken(result.token);
      if (result.refreshToken) {
        authAPI.setRefreshToken(result.refreshToken);
      }
      localStorage.setItem('user', JSON.stringify(result.user));
      
      // Redirect alla home
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError(err.message || 'Failed to restore demo user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            {t('login.title')}
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            {t('login.subtitle')}
          </p>
        </div>

        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          {error && (
            <div className='bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded'>
              {error}
            </div>
          )}

          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                {t('login.email')}
              </label>
              <input
                id='email'
                name='email'
                type='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                placeholder={t('login.email')}
              />
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                {t('login.password')}
              </label>
              <input
                id='password'
                name='password'
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                placeholder={t('login.password')}
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              disabled={loading}
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400'
            >
              {loading ? t('login.signingIn') : t('login.signIn')}
            </button>
          </div>

          <div className='text-center'>
            <button
              type='button'
              onClick={handleDemoUser}
              disabled={loading}
              className='text-sm text-indigo-600 hover:text-indigo-500 disabled:text-gray-400'
            >
              {t('login.demoUser')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

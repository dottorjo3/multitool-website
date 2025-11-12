import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function PremiumWall({ user }) {
  const { t } = useTranslation();
  const isAuthenticated = Boolean(user);
  const isPremium = Boolean(user?.premium);

  return (
    <div className='bg-white border border-yellow-200 rounded-xl p-8 shadow-md text-center space-y-4'>
      <div className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-700 text-2xl mx-auto'>
        ⭐
      </div>
      <h3 className='text-2xl font-semibold text-slate-900'>{t('premiumWall.title')}</h3>
      <p className='text-slate-600'>
        {t('premiumWall.description')}
      </p>

      {!isAuthenticated && (
        <div className='space-y-3'>
          <Link
            to='/login'
            className='inline-flex items-center justify-center px-6 py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition'
          >
            {t('premiumWall.loginCta')}
          </Link>
          <p className='text-sm text-slate-500'>
            {t('premiumWall.demoInfo')}
          </p>
        </div>
      )}

      {isAuthenticated && !isPremium && (
        <div className='space-y-3'>
          <p className='text-sm text-slate-600'>
            {t('premiumWall.hello', { name: user.name })}
          </p>
          <a
            href='https://buymeacoffee.com/'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center justify-center px-6 py-2 rounded-full bg-yellow-500 text-slate-900 font-semibold hover:bg-yellow-400 transition'
          >
            {t('premiumWall.upgradeCta')}
          </a>
        </div>
      )}
    </div>
  );
}

PremiumWall.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    premium: PropTypes.bool,
  }),
};

PremiumWall.defaultProps = {
  user: null,
};


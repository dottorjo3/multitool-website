import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authAPI } from '../services/api';

// 🧠 NeoPanze redesign: navbar sticky con CTA donazione e switch lingua migliorato

export default function Navbar() {
  const [user, setUser] = useState(null);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, free: 0, premium: 0 });

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        console.error('Error parsing user:', e);
      }
    }
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000/api'}/tools`)
      .then((res) => res.json())
      .then((data) => {
        const total = data.length;
        const free = data.filter((tool) => tool.free !== false).length;
        const premium = total - free;
        setStats({ total, free, premium });
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await authAPI.logout();
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/pdf-tools', label: t('nav.pdfSuite') },
    { to: '/ai-tools', label: t('nav.aiSuite') },
    { to: '/video-tools', label: t('nav.videoSuite') },
    { to: '/marketing-tools', label: t('nav.marketing') },
    { to: { pathname: '/tools', search: '?category=developer' }, label: t('nav.developer') },
    { to: { pathname: '/tools', search: '?category=text' }, label: t('nav.textSuite') },
    { to: { pathname: '/tools', search: '?category=image' }, label: t('nav.imageSuite') },
    { to: '/tools', label: t('nav.allTools') },
  ];

  return (
    <header className='sticky top-0 z-40 backdrop-blur bg-white/85 border-b border-slate-200'>
      <nav className='container mx-auto px-4 py-4 flex items-center gap-6'>
        <Link to='/' className='flex items-center gap-2 text-2xl font-bold text-indigo-600 tracking-tight'>
          <span role='img' aria-hidden='true'>🚀</span>
          <span>Bibble</span>
        </Link>

        <div className='hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 ml-8 mr-auto'>
          {navLinks.map((link) => (
            <Link key={link.label} to={link.to} className='hover:text-indigo-600 transition'>
              {link.label}
            </Link>
          ))}
        </div>

        <div className='flex items-center gap-3 ml-auto'>
          <div className='hidden sm:flex items-center gap-2 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600'>
            <button
              onClick={() => changeLanguage('it')}
              className={`px-2 py-1 rounded-full transition ${
                i18n.language === 'it' ? 'bg-white text-indigo-600 shadow-sm' : 'hover:text-indigo-600'
              }`}
            >
              IT
            </button>
            <button
              onClick={() => changeLanguage('en')}
              className={`px-2 py-1 rounded-full transition ${
                i18n.language === 'en' ? 'bg-white text-indigo-600 shadow-sm' : 'hover:text-indigo-600'
              }`}
            >
              EN
            </button>
          </div>

          <a
            href='https://buymeacoffee.com/'
            target='_blank'
            rel='noopener noreferrer'
            className='hidden sm:flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition'
          >
            🍕 {t('nav.donate')}
          </a>

          <a
            href='https://buymeacoffee.com/'
            target='_blank'
            rel='noopener noreferrer'
            className='sm:hidden flex items-center gap-1 rounded-full bg-yellow-100 text-yellow-700 px-3 py-1 text-xs font-semibold hover:bg-yellow-200 transition'
          >
            🍕
          </a>

          {user ? (
            <div className='flex items-center gap-3 border-l border-slate-200 pl-3'>
              <span className='text-sm text-slate-700'>
                {user.name}
                {user.premium && (
                  <span className='ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full'>
                    Premium
                  </span>
                )}
              </span>
              <button
                onClick={handleLogout}
                className='text-sm font-semibold text-slate-600 hover:text-indigo-600 transition'
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to='/login'
              className='inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 transition'
            >
              {t('nav.login')}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { toolsAPI } from '../services/api';
import ToolCard from '../components/ToolCard';

// 🧠 Directory NeoPanze: ricerca live, filtri smart e URL sincronizzati

export default function ToolsPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ category: 'all', free: 'all' });
  const [searchTerm, setSearchTerm] = useState('');

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const loadTools = async () => {
      try {
        setLoading(true);
        const data = await toolsAPI.getAll();
        setTools(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load tools');
        console.error('Error loading tools:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTools();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category') || 'all';
    const tier = params.get('free') || 'all';
    const query = params.get('q') || '';

    setFilters((prev) => ({
      category: prev.category === category ? prev.category : category,
      free: prev.free === tier ? prev.free : tier,
    }));
    setSearchTerm((prev) => (prev === query ? prev : query));
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.category !== 'all') {
      params.set('category', filters.category);
    }
    if (filters.free !== 'all') {
      params.set('free', filters.free);
    }
    if (searchTerm.trim()) {
      params.set('q', searchTerm.trim());
    }

    const nextSearch = params.toString();
    const currentSearch = location.search.startsWith('?')
      ? location.search.slice(1)
      : location.search;

    if (nextSearch !== currentSearch) {
      navigate(
        {
          pathname: '/tools',
          search: nextSearch ? `?${nextSearch}` : '',
        },
        { replace: true },
      );
    }
  }, [filters, searchTerm, location.search, navigate]);

  const filteredTools = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return tools
      .filter((tool) => (filters.category === 'all' ? true : tool.category === filters.category))
      .filter((tool) => {
        if (filters.free === 'free') return tool.free !== false;
        if (filters.free === 'premium') return tool.free === false;
        return true;
      })
      .filter((tool) => {
        if (!normalizedSearch) return true;
        const haystack = `${tool.name} ${tool.description} ${tool.id}`.toLowerCase();
        return haystack.includes(normalizedSearch);
      });
  }, [tools, filters, searchTerm]);

  const premiumCount = useMemo(
    () => tools.filter((tool) => tool.free === false).length,
    [tools],
  );

  const freeCount = useMemo(
    () => tools.filter((tool) => tool.free !== false).length,
    [tools],
  );

  return (
    <div className='min-h-screen bg-white'>
      <div className='relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500'>
        <div className='absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.35),transparent_40%),radial-gradient(circle_at_80%_0,rgba(255,255,255,0.2),transparent_40%)]'></div>
        <div className='relative container mx-auto px-4 py-16 text-white'>
          <span className='inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider backdrop-blur'>
            {t('tools.heroBadge')}
          </span>
          <h1 className='mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl'>
            {t('tools.title')}
          </h1>
          <p className='mt-4 max-w-2xl text-indigo-100'>{t('tools.subtitle', { count: tools.length })}</p>

          <div className='mt-8 rounded-3xl bg-white/10 p-6 backdrop-blur'>
            <label htmlFor='tool-search' className='text-sm font-semibold uppercase tracking-wider text-indigo-100'>
              {t('tools.searchLabel')}
            </label>
            <div className='mt-3 flex flex-col gap-3 sm:flex-row'>
              <div className='relative flex-grow'>
                <input
                  id='tool-search'
                  type='search'
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder={t('tools.searchPlaceholder')}
                  className='w-full rounded-2xl border border-white/40 bg-white/90 px-5 py-3 pr-12 text-sm text-slate-800 shadow focus:border-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
                {searchTerm && (
                  <button
                    type='button'
                    onClick={() => setSearchTerm('')}
                    className='absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600'
                  >
                    ✕
                  </button>
                )}
              </div>
              <div className='flex items-center gap-4 text-xs font-semibold text-indigo-100'>
                <span>{t('tools.heroStats.total', { count: tools.length })}</span>
                <span className='hidden sm:inline-block'>•</span>
                <span>{t('tools.heroStats.premium', { count: premiumCount })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-12'>
        <div className='flex flex-wrap gap-3'>
          {[
            { id: 'all', label: t('tools.filters.all'), style: 'bg-indigo-600 text-white', off: 'bg-indigo-50 text-indigo-600' },
            { id: 'free', label: t('tools.filters.freeOnly'), style: 'bg-emerald-500 text-white', off: 'bg-emerald-50 text-emerald-600' },
            { id: 'premium', label: t('tools.filters.premiumOnly'), style: 'bg-amber-500 text-white', off: 'bg-amber-50 text-amber-600' },
          ].map((option) => (
            <button
              key={option.id}
              type='button'
              onClick={() => updateFilter('free', option.id)}
              className={`px-3 py-1 rounded-full text-sm font-semibold ${filters.free === option.id ? option.style : option.off}`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {error && (
          <div className='mt-8 rounded-2xl border border-red-100 bg-red-50 px-6 py-4 text-red-700'>
            {error}
          </div>
        )}

        {loading && (
          <div className='flex items-center justify-center py-16'>
            <div className='h-12 w-12 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent'></div>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className='mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
              <div>
                <h2 className='text-2xl font-semibold text-slate-900'>
                  {t('tools.resultsTitle', { count: filteredTools.length })}
                </h2>
                {searchTerm && (
                  <p className='text-sm text-slate-500'>
                    {t('tools.resultsSubtitle', { query: searchTerm })}
                  </p>
                )}
              </div>
              <div className='flex items-center gap-3 text-xs text-slate-500'>
                <span>{t('tools.stats.freeCount', { count: freeCount })}</span>
                <span>•</span>
                <span>{t('tools.resultsPremium', { count: premiumCount })}</span>
                <span>•</span>
                <span>{t('tools.stats.totalCount', { count: tools.length })}</span>
              </div>
            </div>

            {filteredTools.length === 0 ? (
              <div className='mt-12 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-12 text-center'>
                <p className='text-lg font-semibold text-slate-700'>{t('tools.noTools')}</p>
                <p className='mt-2 text-sm text-slate-500'>{t('tools.noToolsHint')}</p>
              </div>
            ) : (
              <div className='mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

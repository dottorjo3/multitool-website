import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toolsAPI } from '../services/api';
import ToolCard from '../components/ToolCard';

export default function ImageToolsPage() {
  const { t } = useTranslation();
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await toolsAPI.getAll();
        setTools(data.filter((tool) => tool.category === 'image'));
        setError(null);
      } catch (err) {
        setError(err.message || 'Impossibile caricare i tool immagini.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className='min-h-screen bg-white'>
      <section className='relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500'>
        <div className='absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.35),transparent_40%),radial-gradient(circle_at_80%_0,rgba(255,255,255,0.2),transparent_45%)]'></div>
        <div className='relative container mx-auto px-4 py-16 text-white'>
          <span className='inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider backdrop-blur'>
            Suite immagini Bibble
          </span>
          <h1 className='mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl'>
            Laboratorio immagini NeoPanze
          </h1>
          <p className='mt-4 max-w-2xl text-emerald-100'>
            Ridimensiona, converte, comprime e proteggi i tuoi asset visual in pochi secondi. Tutti i tool sfruttano
            Sharp con preset pronti per social e automazioni.
          </p>
          <div className='mt-8 flex flex-wrap items-center gap-3 text-xs font-semibold text-emerald-100'>
            <span>{tools.length} tool attivi</span>
            <span>•</span>
            <span>Compatibili con batch upload</span>
            <span>•</span>
            <Link to='/tools' className='underline hover:text-white'>
              {t('tool.backToTools')}
            </Link>
          </div>
        </div>
      </section>

      <div className='container mx-auto px-4 py-12'>
        {error && (
          <div className='rounded-2xl border border-red-100 bg-red-50 px-6 py-4 text-red-700'>
            {error}
          </div>
        )}

        {loading && (
          <div className='flex items-center justify-center py-16'>
            <div className='h-12 w-12 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent'></div>
          </div>
        )}

        {!loading && !error && (
          <>
            {tools.length === 0 ? (
              <div className='mt-12 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-12 text-center'>
                <p className='text-lg font-semibold text-slate-700'>Stiamo preparando i primi tool immagini…</p>
                <p className='mt-2 text-sm text-slate-500'>Torna presto: nuove automazioni in arrivo.</p>
              </div>
            ) : (
              <div className='mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
                {tools.map((tool) => (
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










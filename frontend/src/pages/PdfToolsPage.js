import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ToolCard from '../components/ToolCard';
import { toolsAPI } from '../services/api';
import pdfTips from '../data/pdf_tips.json';

export default function PdfToolsPage() {
  const { t } = useTranslation();
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await toolsAPI.getAll();
        setTools(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Impossibile caricare i tool PDF.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const pdfTools = useMemo(() => tools.filter((tool) => tool.category === 'pdf'), [tools]);

  const quickOperations = useMemo(
    () => [
      { id: 'merge', icon: '➕', label: t('pdfLab.quickActions.merge'), target: 'pdf-merge' },
      { id: 'split', icon: '✂️', label: t('pdfLab.quickActions.split'), target: 'pdf-split' },
      { id: 'protect', icon: '🔐', label: t('pdfLab.quickActions.protect'), target: 'pdf-protect' },
      { id: 'unlock', icon: '🔓', label: t('pdfLab.quickActions.unlock'), target: 'pdf-unlock' },
    ],
    [t],
  );

  return (
    <div className='min-h-screen bg-slate-50'>
      <section className='bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-white py-20'>
        <div className='container mx-auto px-4 text-center'>
          <span className='inline-flex items-center justify-center rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur'>
            📄 {t('categories.pdf')}
          </span>
          <h1 className='mt-6 text-4xl font-bold sm:text-5xl'>PDF Tools</h1>
          <p className='mt-4 text-lg text-indigo-100'>
            Gestisci e trasforma documenti senza compromessi: unisci, dividi, proteggi e converti con precisione.
          </p>
          <Link
            to='/tools'
            className='mt-8 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-lg shadow-indigo-900/20 transition hover:-translate-y-0.5 hover:shadow-indigo-900/30'
          >
            ← {t('tool.backToTools')}
          </Link>
        </div>
      </section>

      <section className='container mx-auto px-4 py-12'>
        <div className='mb-8 flex flex-wrap items-center justify-center gap-2'>
          {quickOperations.map((op) => (
            <Link
              key={op.id}
              to={`/tool/${op.target}`}
              className='inline-flex min-w-[140px] items-center justify-center gap-2 rounded-full border border-white/60 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600'
            >
              <span aria-hidden='true'>{op.icon}</span>
              <span>{op.label}</span>
            </Link>
          ))}
        </div>

        {loading && (
          <div className='py-12 text-center'>
            <div className='inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-indigo-600'></div>
            <p className='mt-4 text-slate-600'>{t('tools.loading')}</p>
          </div>
        )}

        {error && (
          <div className='rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 shadow-sm'>
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className='grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {pdfTools.map((tool) => {
              const tips = pdfTips[tool.id];
              const tooltipContent = Array.isArray(tips) ? `• ${tips.join('\n• ')}` : tips;
              return (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  showPremiumRibbon
                  tooltipContent={tooltipContent}
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}


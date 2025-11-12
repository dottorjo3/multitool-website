import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolCard from '../components/ToolCard';
import { toolsAPI } from '../services/api';
import aiMetrics from '../data/ai_metrics.json';

export default function AiToolsPage() {
  const { t } = useTranslation();
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [typeFilter, setTypeFilter] = useState('all');
  const [premiumOnly, setPremiumOnly] = useState(false);

  useEffect(() => {
    let mounted = true;

    toolsAPI
      .getAll()
      .then((data) => {
        if (mounted) {
          setTools(data);
        }
      })
      .catch((err) => {
        console.error('Errore caricamento tool AI:', err);
        if (mounted) {
          setError(err.message || 'Impossibile caricare i tool AI');
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const aiTools = useMemo(
    () => tools.filter((tool) => tool.category === 'ai' || tool.category === 'ai-prompt'),
    [tools],
  );

  const filteredTools = useMemo(() => {
    return aiTools.filter((tool) => {
      if (typeFilter === 'ai' && tool.category !== 'ai') return false;
      if (typeFilter === 'ai-prompt' && tool.category !== 'ai-prompt') return false;
      if (premiumOnly && tool.free !== false) return false;
      return true;
    });
  }, [aiTools, typeFilter, premiumOnly]);

  return (
    <div className='min-h-screen bg-slate-50'>
      <section className='bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white py-20'>
        <div className='container mx-auto flex max-w-4xl flex-col items-center px-4 text-center'>
          <div className='max-w-3xl'>
            <span className='mb-4 inline-flex items-center justify-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide'>
              🤖 {t('nav.aiSuite')}
            </span>
            <h1 className='mb-4 text-4xl font-bold tracking-tight sm:text-5xl'>
              {t('aiLab.title')}
            </h1>
            <p className='text-lg leading-relaxed text-indigo-100'>
              {t('aiLab.subtitle')}{' '}
              <a
                href='https://docs.tool-empire.dev/ai/ai-lab-guide'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1 text-sm font-semibold text-white underline decoration-indigo-200 decoration-dotted hover:text-emerald-200'
              >
                Guida rapida →
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-6xl px-4 py-12'>
        <div className='mb-8 flex flex-wrap items-center justify-between gap-4'>
          <div className='inline-flex rounded-full bg-slate-100 p-1 text-[11px] font-semibold text-slate-500'>
            {[
              { id: 'all', label: t('aiFilters.all') },
              { id: 'ai', label: t('aiFilters.generation') },
              { id: 'ai-prompt', label: t('aiFilters.prompt') },
            ].map((option) => (
              <button
                key={option.id}
                type='button'
                onClick={() => setTypeFilter(option.id)}
                className={`rounded-full px-3 py-1 transition ${
                  typeFilter === option.id ? 'bg-white text-indigo-600 shadow' : 'hover:text-indigo-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <button
            type='button'
            onClick={() => setPremiumOnly((value) => !value)}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold transition ${
              premiumOnly
                ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                : 'border-slate-200 bg-white text-slate-500 hover:border-indigo-200 hover:text-indigo-600'
            }`}
            aria-pressed={premiumOnly}
          >
            {premiumOnly ? '✓' : '○'} {t('aiFilters.premiumOnly')}
          </button>
        </div>

        {error && (
          <div className='mb-6 rounded-2xl border border-red-100 bg-red-50 px-6 py-4 text-red-700'>
            {error}
          </div>
        )}

        {loading ? (
          <div className='py-20 text-center text-slate-500'>{t('tools.loading')}</div>
        ) : (
          <div className='grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3'>
            {filteredTools.map((tool) => {
              const metrics = aiMetrics[tool.id];
              const metaBadges = metrics
                ? [
                    metrics.avgDuration ? `Tempo medio: ${metrics.avgDuration}` : null,
                    metrics.recommendedModel ? `Modello: ${metrics.recommendedModel}` : null,
                  ].filter(Boolean)
                : [];

              return (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  badgeLabelOverride={
                    tool.category === 'ai-prompt'
                      ? t('tools.categoryLabels.ai-prompt') || 'AI Prompt'
                      : t('tools.categoryLabels.ai')
                  }
                  metaBadges={metaBadges}
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}


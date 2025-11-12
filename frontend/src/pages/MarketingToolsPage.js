import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolCard from '../components/ToolCard';
import { toolsAPI } from '../services/api';
import marketingTemplates from '../data/marketingTemplates';

export default function MarketingToolsPage() {
  const { t } = useTranslation();
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.error('Errore caricamento tool marketing:', err);
        if (mounted) {
          setError(err.message || 'Impossibile caricare i tool marketing');
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

  const marketingTools = useMemo(
    () => tools.filter((tool) => tool.category === 'marketing'),
    [tools],
  );

  return (
    <div className='min-h-screen bg-slate-50'>
      <section className='bg-gradient-to-br from-amber-500 via-rose-500 to-indigo-600 text-white py-20'>
        <div className='container mx-auto flex max-w-4xl flex-col items-center px-4 text-center'>
          <div className='max-w-3xl'>
            <span className='mb-4 inline-flex items-center justify-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide'>
              📈 {t('nav.marketingSuite')}
            </span>
            <h1 className='mb-4 text-4xl font-bold tracking-tight sm:text-5xl'>
              {t('marketingLab.title')}
            </h1>
            <p className='text-lg leading-relaxed text-amber-100'>
              {t('marketingLab.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-6xl px-4 py-12'>
        {error && (
          <div className='mb-6 rounded-2xl border border-red-100 bg-red-50 px-6 py-4 text-red-700'>
            {error}
          </div>
        )}

        {loading ? (
          <div className='py-20 text-center text-slate-500'>{t('tools.loading')}</div>
        ) : (
          <div className='grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3'>
            {marketingTools.map((tool) => (
              <MarketingToolPanel key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function MarketingToolPanel({ tool }) {
  const { t } = useTranslation();
  const [tab, setTab] = useState('overview');
  const meta = tool.marketingMeta || {};

  const metaBadges = [
    meta.copyReady !== undefined ? `Copy ready: ${meta.copyReady}%` : null,
    meta.funnelStage ? `Funnel: ${meta.funnelStage}` : null,
  ].filter(Boolean);

  const exportBriefing = () => {
    const payload = {
      id: tool.id,
      name: tool.name,
      description: tool.description,
      marketingMeta: meta,
      generatedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${tool.id}-briefing.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const overviewActions = [
    {
      key: 'export',
      icon: '⬇️',
      label: t('marketingLab.cta'),
      ariaLabel: t('marketingLab.cta'),
      onClick: exportBriefing,
    },
  ];

  const templateContent = marketingTemplates[tool.id];

  return (
    <div className='flex h-full flex-col gap-4'>
      <div className='inline-flex rounded-full bg-slate-100 p-1 text-[11px] font-semibold text-slate-500'>
        <button
          type='button'
          onClick={() => setTab('overview')}
          className={`rounded-full px-3 py-1 transition ${
            tab === 'overview' ? 'bg-white text-indigo-600 shadow' : 'hover:text-indigo-600'
          }`}
        >
          {t('marketingLab.tabs.overview')}
        </button>
        <button
          type='button'
          onClick={() => setTab('template')}
          className={`rounded-full px-3 py-1 transition ${
            tab === 'template' ? 'bg-white text-indigo-600 shadow' : 'hover:text-indigo-600'
          }`}
        >
          {t('marketingLab.tabs.template')}
        </button>
      </div>

      {tab === 'overview' ? (
        <ToolCard
          tool={tool}
          iconOverride='📣'
          badgeLabelOverride={t('tools.categoryLabels.marketing')}
          actions={overviewActions}
          metaBadges={metaBadges}
        />
      ) : (
        <div className='flex flex-1 flex-col rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left text-[12px] leading-relaxed text-slate-700 shadow-sm'>
          <pre className='flex-1 whitespace-pre-wrap font-sans'>{templateContent || t('marketingLab.noTemplate')}</pre>
          <div className='mt-3 flex flex-wrap gap-2'>
            <button
              type='button'
              onClick={exportBriefing}
              className='inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-[12px] font-semibold text-white shadow transition hover:bg-indigo-500'
            >
              ⬇️ {t('marketingLab.cta')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toolsAPI } from '../services/api';
import ToolCard from '../components/ToolCard';

// 🧠 Homepage NeoPanze: hero dinamico, statistiche e sezioni categoria/spotlight

export default function Home() {
  const { t } = useTranslation();
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTools = async () => {
      try {
        const data = await toolsAPI.getAll();
        setTools(data);
      } catch (error) {
        console.error('Error loading tools:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTools();
  }, []);

  const stats = useMemo(() => {
    const premiumCount = tools.filter((tool) => tool.free === false).length;
    const freeCount = tools.filter((tool) => tool.free !== false).length;
    const pdfCount = tools.filter((tool) => tool.category === 'pdf').length;

    return [
      { label: t('home.stats.tools'), value: `${tools.length || '35'}+` },
      { label: t('home.stats.free'), value: `${freeCount || '20'} free` },
      { label: t('home.stats.premium'), value: `${premiumCount || '15'}+` },
      { label: t('home.stats.pdfSuite'), value: `${pdfCount || '20'} PDF` },
      { label: t('home.stats.languages'), value: '2' },
    ];
  }, [tools, t]);
  const freeCount = useMemo(() => tools.filter((tool) => tool.free !== false).length, [tools]);

  const categories = useMemo(() => {
    const countsByCategory = tools.reduce((acc, tool) => {
      const key = tool.category || 'other';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return [
      {
        id: 'pdf',
        icon: '📄',
        label: t('home.categories.pdf'),
        description: t('home.categories.pdfDesc'),
        count: countsByCategory.pdf || 0,
        link: '/pdf-tools',
      },
      {
        id: 'image',
        icon: '🖼️',
        label: t('home.categories.image'),
        description: t('home.categories.imageDesc'),
        count: countsByCategory.image || 0,
        link: '/image-tools',
      },
      {
        id: 'text',
        icon: '✍️',
        label: t('home.categories.text'),
        description: t('home.categories.textDesc'),
        count: countsByCategory.text || 0,
        link: '/text-tools',
      },
      {
        id: 'developer',
        icon: '👨‍💻',
        label: t('home.categories.developer'),
        description: t('home.categories.developerDesc'),
        count: countsByCategory.developer || 0,
        link: '/tools?category=developer',
      },
      {
        id: 'ai-prompt',
        icon: '🧠',
        label: t('home.categories.aiPrompt'),
        description: t('home.categories.aiPromptDesc'),
        count: countsByCategory['ai-prompt'] || 0,
        link: '/tools?category=ai-prompt',
      },
      {
        id: 'marketing',
        icon: '📈',
        label: t('home.categories.marketing'),
        description: t('home.categories.marketingDesc'),
        count: countsByCategory.marketing || 0,
        link: '/tools?category=marketing',
      },
    ];
  }, [tools, t]);

  const features = [
    {
      icon: '⚡',
      title: t('home.featureSpeedTitle'),
      description: t('home.featureSpeedDesc'),
    },
    {
      icon: '🧩',
      title: t('home.featureModularTitle'),
      description: t('home.featureModularDesc'),
    },
    {
      icon: '🔒',
      title: t('home.featureSecureTitle'),
      description: t('home.featureSecureDesc'),
    },
    {
      icon: '🤖',
      title: t('home.featureAIFarmTitle'),
      description: t('home.featureAIFarmDesc'),
    },
  ];

  const spotlightTools = useMemo(() => {
    return tools
      .filter((tool) => tool.category === 'pdf')
      .slice(0, 3);
  }, [tools]);

  return (
    <div className='min-h-screen bg-slate-50'>
      <section className='relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-sky-500'>
        <div className='absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.4),transparent_35%),radial-gradient(circle_at_80%_0,rgba(255,255,255,0.25),transparent_35%)]'></div>
        <div className='relative container mx-auto flex flex-col items-center px-4 py-20 text-center text-white'>
          <span className='inline-flex items-center justify-center rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur'>
            {t('home.badge')}
          </span>
          <h1 className='mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl'>
            {t('home.title')}
          </h1>
          <p className='mt-4 max-w-2xl text-lg text-indigo-100 sm:text-xl'>
            {t('home.subtitle')}
          </p>
          <p className='mt-2 max-w-2xl text-sm text-indigo-100/80'>
            {t('home.hero.subtitle')}
          </p>
          <div className='mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600'>
            <span className='text-xs uppercase tracking-wide'>Free</span>
            <span>{t('home.hero.freeCount', { count: freeCount })}</span>
          </div>
          <div className='mt-8 flex flex-col items-center gap-3 sm:flex-row'>
            <Link
              to='/tools'
              className='inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-xl shadow-indigo-900/20 transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-indigo-900/30'
            >
              {t('home.ctaPrimary')}
            </Link>
            <Link
              to='/pdf-tools'
              className='inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 hover:-translate-y-0.5'
            >
              {t('home.ctaSecondary')}
            </Link>
          </div>
          <div className='mt-12 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {stats.map((stat) => (
              <div
                key={stat.label}
                className='rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur shadow-inner shadow-black/5'
              >
                <p className='text-sm uppercase tracking-wide text-indigo-100/80'>{stat.label}</p>
                <p className='mt-2 text-3xl font-semibold'>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='container mx-auto px-4 py-16'>
        <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
          <div>
            <h2 className='text-3xl font-bold text-slate-900'>{t('home.sectionFeaturesTitle')}</h2>
            <p className='mt-2 max-w-2xl text-slate-600'>{t('home.sectionFeaturesSubtitle')}</p>
          </div>
          <Link
            to='/tools'
            className='inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-500 transition'
          >
            {t('home.sectionFeaturesCta')}
          </Link>
        </div>
        <div className='mt-10 grid gap-6 md:grid-cols-2'>
          {features.map((feature) => (
            <div
              key={feature.title}
              className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg'
            >
              <div className='flex items-start gap-4'>
                <span className='flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl'>
                  {feature.icon}
                </span>
                <div>
                  <h3 className='text-lg font-semibold text-slate-900'>{feature.title}</h3>
                  <p className='mt-2 text-sm text-slate-600'>{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className='bg-white py-16'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
            <div>
              <h2 className='text-3xl font-bold text-slate-900'>{t('home.sectionCategoriesTitle')}</h2>
              <p className='mt-2 max-w-2xl text-slate-600'>{t('home.sectionCategoriesSubtitle')}</p>
            </div>
            <Link
              to='/tools'
              className='inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500'
            >
              {t('home.sectionCategoriesLink')}
              <span aria-hidden='true'>→</span>
            </Link>
          </div>
          <div className='mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {categories.map((category) => (
              <Link
                key={category.id}
                to={category.link}
                className='group rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-lg'
              >
                <div className='flex items-center justify-between'>
                  <span className='text-3xl'>{category.icon}</span>
                  <span className='rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 shadow-sm'>
                    {category.count} {t('home.sectionCategoriesCount')}
                  </span>
                </div>
                <h3 className='mt-6 text-lg font-semibold text-slate-900 group-hover:text-indigo-600'>
                  {category.label}
                </h3>
                <p className='mt-2 text-sm text-slate-600'>{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className='container mx-auto px-4 py-16'>
        <div className='rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 text-white shadow-xl'>
          <div className='flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between'>
            <div className='max-w-2xl'>
              <span className='inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider'>
                {t('home.sectionShowcaseBadge')}
              </span>
              <h2 className='mt-4 text-3xl font-bold'>{t('home.sectionShowcaseTitle')}</h2>
              <p className='mt-3 text-slate-200'>{t('home.sectionShowcaseSubtitle')}</p>
            </div>
            <Link
              to='/pdf-tools'
              className='inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl'
            >
              {t('home.sectionShowcaseCta')}
            </Link>
          </div>
          <div className='mt-10 grid gap-6 md:grid-cols-3'>
            {loading && (
              <div className='col-span-full flex items-center justify-center py-10'>
                <div className='h-10 w-10 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
              </div>
            )}
            {!loading && spotlightTools.length === 0 && (
              <p className='col-span-full text-sm text-slate-300'>{t('home.sectionShowcaseEmpty')}</p>
            )}
            {!loading &&
              spotlightTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
          </div>
        </div>
      </section>

      <section className='border-t border-slate-200 bg-white py-16'>
        <div className='container mx-auto px-4 text-center'>
          <span className='inline-flex items-center justify-center rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-600'>
            {t('home.ctaFooterBadge')}
          </span>
          <h2 className='mt-4 text-3xl font-bold text-slate-900'>{t('home.ctaFooterTitle')}</h2>
          <p className='mt-3 text-sm text-slate-600'>{t('home.ctaFooterSubtitle')}</p>
          <div className='mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row'>
            <a
              href='https://buymeacoffee.com/'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-yellow-500/40 transition hover:-translate-y-0.5 hover:bg-yellow-300'
            >
              🍕 {t('home.ctaFooterPrimary')}
            </a>
            <Link
              to='/tools'
              className='inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100'
            >
              {t('home.ctaFooterSecondary')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

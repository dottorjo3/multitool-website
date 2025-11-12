import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ToolQuickActions from './ToolQuickActions';

// 🧠 Card restyling NeoPanze con quick actions, ribbon premium e tooltip

const CATEGORY_META = {
  pdf: { icon: '📄', badgeClass: 'bg-blue-100 text-blue-700' },
  image: { icon: '🖼️', badgeClass: 'bg-emerald-100 text-emerald-700' },
  text: { icon: '✍️', badgeClass: 'bg-purple-100 text-purple-700' },
  developer: { icon: '👨‍💻', badgeClass: 'bg-amber-100 text-amber-700' },
  video: { icon: '🎬', badgeClass: 'bg-rose-100 text-rose-700' },
  ai: { icon: '🤖', badgeClass: 'bg-indigo-100 text-indigo-700' },
  'ai-prompt': { icon: '🧠', badgeClass: 'bg-fuchsia-100 text-fuchsia-700' },
  marketing: { icon: '📈', badgeClass: 'bg-emerald-100 text-emerald-700' },
  other: { icon: '🛠️', badgeClass: 'bg-slate-100 text-slate-700' },
};

export default function ToolCard({
  tool,
  iconOverride,
  badgeLabelOverride,
  actions = [],
  metaBadges = [],
  tooltipContent,
  showPremiumRibbon = false,
}) {
  const { t } = useTranslation();
  const categoryInfo = CATEGORY_META[tool.category] || CATEGORY_META.other;
  const categoryLabel = badgeLabelOverride || t(`tools.categoryLabels.${tool.category}`, tool.category);
  const description = tool.description || t('tools.genericDescription');
  const isPremium = tool.free === false;
  const iconToShow = iconOverride || categoryInfo.icon;

  const handleCardClick = (event) => {
    if (event.target.closest('[data-tool-action="true"]')) {
      event.preventDefault();
    }
  };

  return (
    <Link
      to={`/tool/${tool.id}`}
      onClick={handleCardClick}
      className='group relative mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg'
    >
      {showPremiumRibbon && isPremium && (
        <span className='absolute right-0 top-0 rounded-bl-xl bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 text-[10px] font-semibold text-white shadow'>
          {t('tools.premiumBadge')}
        </span>
      )}

      <div className='flex items-start justify-between gap-2.5'>
        <div className='flex items-center gap-2.5'>
          <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-lg'>
            {iconToShow}
          </span>
          <div>
            <h3 className='text-sm font-semibold text-slate-900 transition group-hover:text-indigo-600'>
              {tool.name}
            </h3>
            <p className='mt-1 text-[9px] font-semibold uppercase tracking-wide text-slate-500'>
              {categoryLabel}
            </p>
          </div>
        </div>
        <span
          className={`rounded-full px-2 py-[2px] text-[10px] font-semibold ${
            isPremium ? 'bg-yellow-100 text-yellow-700' : 'bg-emerald-100 text-emerald-700'
          }`}
        >
          {isPremium ? t('tools.premiumBadge') : t('tools.freeBadge')}
        </span>
      </div>

      <p className='mt-2 flex-1 text-[12px] leading-relaxed text-slate-600'>{description}</p>

      {metaBadges.length > 0 && (
        <div className='mt-2 flex flex-wrap gap-2 text-[9px] font-semibold text-slate-500'>
          {metaBadges.map((badge) => (
            <span key={badge} className='rounded-full bg-slate-100 px-2 py-[2px]'>
              {badge}
            </span>
          ))}
        </div>
      )}

      {actions.length > 0 && (
        <div className='mt-3' data-tool-action='true'>
          <ToolQuickActions actions={actions} />
        </div>
      )}

      <div className='mt-4 flex items-center justify-between text-[10px] font-semibold text-slate-500'>
        <span className={`rounded-full px-2 py-[2px] ${categoryInfo.badgeClass}`}>
          {categoryLabel}
        </span>
        <span className='flex items-center gap-1 text-indigo-600 transition-all group-hover:gap-2'>
          {t('tools.openCta')}
          <span aria-hidden='true'>→</span>
        </span>
      </div>

      {tooltipContent && (
        <div className='mt-3 text-right'>
          <button
            type='button'
            data-tool-action='true'
            title={tooltipContent}
            className='inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-[2px] text-[10px] font-semibold text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600'
          >
            💡 <span>{t('tools.tooltip')}</span>
          </button>
        </div>
      )}
    </Link>
  );
}

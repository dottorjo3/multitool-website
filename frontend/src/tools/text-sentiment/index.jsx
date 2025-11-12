// 🔧 File: frontend/src/tools/text-sentiment/index.jsx
// 🔗 NeoPanze — Sentiment Analyzer

import React from 'react';

const LABELS = {
  positive: 'Positivo',
  negative: 'Negativo',
  neutral: 'Neutro',
};

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-3'>
        <span className='text-sm text-slate-600'>
          Parole totali: {result.totalWords}
        </span>
        <span className='px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-700'>
          Sentiment: {LABELS[result.label] || result.label}
        </span>
        <span className='text-sm text-slate-600'>Score: {result.score}</span>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 text-sm'>
        <div className='border border-emerald-200 rounded-lg p-3'>
          <p className='font-semibold text-emerald-600'>Parole positive ({result.positiveWords})</p>
          <p className='mt-2 text-slate-600 break-words'>
            {result.samples.positive.length ? result.samples.positive.join(', ') : '—'}
          </p>
        </div>
        <div className='border border-rose-200 rounded-lg p-3'>
          <p className='font-semibold text-rose-600'>Parole negative ({result.negativeWords})</p>
          <p className='mt-2 text-slate-600 break-words'>
            {result.samples.negative.length ? result.samples.negative.join(', ') : '—'}
          </p>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-sentiment',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo',
      placeholder: 'Scrivi o incolla un paragrafo da analizzare...',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Analizza sentiment',
};

export default definition;



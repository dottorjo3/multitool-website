// 🔧 File: frontend/src/tools/ai-sentiment-analyzer/index.jsx
// 🔗 Analizzatore sentiment AI

import React from 'react';

function ResultView({ result }) {
  if (!result) return null;

  const getSentimentColor = (sentiment) => {
    if (sentiment === 'positive') return 'text-green-600 bg-green-50 border-green-200';
    if (sentiment === 'negative') return 'text-red-600 bg-red-50 border-red-200';
    return 'text-slate-600 bg-slate-50 border-slate-200';
  };

  return (
    <div className='space-y-4'>
      <div className={`p-4 rounded-lg border ${getSentimentColor(result.sentiment)}`}>
        <div className='flex items-center justify-between mb-2'>
          <span className='font-semibold capitalize'>{result.sentiment || 'Neutrale'}</span>
          <span className='text-sm'>Confidenza: {(result.confidence * 100).toFixed(1)}%</span>
        </div>
        <div className='w-full bg-slate-200 rounded-full h-2'>
          <div
            className='bg-blue-600 h-2 rounded-full'
            style={{ width: `${(result.score * 100).toFixed(0)}%` }}
          />
        </div>
      </div>

      {result.breakdown && (
        <div className='grid grid-cols-3 gap-4 text-sm'>
          <div className='text-center p-3 bg-white rounded-lg border border-slate-200'>
            <div className='text-green-600 font-semibold'>{(result.breakdown.positive * 100).toFixed(1)}%</div>
            <div className='text-slate-600'>Positivo</div>
          </div>
          <div className='text-center p-3 bg-white rounded-lg border border-slate-200'>
            <div className='text-slate-600 font-semibold'>{(result.breakdown.neutral * 100).toFixed(1)}%</div>
            <div className='text-slate-600'>Neutrale</div>
          </div>
          <div className='text-center p-3 bg-white rounded-lg border border-slate-200'>
            <div className='text-red-600 font-semibold'>{(result.breakdown.negative * 100).toFixed(1)}%</div>
            <div className='text-slate-600'>Negativo</div>
          </div>
        </div>
      )}

      {result.provider && result.provider !== 'mock' && (
        <div className='text-xs text-slate-500'>Provider: {result.provider} | Model: {result.model}</div>
      )}
    </div>
  );
}

const definition = {
  id: 'ai-sentiment-analyzer',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo da analizzare',
      placeholder: 'Inserisci il testo di cui vuoi analizzare il sentiment...',
      required: true,
      rows: 6,
    },
  ],
  ResultView,
  ctaLabel: 'Analizza sentiment',
};

export default definition;



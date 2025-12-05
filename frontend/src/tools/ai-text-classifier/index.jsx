// 🔧 File: frontend/src/tools/ai-text-classifier/index.jsx
// 🔗 Classificatore testo AI

import React from 'react';

function ResultView({ result }) {
  if (!result) return null;

  const getCategoryColor = (score) => {
    if (score > 0.7) return 'bg-green-100 text-green-700 border-green-200';
    if (score > 0.4) return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <div className='space-y-4'>
      <div className={`p-4 rounded-lg border ${getCategoryColor(result.confidence)}`}>
        <div className='flex items-center justify-between mb-2'>
          <span className='text-lg font-bold capitalize'>{result.category}</span>
          <span className='text-sm'>Confidenza: {(result.confidence * 100).toFixed(1)}%</span>
        </div>
        <div className='w-full bg-slate-200 rounded-full h-2'>
          <div
            className='bg-blue-600 h-2 rounded-full'
            style={{ width: `${(result.confidence * 100).toFixed(0)}%` }}
          />
        </div>
      </div>

      {result.allCategories && result.allCategories.length > 0 && (
        <div>
          <h3 className='text-sm font-semibold text-slate-700 mb-2'>Tutte le categorie:</h3>
          <div className='space-y-2'>
            {result.allCategories
              .sort((a, b) => b.score - a.score)
              .map((cat, idx) => (
                <div key={idx} className='flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg'>
                  <span className='font-medium capitalize'>{cat.category}</span>
                  <span className='text-sm text-blue-600 font-semibold'>
                    {(cat.score * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
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
  id: 'ai-text-classifier',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo da classificare',
      placeholder: 'Inserisci il testo da classificare in categorie...',
      required: true,
      rows: 8,
    },
    {
      type: 'text',
      name: 'categories',
      label: 'Categorie personalizzate (opzionale)',
      placeholder: 'tecnologia, business, salute, educazione (separate da virgola)',
      helperText: 'Lascia vuoto per usare le categorie predefinite',
    },
  ],
  ResultView,
  ctaLabel: 'Classifica testo',
};

export default definition;



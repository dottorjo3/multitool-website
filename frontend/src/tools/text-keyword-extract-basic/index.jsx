// 🔧 File: frontend/src/tools/text-keyword-extract-basic/index.jsx
// 🔗 NeoPanze — Keyword Extract Basic

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-3'>
          Keyword estratte ({result.totalKeywords}):
        </p>
        <div className='bg-white p-4 rounded border border-indigo-200 max-h-96 overflow-y-auto'>
          <div className='space-y-2'>
            {result.keywords.map((kw, index) => (
              <div key={index} className='flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200'>
                <span className='font-semibold text-slate-900'>{kw.word}</span>
                <div className='flex gap-3 text-xs text-slate-600'>
                  <span>Occorrenze: <span className='font-bold text-indigo-600'>{kw.count}</span></span>
                  <span>Frequenza: <span className='font-bold text-indigo-600'>{kw.frequency}%</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='mt-3 text-xs text-indigo-700'>
          <p>Lunghezza minima: <span className='font-semibold'>{result.minLength} caratteri</span></p>
          <p>Top N: <span className='font-semibold'>{result.topN}</span></p>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-keyword-extract-basic',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da analizzare',
      placeholder: 'Inserisci il testo da cui estrarre le keyword...',
      rows: 8,
      required: true,
    },
    {
      type: 'text',
      name: 'minLength',
      label: 'Lunghezza minima parola',
      placeholder: '3',
      defaultValue: '3',
    },
    {
      type: 'text',
      name: 'topN',
      label: 'Numero di keyword (Top N)',
      placeholder: '20',
      defaultValue: '20',
    },
  ],
  ResultView,
  ctaLabel: 'Estrai keyword',
};

export default definition;


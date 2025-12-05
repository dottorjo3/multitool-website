// 🔧 File: frontend/src/tools/ai-text-simplifier/index.jsx
// 🔗 Semplificazione testo AI

import React from 'react';

function ResultView({ result }) {
  if (!result) return null;

  return (
    <div className='space-y-4'>
      <div className='text-sm text-slate-600'>
        <p>Livello di lettura: {result.readingLevel}</p>
        <p>Riduzione: da {result.originalLength} a {result.simplifiedLength} caratteri</p>
        {result.provider && result.provider !== 'mock' && (
          <p className='text-xs text-slate-500 mt-1'>Provider: {result.provider} | Model: {result.model}</p>
        )}
      </div>

      {result.original && (
        <div>
          <h3 className='text-sm font-semibold text-slate-700 mb-2'>Testo originale:</h3>
          <div className='p-4 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 whitespace-pre-wrap'>
            {result.original}
          </div>
        </div>
      )}

      {result.simplified && (
        <div>
          <h3 className='text-sm font-semibold text-slate-700 mb-2'>Testo semplificato:</h3>
          <div className='p-4 bg-white border border-green-200 rounded-lg text-slate-900 whitespace-pre-wrap'>
            {result.simplified}
          </div>
        </div>
      )}
    </div>
  );
}

const definition = {
  id: 'ai-text-simplifier',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo da semplificare',
      placeholder: 'Inserisci il testo complesso da semplificare...',
      required: true,
      rows: 8,
    },
    {
      type: 'select',
      name: 'readingLevel',
      label: 'Livello di lettura',
      defaultValue: 'simple',
      options: [
        { value: 'simple', label: 'Semplice' },
        { value: 'intermediate', label: 'Intermedio' },
        { value: 'easy', label: 'Facile' },
      ],
    },
  ],
  ResultView,
  ctaLabel: 'Semplifica testo',
};

export default definition;



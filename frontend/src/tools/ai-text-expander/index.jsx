// 🔧 File: frontend/src/tools/ai-text-expander/index.jsx
// 🔗 Espansione testo AI

import React from 'react';

function ResultView({ result }) {
  if (!result) return null;

  return (
    <div className='space-y-4'>
      <div className='text-sm text-slate-600'>
        <p>Espansione: {result.expansionRatio}x (da {result.originalLength} a {result.expandedLength} caratteri)</p>
        {result.provider && result.provider !== 'mock' && (
          <p className='text-xs text-slate-500 mt-1'>Provider: {result.provider} | Model: {result.model}</p>
        )}
      </div>

      {result.original && (
        <div>
          <h3 className='text-sm font-semibold text-slate-700 mb-2'>Testo originale:</h3>
          <div className='p-4 bg-slate-50 border border-slate-200 rounded-lg text-slate-700'>
            {result.original}
          </div>
        </div>
      )}

      {result.expanded && (
        <div>
          <h3 className='text-sm font-semibold text-slate-700 mb-2'>Testo espanso:</h3>
          <div className='p-4 bg-white border border-blue-200 rounded-lg prose prose-slate max-w-none'>
            {result.expanded.split('\n').map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const definition = {
  id: 'ai-text-expander',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo da espandere',
      placeholder: 'Inserisci il testo breve da espandere...',
      required: true,
      rows: 6,
    },
    {
      type: 'select',
      name: 'targetLength',
      label: 'Lunghezza obiettivo',
      defaultValue: 'medium',
      options: [
        { value: 'short', label: 'Corto (~200 parole)' },
        { value: 'medium', label: 'Medio (~500 parole)' },
        { value: 'long', label: 'Lungo (~1000 parole)' },
      ],
    },
  ],
  ResultView,
  ctaLabel: 'Espandi testo',
};

export default definition;



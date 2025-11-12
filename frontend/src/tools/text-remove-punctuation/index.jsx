// 🔧 File: frontend/src/tools/text-remove-punctuation/index.jsx
// 🔗 NeoPanze — Rimuovi punteggiatura

import React from 'react';

function ResultView({ result }) {
  if (!result?.cleaned) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>
        Lunghezza originale: {result.originalLength} • Dopo pulizia: {result.cleanedLength}
      </p>
      <div className='bg-slate-900 text-slate-50 text-sm rounded-lg p-4 whitespace-pre-wrap'>
        {result.cleaned}
      </div>
    </div>
  );
}

const definition = {
  id: 'text-remove-punctuation',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo',
      placeholder: 'Testo con, punteggiatura.... da rimuovere!',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Rimuovi punteggiatura',
};

export default definition;



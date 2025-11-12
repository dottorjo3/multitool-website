// 🔧 File: frontend/src/tools/text-uppercase-first/index.jsx
// 🔗 NeoPanze — Capitalizza l’inizio frase

import React from 'react';

function ResultView({ result }) {
  if (!result?.transformed) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>Lunghezza originale: {result.originalLength} caratteri</p>
      <div className='bg-slate-900 text-slate-50 text-sm rounded-lg p-4 whitespace-pre-wrap'>
        {result.transformed}
      </div>
    </div>
  );
}

const definition = {
  id: 'text-uppercase-first',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo',
      placeholder: 'inserisci qui il testo da capitalizzare...',
      rows: 10,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Capitalizza frasi',
};

export default definition;



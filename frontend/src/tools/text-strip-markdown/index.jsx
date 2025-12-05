// 🔧 File: frontend/src/tools/text-strip-markdown/index.jsx
// 🔗 NeoPanze — Strip Markdown

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Testo senza Markdown:</p>
        <div className='bg-white p-4 rounded border border-indigo-200'>
          <p className='text-slate-900 whitespace-pre-wrap break-words'>
            {result.cleaned}
          </p>
        </div>
        <div className='mt-3 text-xs text-indigo-700'>
          <p>Lunghezza: {result.originalLength} → {result.cleanedLength} caratteri</p>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-strip-markdown',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo Markdown',
      placeholder: 'Inserisci il testo Markdown da pulire...',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Rimuovi Markdown',
};

export default definition;


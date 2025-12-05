// 🔧 File: frontend/src/tools/text-remove-emoji/index.jsx
// 🔗 NeoPanze — Remove Emoji

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Testo senza emoji:</p>
        <div className='bg-white p-4 rounded border border-indigo-200'>
          <p className='text-slate-900 whitespace-pre-wrap break-words'>
            {result.cleaned}
          </p>
        </div>
        <div className='mt-3 space-y-1 text-xs text-indigo-700'>
          <p>Emoji rimossi: <span className='font-semibold'>{result.emojiRemoved}</span></p>
          <p>Lunghezza originale: {result.originalLength} → {result.cleanedLength} caratteri</p>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-remove-emoji',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da pulire',
      placeholder: 'Inserisci il testo da cui rimuovere gli emoji...',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Rimuovi emoji',
};

export default definition;


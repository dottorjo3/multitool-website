// 🔧 File: frontend/src/tools/text-paragraph-shuffle/index.jsx
// 🔗 NeoPanze — Paragraph Shuffle

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Paragrafi mescolati:</p>
        <div className='bg-white p-4 rounded border border-indigo-200'>
          <p className='text-slate-900 whitespace-pre-wrap break-words'>
            {result.shuffled}
          </p>
        </div>
        <p className='mt-3 text-xs text-indigo-700'>
          Paragrafi totali: <span className='font-semibold'>{result.paragraphCount}</span>
        </p>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-paragraph-shuffle',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo con paragrafi',
      placeholder: 'Inserisci il testo con paragrafi separati da righe vuote...',
      rows: 10,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Mescola paragrafi',
};

export default definition;


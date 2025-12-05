// 🔧 File: frontend/src/tools/text-combine-files/index.jsx
// 🔗 NeoPanze — Combine Files

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Testi combinati:</p>
        <div className='bg-white p-4 rounded border border-indigo-200'>
          <pre className='text-slate-900 whitespace-pre-wrap break-words font-mono text-xs'>
            {result.combined}
          </pre>
        </div>
        <div className='mt-3 text-xs text-indigo-700'>
          <p>Testi combinati: <span className='font-semibold'>{result.textsCount}</span></p>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-combine-files',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testi da combinare',
      placeholder: 'Inserisci i testi separati da righe vuote...',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'separator',
      label: 'Separatore',
      placeholder: '\\n\\n',
      defaultValue: '\\n\\n',
    },
    {
      type: 'checkbox',
      name: 'addNumbers',
      label: 'Aggiungi numerazione',
      defaultValue: 'false',
    },
  ],
  ResultView,
  ctaLabel: 'Combina',
};

export default definition;


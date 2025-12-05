// 🔧 File: frontend/src/tools/text-auto-line-break/index.jsx
// 🔗 NeoPanze — Auto Line Break

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Testo formattato:</p>
        <div className='bg-white p-4 rounded border border-indigo-200'>
          <pre className='text-slate-900 whitespace-pre-wrap break-words font-mono text-xs'>
            {result.formatted}
          </pre>
        </div>
        <div className='mt-3 flex gap-4 text-xs text-indigo-700'>
          <span>Righe: <span className='font-semibold'>{result.lines}</span></span>
          <span>Lunghezza max: <span className='font-semibold'>{result.maxLength} caratteri</span></span>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-auto-line-break',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da formattare',
      placeholder: 'Inserisci il testo a cui aggiungere interruzioni di riga...',
      rows: 8,
      required: true,
    },
    {
      type: 'text',
      name: 'maxLength',
      label: 'Lunghezza massima per riga',
      placeholder: '80',
      defaultValue: '80',
    },
  ],
  ResultView,
  ctaLabel: 'Formatta',
};

export default definition;


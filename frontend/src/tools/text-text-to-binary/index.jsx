// 🔧 File: frontend/src/tools/text-text-to-binary/index.jsx
// 🔗 NeoPanze — Text to Binary

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Testo convertito in binario:</p>
        <div className='bg-white p-4 rounded border border-indigo-200'>
          <p className='font-mono text-xs text-slate-900 break-all whitespace-pre-wrap'>
            {result.binary}
          </p>
        </div>
        <div className='mt-3 flex gap-4 text-xs text-indigo-700'>
          <span>Lunghezza originale: {result.length} caratteri</span>
          <span>Lunghezza binaria: {result.binaryLength} bit</span>
          <span>Bytes: {result.bytes}</span>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-text-to-binary',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da convertire',
      placeholder: 'Inserisci il testo da convertire in binario...',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Converti in binario',
};

export default definition;


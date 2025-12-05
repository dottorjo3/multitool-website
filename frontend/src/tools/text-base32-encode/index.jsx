// 🔧 File: frontend/src/tools/text-base32-encode/index.jsx
// 🔗 NeoPanze — Base32 Encode

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Testo codificato in Base32:</p>
        <div className='bg-white p-4 rounded border border-indigo-200'>
          <p className='font-mono text-slate-900 break-all whitespace-pre-wrap'>
            {result.encoded}
          </p>
        </div>
        <div className='mt-3 flex gap-4 text-xs text-indigo-700'>
          <span>Lunghezza originale: {result.length}</span>
          <span>Lunghezza codificata: {result.encodedLength}</span>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-base32-encode',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da codificare',
      placeholder: 'Inserisci il testo da codificare in Base32...',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Codifica in Base32',
};

export default definition;


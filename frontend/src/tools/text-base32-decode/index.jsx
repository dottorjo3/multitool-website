// 🔧 File: frontend/src/tools/text-base32-decode/index.jsx
// 🔗 NeoPanze — Base32 Decode

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Testo decodificato da Base32:</p>
        <div className='bg-white p-4 rounded border border-indigo-200'>
          <p className='font-mono text-slate-900 break-all whitespace-pre-wrap'>
            {result.decoded}
          </p>
        </div>
        <div className='mt-3 flex gap-4 text-xs text-indigo-700'>
          <span>Lunghezza codificata: {result.length}</span>
          <span>Lunghezza decodificata: {result.decodedLength}</span>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-base32-decode',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo Base32 da decodificare',
      placeholder: 'Inserisci il testo Base32 da decodificare...',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Decodifica da Base32',
};

export default definition;


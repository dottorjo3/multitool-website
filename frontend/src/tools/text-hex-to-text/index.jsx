// 🔧 File: frontend/src/tools/text-hex-to-text/index.jsx
// 🔗 NeoPanze — Hex to Text

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Testo decodificato:</p>
        <div className='bg-white p-4 rounded border border-indigo-200'>
          <p className='font-mono text-slate-900 whitespace-pre-wrap break-words'>
            {result.decoded}
          </p>
        </div>
        <div className='mt-3 flex gap-4 text-xs text-indigo-700'>
          <span>Lunghezza hex: {result.hexLength} caratteri</span>
          <span>Lunghezza testo: {result.decodedLength} caratteri</span>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-hex-to-text',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo esadecimale',
      placeholder: 'Inserisci il testo esadecimale da convertire (es: 48656c6c6f)...',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Converti a testo',
};

export default definition;


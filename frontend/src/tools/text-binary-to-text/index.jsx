// 🔧 File: frontend/src/tools/text-binary-to-text/index.jsx
// 🔗 NeoPanze — Binary to Text

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
          <span>Lunghezza binaria: {result.binaryLength} bit</span>
          <span>Lunghezza testo: {result.decodedLength} caratteri</span>
          <span>Bytes: {result.bytes}</span>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-binary-to-text',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo binario',
      placeholder: 'Inserisci il testo binario da convertire (es: 01001000 01100101)...',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Converti a testo',
};

export default definition;


// 🔧 File: frontend/src/tools/text-rot13/index.jsx
// 🔗 NeoPanze — ROT13 Encoder/Decoder

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Risultato ROT13:</p>
        <div className='bg-white p-4 rounded border border-indigo-200'>
          <p className='font-mono text-slate-900 whitespace-pre-wrap break-words'>
            {result.result}
          </p>
        </div>
      </div>
      
      <div className='p-3 bg-slate-50 border border-slate-200 rounded-lg'>
        <p className='text-xs text-slate-500'>
          Nota: ROT13 è una codifica simmetrica. Applicando ROT13 due volte si ottiene il testo originale.
        </p>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-rot13',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da codificare/decodificare',
      placeholder: 'Inserisci il testo...',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Applica ROT13',
};

export default definition;


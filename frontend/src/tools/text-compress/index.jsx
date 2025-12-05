// 🔧 File: frontend/src/tools/text-compress/index.jsx
// 🔗 NeoPanze — Text Compress

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Testo compresso (Base64):</p>
        <div className='bg-white p-4 rounded border border-indigo-200'>
          <p className='font-mono text-xs text-slate-900 break-all whitespace-pre-wrap'>
            {result.compressed}
          </p>
        </div>
        <div className='mt-3 space-y-1 text-xs text-indigo-700'>
          <p>Lunghezza originale: {result.originalLength} caratteri</p>
          <p>Lunghezza compressa: {result.compressedLength} bytes</p>
          <p className='font-semibold'>Rapporto di compressione: {result.compressionRatio}</p>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-compress',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da comprimere',
      placeholder: 'Inserisci il testo da comprimere...',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Comprimi',
};

export default definition;


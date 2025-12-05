// 🔧 File: frontend/src/tools/text-decompress/index.jsx
// 🔗 NeoPanze — Text Decompress

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Testo decompresso:</p>
        <div className='bg-white p-4 rounded border border-indigo-200'>
          <p className='font-mono text-slate-900 whitespace-pre-wrap break-words'>
            {result.decompressed}
          </p>
        </div>
        <div className='mt-3 space-y-1 text-xs text-indigo-700'>
          <p>Lunghezza compressa: {result.compressedLength} bytes</p>
          <p>Lunghezza decompressa: {result.decompressedLength} caratteri</p>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-decompress',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo compresso (Base64)',
      placeholder: 'Inserisci il testo compresso in formato Base64...',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Decomprimi',
};

export default definition;


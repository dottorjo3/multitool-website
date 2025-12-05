// 🔧 File: frontend/src/tools/text-split-by-length/index.jsx
// 🔗 NeoPanze — Split by Length

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-3'>
          Parti create: <span className='text-indigo-600'>{result.count}</span>
        </p>
        <div className='bg-white p-4 rounded border border-indigo-200 max-h-96 overflow-y-auto'>
          <pre className='text-slate-900 whitespace-pre-wrap break-words font-mono text-xs'>
            {result.formatted}
          </pre>
        </div>
        <div className='mt-3 text-xs text-indigo-700'>
          <p>Lunghezza per parte: <span className='font-semibold'>{result.length} caratteri</span></p>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-split-by-length',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da suddividere',
      placeholder: 'Inserisci il testo...',
      rows: 8,
      required: true,
    },
    {
      type: 'text',
      name: 'length',
      label: 'Lunghezza per parte',
      placeholder: '100',
      defaultValue: '100',
    },
  ],
  ResultView,
  ctaLabel: 'Suddividi',
};

export default definition;


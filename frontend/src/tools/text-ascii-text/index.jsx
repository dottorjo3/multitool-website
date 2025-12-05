// 🔧 File: frontend/src/tools/text-ascii-text/index.jsx
// 🔗 NeoPanze — ASCII Text

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Testo ASCII:</p>
        <div className='bg-slate-900 text-slate-50 p-4 rounded border border-indigo-200'>
          <pre className='font-mono text-xs whitespace-pre-wrap break-words'>
            {result.ascii}
          </pre>
        </div>
        <p className='mt-3 text-xs text-indigo-700'>
          Lunghezza: <span className='font-semibold'>{result.length} caratteri</span>
        </p>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-ascii-text',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da convertire',
      placeholder: 'Inserisci il testo da convertire in ASCII...',
      rows: 6,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Converti in ASCII',
};

export default definition;


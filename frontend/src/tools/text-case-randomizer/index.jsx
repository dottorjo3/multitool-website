// 🔧 File: frontend/src/tools/text-case-randomizer/index.jsx
// 🔗 NeoPanze — Case Randomizer

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Testo con case randomizzato:</p>
        <div className='bg-white p-4 rounded border border-indigo-200'>
          <p className='font-mono text-slate-900 whitespace-pre-wrap break-words'>
            {result.randomized}
          </p>
        </div>
        <p className='mt-3 text-xs text-indigo-700'>
          Lunghezza: <span className='font-semibold'>{result.length} caratteri</span>
        </p>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-case-randomizer',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da randomizzare',
      placeholder: 'Inserisci il testo di cui vuoi randomizzare maiuscole/minuscole...',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Randomizza case',
};

export default definition;


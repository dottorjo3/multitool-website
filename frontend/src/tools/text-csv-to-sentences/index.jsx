// 🔧 File: frontend/src/tools/text-csv-to-sentences/index.jsx
// 🔗 NeoPanze — CSV to Sentences

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Frasi generate:</p>
        <div className='bg-white p-4 rounded border border-indigo-200'>
          <pre className='text-slate-900 whitespace-pre-wrap break-words'>
            {result.sentences}
          </pre>
        </div>
        <div className='mt-3 text-xs text-indigo-700'>
          <p>Frasi create: <span className='font-semibold'>{result.count}</span></p>
          <p>Record CSV: <span className='font-semibold'>{result.records}</span></p>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-csv-to-sentences',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'CSV da convertire',
      placeholder: 'Inserisci il CSV...',
      rows: 8,
      required: true,
    },
    {
      type: 'text',
      name: 'separator',
      label: 'Separatore',
      placeholder: ',',
      defaultValue: ',',
    },
  ],
  ResultView,
  ctaLabel: 'Converti in frasi',
};

export default definition;


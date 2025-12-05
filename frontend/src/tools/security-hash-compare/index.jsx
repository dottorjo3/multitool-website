// 🔧 File: frontend/src/tools/security-hash-compare/index.jsx
// 🔗 NeoPanze — Hash Compare

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className={result.isEqual 
      ? 'p-4 bg-green-50 border border-green-200 rounded-lg'
      : 'p-4 bg-red-50 border border-red-200 rounded-lg'
    }>
      <p className={`font-semibold text-${result.isEqual ? 'green' : 'red'}-900 mb-2 text-lg`}>
        {result.message}
      </p>
      <p className='text-sm text-slate-600'>
        I due hash {result.isEqual ? 'corrispondono' : 'non corrispondono'}.
      </p>
    </div>
  );
}

const definition = {
  id: 'security-hash-compare',
  fields: [
    {
      type: 'textarea',
      name: 'hash1',
      label: 'Primo Hash',
      placeholder: 'Inserisci il primo hash...',
      rows: 3,
      required: true,
    },
    {
      type: 'textarea',
      name: 'hash2',
      label: 'Secondo Hash',
      placeholder: 'Inserisci il secondo hash...',
      rows: 3,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Confronta Hash',
};

export default definition;



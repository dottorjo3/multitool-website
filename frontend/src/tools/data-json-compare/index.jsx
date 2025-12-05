// 🔧 File: frontend/src/tools/data-json-compare/index.jsx
// 🔗 NeoPanze — JSON Compare

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4'>
      {result.isEqual ? (
        <div className='p-4 bg-green-50 border border-green-200 rounded-lg'>
          <p className='font-semibold text-green-900'>✓ I JSON sono identici</p>
        </div>
      ) : (
        <div className='p-4 bg-red-50 border border-red-200 rounded-lg'>
          <p className='font-semibold text-red-900 mb-2'>✗ I JSON sono diversi</p>
          <p className='text-sm text-red-700 mb-3'>Trovate {result.hasDifferences ? 'differenze' : 'nessuna differenza strutturale'}</p>
          {result.differences && (
            <div>
              <p className='text-xs font-semibold text-red-800 mb-1'>Differenze:</p>
              <pre className='bg-red-100 text-red-900 text-xs rounded p-3 overflow-auto max-h-64'>
                {result.differences}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const definition = {
  id: 'data-json-compare',
  fields: [
    {
      type: 'textarea',
      name: 'json1',
      label: 'Primo JSON',
      placeholder: '{"name": "Alice", "age": 25}',
      rows: 8,
      required: true,
    },
    {
      type: 'textarea',
      name: 'json2',
      label: 'Secondo JSON',
      placeholder: '{"name": "Bob", "age": 30}',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Confronta JSON',
};

export default definition;



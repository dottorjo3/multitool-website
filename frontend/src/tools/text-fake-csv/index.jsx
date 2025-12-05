// 🔧 File: frontend/src/tools/text-fake-csv/index.jsx
// 🔗 NeoPanze — Fake CSV

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>CSV generato:</p>
        <div className='bg-slate-900 text-slate-50 p-4 rounded border border-indigo-200 overflow-x-auto'>
          <pre className='font-mono text-xs whitespace-pre-wrap break-words'>
            {result.csv}
          </pre>
        </div>
        <div className='mt-3 grid grid-cols-3 gap-4 text-xs text-indigo-700'>
          <div>
            <p>Righe: <span className='font-semibold'>{result.rows}</span></p>
          </div>
          <div>
            <p>Colonne: <span className='font-semibold'>{result.columns}</span></p>
          </div>
          <div>
            <p>Headers: <span className='font-semibold'>{result.headers ? 'Sì' : 'No'}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-fake-csv',
  fields: [
    {
      type: 'text',
      name: 'rows',
      label: 'Numero di righe',
      placeholder: '5',
      defaultValue: '5',
    },
    {
      type: 'text',
      name: 'columns',
      label: 'Numero di colonne',
      placeholder: '3',
      defaultValue: '3',
    },
    {
      type: 'checkbox',
      name: 'headers',
      label: 'Includi intestazioni',
      defaultValue: 'true',
    },
  ],
  ResultView,
  ctaLabel: 'Genera CSV',
};

export default definition;


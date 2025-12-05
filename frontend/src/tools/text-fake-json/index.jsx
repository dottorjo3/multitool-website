// 🔧 File: frontend/src/tools/text-fake-json/index.jsx
// 🔗 NeoPanze — Fake JSON

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>JSON generato:</p>
        <div className='bg-slate-900 text-slate-50 p-4 rounded border border-indigo-200 overflow-x-auto'>
          <pre className='font-mono text-xs whitespace-pre-wrap break-words'>
            {result.json}
          </pre>
        </div>
        <div className='mt-3 flex gap-4 text-xs text-indigo-700'>
          <span>Tipo: <span className='font-semibold'>{result.type}</span></span>
          <span>Profondità: <span className='font-semibold'>{result.depth}</span></span>
          <span>Lunghezza: <span className='font-semibold'>{result.length} caratteri</span></span>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-fake-json',
  fields: [
    {
      type: 'select',
      name: 'type',
      label: 'Tipo JSON',
      options: [
        { value: 'object', label: 'Oggetto' },
        { value: 'array', label: 'Array' },
      ],
      defaultValue: 'object',
    },
    {
      type: 'select',
      name: 'depth',
      label: 'Profondità',
      options: [
        { value: '1', label: '1 (piatto)' },
        { value: '2', label: '2 (medio)' },
        { value: '3', label: '3 (profondo)' },
        { value: '4', label: '4 (molto profondo)' },
        { value: '5', label: '5 (massimo)' },
      ],
      defaultValue: '2',
    },
    {
      type: 'checkbox',
      name: 'pretty',
      label: 'Formattato (pretty print)',
      defaultValue: 'false',
    },
  ],
  ResultView,
  ctaLabel: 'Genera JSON',
};

export default definition;


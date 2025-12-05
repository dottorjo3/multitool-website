// 🔧 File: frontend/src/tools/text-csv-to-markdown-table/index.jsx
// 🔗 NeoPanze — CSV to Markdown Table

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Tabella Markdown:</p>
        <div className='bg-slate-900 text-slate-50 p-4 rounded border border-indigo-200 overflow-x-auto'>
          <pre className='font-mono text-xs whitespace-pre-wrap break-words'>
            {result.markdown}
          </pre>
        </div>
        <div className='mt-3 flex gap-4 text-xs text-indigo-700'>
          <span>Righe: <span className='font-semibold'>{result.rows}</span></span>
          <span>Colonne: <span className='font-semibold'>{result.columns}</span></span>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-csv-to-markdown-table',
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
  ctaLabel: 'Converti in Markdown',
};

export default definition;


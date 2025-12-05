// 🔧 File: frontend/src/tools/text-csv-to-json-schema/index.jsx
// 🔗 NeoPanze — CSV to JSON Schema

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>JSON Schema generato:</p>
        <div className='bg-slate-900 text-slate-50 p-4 rounded border border-indigo-200 overflow-x-auto'>
          <pre className='font-mono text-xs whitespace-pre-wrap break-words'>
            {result.schema}
          </pre>
        </div>
        <div className='mt-3 text-xs text-indigo-700'>
          <p>Record: <span className='font-semibold'>{result.records}</span></p>
          <p>Proprietà: <span className='font-semibold'>{result.properties.join(', ')}</span></p>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-csv-to-json-schema',
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
  ctaLabel: 'Genera Schema',
};

export default definition;


// 🔧 File: frontend/src/tools/data-csv-transpose/index.jsx
// 🔗 NeoPanze — CSV Transpose

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.transposed) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.transposed);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          Originale: {result.originalRows} righe × {result.originalColumns} colonne • 
          Trasposto: {result.originalColumns} righe × {result.originalRows} colonne
        </p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia CSV'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96'>
        {result.transposed}
      </pre>
    </div>
  );
}

const definition = {
  id: 'data-csv-transpose',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'CSV da trasporre',
      placeholder: 'name,age\nAlice,25\nBob,30',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'delimiter',
      label: 'Delimitatore',
      defaultValue: ',',
    },
  ],
  ResultView,
  ctaLabel: 'Traspone CSV',
};

export default definition;



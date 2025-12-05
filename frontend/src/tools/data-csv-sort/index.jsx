// 🔧 File: frontend/src/tools/data-csv-sort/index.jsx
// 🔗 NeoPanze — CSV Sort

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.sorted) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.sorted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          Ordinato per: <span className='font-semibold'>{result.column}</span> ({result.order === 'asc' ? 'Crescente' : 'Decrescente'}) • Righe: {result.rows}
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
        {result.sorted}
      </pre>
    </div>
  );
}

const definition = {
  id: 'data-csv-sort',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'CSV da ordinare',
      placeholder: 'name,age\nAlice,25\nBob,30',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'column',
      label: 'Colonna per ordinamento',
      placeholder: 'age',
      required: true,
    },
    {
      type: 'select',
      name: 'order',
      label: 'Ordinamento',
      options: [
        { value: 'asc', label: 'Crescente (A-Z, 0-9)' },
        { value: 'desc', label: 'Decrescente (Z-A, 9-0)' },
      ],
      defaultValue: 'asc',
    },
    {
      type: 'text',
      name: 'delimiter',
      label: 'Delimitatore',
      defaultValue: ',',
      helperText: 'Usa ; per CSV esportati da Excel europeo',
    },
  ],
  ResultView,
  ctaLabel: 'Ordina CSV',
};

export default definition;



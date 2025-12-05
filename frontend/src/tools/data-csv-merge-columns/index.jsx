// 🔧 File: frontend/src/tools/data-csv-merge-columns/index.jsx
// 🔗 NeoPanze — CSV Merge Columns

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.modified) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.modified);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          Colonne unite: <span className='font-semibold'>{result.columnsMerged?.join(', ')}</span> → 
          <span className='font-semibold'> {result.newColumnName}</span> • Righe: {result.rows}
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
        {result.modified}
      </pre>
    </div>
  );
}

const definition = {
  id: 'data-csv-merge-columns',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'CSV da modificare',
      placeholder: 'first,last\nJohn,Doe\nJane,Smith',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'columns',
      label: 'Colonne da unire',
      placeholder: 'first,last',
      required: true,
      helperText: 'Separate da virgola',
    },
    {
      type: 'text',
      name: 'newColumnName',
      label: 'Nome nuova colonna',
      placeholder: 'full_name',
      defaultValue: 'merged',
    },
    {
      type: 'text',
      name: 'separator',
      label: 'Separatore',
      defaultValue: ' ',
      helperText: 'Carattere per unire i valori (default: spazio)',
    },
    {
      type: 'checkbox',
      name: 'removeOriginal',
      label: 'Rimuovi colonne originali',
      defaultValue: 'false',
    },
    {
      type: 'text',
      name: 'delimiter',
      label: 'Delimitatore',
      defaultValue: ',',
    },
  ],
  ResultView,
  ctaLabel: 'Unisci Colonne',
};

export default definition;



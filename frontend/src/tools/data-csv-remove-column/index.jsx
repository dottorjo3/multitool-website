// 🔧 File: frontend/src/tools/data-csv-remove-column/index.jsx
// 🔗 NeoPanze — CSV Remove Column

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
          Colonna rimossa: <span className='font-semibold text-red-600'>{result.columnRemoved}</span> • 
          Righe: {result.rows}
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
  id: 'data-csv-remove-column',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'CSV da modificare',
      placeholder: 'name,age,city\nAlice,25,Rome\nBob,30,Milan',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'columnName',
      label: 'Colonna da rimuovere',
      placeholder: 'city',
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
  ctaLabel: 'Rimuovi Colonna',
};

export default definition;



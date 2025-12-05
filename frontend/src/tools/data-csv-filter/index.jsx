// 🔧 File: frontend/src/tools/data-csv-filter/index.jsx
// 🔗 NeoPanze — CSV Filter

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.filtered) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.filtered);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          Filtro: <span className='font-semibold'>{result.column}</span> {result.operator} "{result.value}" • 
          Righe originali: {result.originalRows} • Righe filtrate: {result.filteredRows}
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
        {result.filtered}
      </pre>
    </div>
  );
}

const definition = {
  id: 'data-csv-filter',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'CSV da filtrare',
      placeholder: 'name,age\nAlice,25\nBob,30',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'column',
      label: 'Colonna da filtrare',
      placeholder: 'age',
      required: true,
    },
    {
      type: 'select',
      name: 'operator',
      label: 'Operatore',
      options: [
        { value: 'equals', label: 'Uguale a' },
        { value: 'contains', label: 'Contiene' },
        { value: 'greater', label: 'Maggiore di' },
        { value: 'less', label: 'Minore di' },
        { value: 'startsWith', label: 'Inizia con' },
        { value: 'endsWith', label: 'Finisce con' },
      ],
      defaultValue: 'equals',
    },
    {
      type: 'text',
      name: 'value',
      label: 'Valore',
      placeholder: '25',
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
  ctaLabel: 'Filtra CSV',
};

export default definition;



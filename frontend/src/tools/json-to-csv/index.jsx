// 🔧 File: frontend/src/tools/json-to-csv/index.jsx
// 🔗 Farm Ready — UI conversione JSON → CSV

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.csv) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.csv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>
        Colonne: {result.columns} • Righe: {result.rows}
      </p>
      <div className='flex justify-end'>
        <button
          type='button'
          onClick={handleCopy}
          className='px-3 py-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition'
        >
          {copied ? 'Copiato!' : 'Copia CSV'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-100 rounded-lg p-4 text-sm overflow-auto max-h-80'>
        {result.csv}
      </pre>
    </div>
  );
}

const definition = {
  id: 'json-to-csv',
  fields: [
    {
      type: 'textarea',
      name: 'json',
      label: 'Array JSON di origine',
      placeholder: '[{"name":"Alice","email":"alice@example.com"}]',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'delimiter',
      label: 'Delimitatore',
      defaultValue: ',',
      helperText: 'Usa ; per CSV compatibili con Excel italiano',
    },
  ],
  ResultView,
  ctaLabel: 'Converti in CSV',
};

export default definition;



// 🔧 File: frontend/src/tools/data-json-sort-keys/index.jsx
// 🔗 NeoPanze — JSON Sort Keys

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
          Modalità: {result.recursive ? 'Ricorsivo' : 'Solo primo livello'}
        </p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia JSON'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96'>
        {result.sorted}
      </pre>
    </div>
  );
}

const definition = {
  id: 'data-json-sort-keys',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'JSON da ordinare',
      placeholder: '{"zebra": 1, "alpha": 2, "beta": 3}',
      rows: 10,
      required: true,
    },
    {
      type: 'checkbox',
      name: 'recursive',
      label: 'Ordinamento ricorsivo',
      defaultValue: 'true',
      helperText: 'Ordina anche le chiavi degli oggetti annidati',
    },
  ],
  ResultView,
  ctaLabel: 'Ordina Chiavi',
};

export default definition;



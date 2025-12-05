// 🔧 File: frontend/src/tools/data-json-remove-keys/index.jsx
// 🔗 NeoPanze — JSON Remove Keys

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.cleaned) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.cleaned);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          Chiavi rimosse: <span className='font-semibold'>{result.keysRemoved.join(', ')}</span>
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
        {result.cleaned}
      </pre>
    </div>
  );
}

const definition = {
  id: 'data-json-remove-keys',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'JSON da modificare',
      placeholder: '{"name": "Alice", "age": 25, "temp": "remove"}',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'keys',
      label: 'Chiavi da rimuovere',
      placeholder: 'temp,debug,test',
      required: true,
      helperText: 'Separate da virgola',
    },
    {
      type: 'checkbox',
      name: 'recursive',
      label: 'Rimozione ricorsiva',
      defaultValue: 'true',
      helperText: 'Rimuove anche da oggetti annidati',
    },
  ],
  ResultView,
  ctaLabel: 'Rimuovi Chiavi',
};

export default definition;



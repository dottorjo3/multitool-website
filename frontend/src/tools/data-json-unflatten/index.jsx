// 🔧 File: frontend/src/tools/data-json-unflatten/index.jsx
// 🔗 NeoPanze — JSON Unflatten

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.unflattened) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.unflattened);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          Chiavi ricostruite: <span className='font-semibold'>{result.keyCount}</span> • 
          Delimitatore: <span className='font-mono'>{result.delimiter}</span>
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
        {result.unflattened}
      </pre>
    </div>
  );
}

const definition = {
  id: 'data-json-unflatten',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'JSON appiattito',
      placeholder: '{"user.name": "Alice", "user.age": 25}',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'delimiter',
      label: 'Delimitatore',
      defaultValue: '.',
      helperText: 'Carattere usato per separare i livelli (deve corrispondere al JSON appiattito)',
    },
  ],
  ResultView,
  ctaLabel: 'Ricostruisci JSON',
};

export default definition;



// 🔧 File: frontend/src/tools/data-json-transform/index.jsx
// 🔗 NeoPanze — JSON Transform

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.transformed) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.transformed);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          Trasformazione: <span className='font-semibold'>{result.transformType}</span>
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
        {result.transformed}
      </pre>
    </div>
  );
}

const definition = {
  id: 'data-json-transform',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'JSON da trasformare',
      placeholder: '[1, 2, 3, 4, 5] o {"name": "alice", "age": 25}',
      rows: 10,
      required: true,
    },
    {
      type: 'select',
      name: 'transformType',
      label: 'Tipo trasformazione',
      options: [
        { value: 'reverse-array', label: 'Inverti array' },
        { value: 'uppercase-keys', label: 'Maiuscole alle chiavi' },
        { value: 'lowercase-keys', label: 'Minuscole alle chiavi' },
      ],
      defaultValue: 'reverse-array',
    },
  ],
  ResultView,
  ctaLabel: 'Trasforma JSON',
};

export default definition;



// 🔧 File: frontend/src/tools/data-json-path-extractor/index.jsx
// 🔗 NeoPanze — JSON Path Extractor

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.extracted) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.extracted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          Percorso: <span className='font-mono font-semibold'>{result.path}</span> • 
          Valori trovati: <span className='font-semibold'>{result.count}</span>
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
        {result.extracted}
      </pre>
    </div>
  );
}

const definition = {
  id: 'data-json-path-extractor',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'JSON da analizzare',
      placeholder: '{"users": [{"name": "Alice"}]}',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'path',
      label: 'JSONPath',
      placeholder: '$.users[*].name',
      defaultValue: '$.*',
      helperText: 'Esempi: $.users[*].name, $..price, $.store.book[*].author',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Estrai Valori',
};

export default definition;



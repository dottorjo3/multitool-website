// 🔧 File: frontend/src/tools/data-json-merge/index.jsx
// 🔗 NeoPanze — JSON Merge

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.merged) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.merged);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          Strategia: <span className='font-semibold'>{result.mergeStrategy}</span>
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
        {result.merged}
      </pre>
    </div>
  );
}

const definition = {
  id: 'data-json-merge',
  fields: [
    {
      type: 'textarea',
      name: 'json1',
      label: 'Primo JSON',
      placeholder: '{"name": "Alice", "age": 25}',
      rows: 8,
      required: true,
    },
    {
      type: 'textarea',
      name: 'json2',
      label: 'Secondo JSON',
      placeholder: '{"age": 30, "city": "Rome"}',
      rows: 8,
      required: true,
    },
    {
      type: 'select',
      name: 'mergeStrategy',
      label: 'Strategia di unione',
      options: [
        { value: 'deep', label: 'Deep Merge (ricorsivo)' },
        { value: 'shallow', label: 'Shallow Merge (superficiale)' },
        { value: 'replace', label: 'Replace (sostituisce tutto)' },
      ],
      defaultValue: 'deep',
      helperText: 'Deep: unisce oggetti annidati. Shallow: unisce solo primo livello. Replace: sostituisce completamente.',
    },
  ],
  ResultView,
  ctaLabel: 'Unisci JSON',
};

export default definition;



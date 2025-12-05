// 🔧 File: frontend/src/tools/data-json-to-yaml/index.jsx
// 🔗 NeoPanze — JSON to YAML

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.yaml) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.yaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          JSON: {result.jsonLength} caratteri → YAML: {result.yamlLength} caratteri
        </p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia YAML'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96'>
        {result.yaml}
      </pre>
    </div>
  );
}

const definition = {
  id: 'data-json-to-yaml',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'JSON da convertire',
      placeholder: '{"name": "Alice", "age": 25}',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'indent',
      label: 'Indentazione',
      defaultValue: '2',
      helperText: 'Numero di spazi per indentazione (default: 2)',
    },
  ],
  ResultView,
  ctaLabel: 'Converti a YAML',
};

export default definition;



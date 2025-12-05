// 🔧 File: frontend/src/tools/data-yaml-to-json/index.jsx
// 🔗 NeoPanze — YAML to JSON

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.json) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          YAML: {result.yamlLength} caratteri → JSON: {result.jsonLength} caratteri
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
        {result.json}
      </pre>
    </div>
  );
}

const definition = {
  id: 'data-yaml-to-json',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'YAML da convertire',
      placeholder: 'name: Alice\nage: 25\ncity: Rome',
      rows: 10,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Converti a JSON',
};

export default definition;



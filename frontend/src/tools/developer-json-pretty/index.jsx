// 🔧 File: frontend/src/tools/developer-json-pretty/index.jsx
// 🔗 NeoPanze — JSON Pretty Printer

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.formatted) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <button
        type='button'
        onClick={handleCopy}
        className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
      >
        {copied ? 'Copiato!' : 'Copia JSON'}
      </button>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96'>
        {result.formatted}
      </pre>
    </div>
  );
}

const definition = {
  id: 'developer-json-pretty',
  fields: [
    {
      type: 'textarea',
      name: 'json',
      label: 'JSON',
      placeholder: '{"name":"Bibble", "tools":94}',
      rows: 8,
      required: true,
    },
    {
      type: 'number',
      name: 'spaces',
      label: 'Indentazione (spazi)',
      defaultValue: 2,
      min: 0,
      max: 10,
    },
  ],
  ResultView,
  ctaLabel: 'Formatta JSON',
};

export default definition;



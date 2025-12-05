// 🔧 File: frontend/src/tools/developer-sql-formatter/index.jsx
// 🔗 NeoPanze — SQL Formatter

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
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          Keyword case: {result.keywordCase} • Indentazione: {result.indentSize} spazi
        </p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia SQL'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96'>
        {result.formatted}
      </pre>
    </div>
  );
}

const definition = {
  id: 'developer-sql-formatter',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Query SQL',
      placeholder: 'SELECT * FROM users WHERE id = 1',
      rows: 10,
      required: true,
    },
    {
      type: 'select',
      name: 'keywordCase',
      label: 'Keyword Case',
      options: [
        { value: 'upper', label: 'UPPERCASE' },
        { value: 'lower', label: 'lowercase' },
        { value: 'preserve', label: 'Preserve' },
      ],
      defaultValue: 'upper',
    },
    {
      type: 'text',
      name: 'indentSize',
      label: 'Indentazione (spazi)',
      placeholder: '2',
      defaultValue: '2',
    },
  ],
  ResultView,
  ctaLabel: 'Formatta SQL',
};

export default definition;



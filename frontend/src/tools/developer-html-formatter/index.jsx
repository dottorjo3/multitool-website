// 🔧 File: frontend/src/tools/developer-html-formatter/index.jsx
// 🔗 NeoPanze — HTML Formatter

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
          Indentazione: {result.indentSize} spazi • Lunghezza: {result.formattedLength} caratteri
        </p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia HTML'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96'>
        {result.formatted}
      </pre>
    </div>
  );
}

const definition = {
  id: 'developer-html-formatter',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Codice HTML',
      placeholder: '<div><p>Hello World</p></div>',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'indentSize',
      label: 'Indentazione (spazi)',
      placeholder: '2',
      defaultValue: '2',
    },
    {
      type: 'select',
      name: 'wrapAttributes',
      label: 'Wrap attributi',
      options: [
        { value: 'auto', label: 'Auto' },
        { value: 'force', label: 'Force' },
        { value: 'force-aligned', label: 'Force Aligned' },
      ],
      defaultValue: 'auto',
    },
  ],
  ResultView,
  ctaLabel: 'Formatta HTML',
};

export default definition;



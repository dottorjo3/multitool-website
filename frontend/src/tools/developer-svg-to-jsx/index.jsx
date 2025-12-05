// 🔧 File: frontend/src/tools/developer-svg-to-jsx/index.jsx
// 🔗 NeoPanze — SVG to JSX

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.jsx) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.jsx);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          Componente: <span className='font-semibold'>{result.componentName}</span>
        </p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia JSX'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96'>
        {result.jsx}
      </pre>
    </div>
  );
}

const definition = {
  id: 'developer-svg-to-jsx',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Codice SVG',
      placeholder: '<svg>...</svg>',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'componentName',
      label: 'Nome Componente',
      placeholder: 'SvgComponent',
      defaultValue: 'SvgComponent',
    },
  ],
  ResultView,
  ctaLabel: 'Converti a JSX',
};

export default definition;



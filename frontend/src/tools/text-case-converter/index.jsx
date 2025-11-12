// 🔧 File: frontend/src/tools/text-case-converter/index.jsx
// 🔗 Farm Ready — UI conversione maiuscole/minuscole

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.output) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>Modalità: {result.mode}</p>
      <button
        type='button'
        onClick={handleCopy}
        className='px-3 py-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition'
      >
        {copied ? 'Copiato!' : 'Copia'}
      </button>
      <textarea
        readOnly
        value={result.output}
        className='w-full h-48 bg-slate-900 text-slate-100 rounded-lg p-3 text-sm'
      />
    </div>
  );
}

const definition = {
  id: 'text-case-converter',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo da convertire',
      rows: 8,
      required: true,
    },
    {
      type: 'select',
      name: 'mode',
      label: 'Modalità di conversione',
      defaultValue: 'upper',
      options: [
        { value: 'upper', label: 'MAIUSCOLO' },
        { value: 'lower', label: 'minuscolo' },
        { value: 'title', label: 'Title Case' },
        { value: 'sentence', label: 'Sentence case' },
      ],
    },
  ],
  ResultView,
  ctaLabel: 'Converti testo',
};

export default definition;



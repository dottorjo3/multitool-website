// 🔧 File: frontend/src/tools/url-decode/index.jsx
// 🔗 Farm Ready — UI decodifica URL

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
      <p className='text-sm text-slate-600'>Converti + in spazi: {result.plusAsSpace ? 'sì' : 'no'}</p>
      <div className='flex justify-end'>
        <button
          type='button'
          onClick={handleCopy}
          className='px-3 py-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition'
        >
          {copied ? 'Copiato!' : 'Copia'}
        </button>
      </div>
      <textarea
        readOnly
        value={result.output}
        className='w-full h-32 bg-slate-900 text-slate-100 rounded-lg p-3 text-sm'
      />
    </div>
  );
}

const definition = {
  id: 'url-decode',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Stringa codificata',
      rows: 5,
      required: true,
    },
    {
      type: 'checkbox',
      name: 'plusAsSpace',
      label: 'Converti + in spazi',
      helperText: 'Utile per query string legacy',
      defaultValue: 'true',
    },
  ],
  ResultView,
  ctaLabel: 'Decodifica URL',
};

export default definition;



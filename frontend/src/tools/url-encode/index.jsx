// 🔧 File: frontend/src/tools/url-encode/index.jsx
// 🔗 Farm Ready — UI codifica URL

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
      <p className='text-sm text-slate-600'>Spazi codificati come +: {result.encodeSpaces ? 'sì' : 'no'}</p>
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
  id: 'url-encode',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo o URL da codificare',
      rows: 5,
      required: true,
    },
    {
      type: 'checkbox',
      name: 'encodeSpaces',
      label: 'Usa + per gli spazi',
      helperText: 'Compatibile con application/x-www-form-urlencoded',
      defaultValue: 'false',
    },
  ],
  ResultView,
  ctaLabel: 'Codifica URL',
};

export default definition;



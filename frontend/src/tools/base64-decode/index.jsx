// 🔧 File: frontend/src/tools/base64-decode/index.jsx
// 🔗 Farm Ready — UI decodifica Base64

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
      <p className='text-sm text-slate-600'>
        Lunghezza testo: {result.length} • URL Safe: {result.urlSafe ? 'sì' : 'no'}
      </p>
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
        className='w-full h-40 bg-slate-900 text-slate-100 rounded-lg p-3 text-sm'
      />
    </div>
  );
}

const definition = {
  id: 'base64-decode',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Base64 da decodificare',
      placeholder: 'Incolla la stringa Base64...',
      rows: 8,
      required: true,
    },
    {
      type: 'checkbox',
      name: 'urlSafe',
      label: 'Modalità URL-safe',
      helperText: 'Sostituisce -_ con +/ e ripristina padding',
      defaultValue: 'false',
    },
  ],
  ResultView,
  ctaLabel: 'Decodifica Base64',
};

export default definition;



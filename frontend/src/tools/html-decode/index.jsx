// 🔧 File: frontend/src/tools/html-decode/index.jsx
// 🔗 Farm Ready — UI decode entità HTML

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
  id: 'html-decode',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo con entità HTML',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Decodifica entità',
};

export default definition;



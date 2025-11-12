// 🔧 File: frontend/src/tools/md5-hash/index.jsx
// 🔗 Farm Ready — UI hash MD5

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
    <div className='space-y-2'>
      <p className='text-sm text-slate-600'>
        Algoritmo: {result.algorithm.toUpperCase()} • Lunghezza: {result.length} caratteri
      </p>
      <div className='flex justify-end'>
        <button
          type='button'
          onClick={handleCopy}
          className='px-3 py-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition'
        >
          {copied ? 'Copiato!' : 'Copia hash'}
        </button>
      </div>
      <code className='block rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-mono'>
        {result.output}
      </code>
    </div>
  );
}

const definition = {
  id: 'md5-hash',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo di input',
      rows: 5,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Genera hash MD5',
};

export default definition;



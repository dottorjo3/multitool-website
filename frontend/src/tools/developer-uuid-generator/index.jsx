// 🔧 File: frontend/src/tools/developer-uuid-generator/index.jsx
// 🔗 NeoPanze — UUID Generator

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.uuids) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.uuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>
          UUID generati: {result.count}
        </p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-sm font-semibold text-indigo-600 hover:text-indigo-700'
        >
          {copied ? 'Copiato!' : 'Copia tutti'}
        </button>
      </div>
      <div className='bg-slate-900 text-slate-50 text-sm rounded-lg p-4 space-y-1'>
        {result.uuids.map((uuid) => (
          <div key={uuid}>{uuid}</div>
        ))}
      </div>
    </div>
  );
}

const definition = {
  id: 'developer-uuid-generator',
  fields: [
    {
      type: 'number',
      name: 'count',
      label: 'Numero di UUID',
      defaultValue: 5,
      min: 1,
      max: 100,
      helperText: 'Valore compreso tra 1 e 100',
    },
  ],
  ResultView,
  ctaLabel: 'Genera UUID',
};

export default definition;



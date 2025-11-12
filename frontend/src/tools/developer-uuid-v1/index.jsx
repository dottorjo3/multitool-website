// 🔧 File: frontend/src/tools/developer-uuid-v1/index.jsx
// 🔗 NeoPanze — UUID v1 Generator

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
    <div className='space-y-3 text-sm text-slate-600'>
      <p>
        Generati {result.count} UUID {result.version.toUpperCase()}
      </p>
      <button
        type='button'
        onClick={handleCopy}
        className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
      >
        {copied ? 'Copiati!' : 'Copia tutti'}
      </button>
      <div className='bg-slate-900 text-slate-50 font-mono text-xs rounded-lg p-4 space-y-1 max-h-64 overflow-auto'>
        {result.uuids.map((uuid) => (
          <div key={uuid}>{uuid}</div>
        ))}
      </div>
    </div>
  );
}

const definition = {
  id: 'developer-uuid-v1',
  fields: [
    {
      type: 'number',
      name: 'count',
      label: 'Numero di UUID',
      defaultValue: 5,
      min: 1,
      max: 100,
    },
  ],
  ResultView,
  ctaLabel: 'Genera UUID v1',
};

export default definition;



// 🔧 File: frontend/src/tools/lorem-ipsum/index.jsx
// 🔗 Farm Ready — UI generatore Lorem Ipsum

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
        Paragrafi: {result.paragraphs} • Frasi per paragrafo: {result.sentences}
      </p>
      <button
        type='button'
        onClick={handleCopy}
        className='px-3 py-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition'
      >
        {copied ? 'Copiato!' : 'Copia testo'}
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
  id: 'lorem-ipsum',
  fields: [
    {
      type: 'number',
      name: 'paragraphs',
      label: 'Numero di paragrafi',
      defaultValue: 3,
      min: 1,
      max: 10,
    },
    {
      type: 'number',
      name: 'sentences',
      label: 'Frasi per paragrafo',
      defaultValue: 3,
      min: 1,
      max: 5,
    },
  ],
  ResultView,
  ctaLabel: 'Genera Lorem Ipsum',
};

export default definition;



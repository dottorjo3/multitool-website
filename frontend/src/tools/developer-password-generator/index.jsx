// 🔧 File: frontend/src/tools/developer-password-generator/index.jsx
// 🔗 NeoPanze — Password Generator

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!result?.passwords) {
    return null;
  }

  const handleCopy = async (password, index) => {
    await navigator.clipboard.writeText(password);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>
        Password generate: {result.count} • Lunghezza: {result.length}
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        {result.passwords.map((pwd, index) => (
          <div key={`${pwd}-${index}`} className='bg-slate-900 text-slate-50 p-3 rounded-xl flex items-center justify-between'>
            <code className='font-mono text-sm break-all'>{pwd}</code>
            <button
              type='button'
              onClick={() => handleCopy(pwd, index)}
              className='ml-3 text-xs font-semibold text-emerald-300 hover:text-emerald-200'
            >
              {copiedIndex === index ? 'Copiato!' : 'Copia'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const definition = {
  id: 'developer-password-generator',
  fields: [
    {
      type: 'number',
      name: 'length',
      label: 'Lunghezza',
      defaultValue: 12,
      min: 4,
      max: 128,
    },
    {
      type: 'number',
      name: 'count',
      label: 'Quante password',
      defaultValue: 5,
      min: 1,
      max: 50,
    },
    {
      type: 'checkbox',
      name: 'uppercase',
      label: 'Includi maiuscole (A-Z)',
      defaultValue: 'true',
    },
    {
      type: 'checkbox',
      name: 'lowercase',
      label: 'Includi minuscole (a-z)',
      defaultValue: 'true',
    },
    {
      type: 'checkbox',
      name: 'digits',
      label: 'Includi numeri (0-9)',
      defaultValue: 'true',
    },
    {
      type: 'checkbox',
      name: 'symbols',
      label: 'Includi simboli (!@#$...)',
      defaultValue: 'false',
    },
  ],
  ResultView,
  ctaLabel: 'Genera password',
};

export default definition;



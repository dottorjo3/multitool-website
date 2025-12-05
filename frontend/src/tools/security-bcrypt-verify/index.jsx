// 🔧 File: frontend/src/tools/security-bcrypt-verify/index.jsx
// 🔗 NeoPanze — bcrypt Verify

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className={result.isValid 
      ? 'p-4 bg-green-50 border border-green-200 rounded-lg'
      : 'p-4 bg-red-50 border border-red-200 rounded-lg'
    }>
      <p className={`font-semibold text-${result.isValid ? 'green' : 'red'}-900 mb-2`}>
        {result.message}
      </p>
      <p className='text-sm text-slate-600'>
        Algoritmo: <span className='font-mono'>{result.algorithm}</span>
      </p>
    </div>
  );
}

const definition = {
  id: 'security-bcrypt-verify',
  fields: [
    {
      type: 'password',
      name: 'password',
      label: 'Password',
      placeholder: 'Inserisci la password',
      required: true,
    },
    {
      type: 'textarea',
      name: 'hash',
      label: 'Hash bcrypt',
      placeholder: '$2b$10$...',
      rows: 3,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Verifica Password',
};

export default definition;



// 🔧 File: frontend/src/tools/text-palindrome/index.jsx
// 🔗 NeoPanze — Palindrome checker

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <p className='text-sm text-slate-600'>
        Ignora spazi: {result.ignoreSpaces ? 'Sì' : 'No'} • Ignora maiuscole: {result.ignoreCase ? 'Sì' : 'No'}
      </p>
      <div className={`p-3 rounded-lg ${result.overallPalindrome ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
        {result.overallPalindrome ? 'Il testo complessivo è un palindromo.' : 'Il testo complessivo NON è un palindromo.'}
      </div>
      <div className='space-y-2'>
        {result.items.map((item) => (
          <div key={item.original} className='border border-slate-200 rounded-lg p-3'>
            <p className='font-semibold text-slate-700'>{item.original}</p>
            <p className='text-xs text-slate-500'>Normalizzato: {item.normalized || '(stringa vuota)'}</p>
            <p className={`mt-1 text-sm font-semibold ${item.isPalindrome ? 'text-emerald-600' : 'text-amber-600'}`}>
              {item.isPalindrome ? 'Palindromo' : 'Non palindromo'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const definition = {
  id: 'text-palindrome',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Parola o frase (una per riga)',
      placeholder: 'Anna\nI topi non avevano nipoti',
      rows: 8,
      required: true,
    },
    {
      type: 'checkbox',
      name: 'ignoreSpaces',
      label: 'Ignora spazi e punteggiatura',
      defaultValue: 'true',
    },
    {
      type: 'checkbox',
      name: 'ignoreCase',
      label: 'Ignora differenza tra maiuscole e minuscole',
      defaultValue: 'true',
    },
  ],
  ResultView,
  ctaLabel: 'Verifica palindromi',
};

export default definition;



// 🔧 File: frontend/src/tools/math-number-formatter/index.jsx
// 🔗 NeoPanze — Number Formatter

import React from 'react';

function ResultView({ result }) {
  if (!result?.formatted) {
    return null;
  }

  return (
    <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
      <p className='font-semibold text-indigo-900 mb-2'>Formato: {result.format}</p>
      <p className='text-3xl font-bold text-indigo-600'>{result.formatted}</p>
    </div>
  );
}

const definition = {
  id: 'math-number-formatter',
  fields: [
    {
      type: 'number',
      name: 'number',
      label: 'Numero',
      required: true,
    },
    {
      type: 'select',
      name: 'format',
      label: 'Formato',
      options: [
        { value: 'standard', label: 'Standard' },
        { value: 'currency', label: 'Valuta' },
        { value: 'percentage', label: 'Percentuale' },
        { value: 'scientific', label: 'Scientifico' },
        { value: 'compact', label: 'Compatto' },
      ],
      defaultValue: 'standard',
    },
    {
      type: 'text',
      name: 'currency',
      label: 'Valuta (solo per formato valuta)',
      defaultValue: 'EUR',
    },
  ],
  ResultView,
  ctaLabel: 'Formatta',
};

export default definition;



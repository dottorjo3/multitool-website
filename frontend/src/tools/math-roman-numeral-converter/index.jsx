// 🔧 File: frontend/src/tools/math-roman-numeral-converter/index.jsx
// 🔗 NeoPanze — Roman Numeral Converter

import React from 'react';

function ResultView({ result }) {
  if (!result?.result) {
    return null;
  }

  return (
    <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
      <p className='font-semibold text-indigo-900 mb-2'>
        {result.direction === 'to-roman' 
          ? `Numero: ${result.original} → Romano: ${result.result}`
          : `Romano: ${result.original} → Numero: ${result.result}`
        }
      </p>
      <p className='text-2xl font-bold text-indigo-600'>{result.result}</p>
    </div>
  );
}

const definition = {
  id: 'math-roman-numeral-converter',
  fields: [
    {
      type: 'select',
      name: 'direction',
      label: 'Direzione conversione',
      options: [
        { value: 'to-roman', label: 'Numero → Romano' },
        { value: 'from-roman', label: 'Romano → Numero' },
      ],
      defaultValue: 'to-roman',
    },
    {
      type: 'text',
      name: 'input',
      label: 'Input',
      placeholder: '123 o MCMXCIX',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Converti',
};

export default definition;



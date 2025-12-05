// 🔧 File: frontend/src/tools/math-currency-converter/index.jsx
// 🔗 NeoPanze — Currency Converter

import React from 'react';

function ResultView({ result }) {
  if (!result?.converted) {
    return null;
  }

  return (
    <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
      <p className='font-semibold text-indigo-900 mb-2'>
        {result.amount} {result.fromCurrency} = {result.formatted} {result.toCurrency}
      </p>
      <p className='text-sm text-indigo-600'>
        Tasso: 1 {result.fromCurrency} = {result.rate.toFixed(4)} {result.toCurrency}
      </p>
      {result.note && (
        <p className='text-xs text-indigo-500 mt-2'>{result.note}</p>
      )}
    </div>
  );
}

const definition = {
  id: 'math-currency-converter',
  fields: [
    {
      type: 'number',
      name: 'amount',
      label: 'Importo',
      required: true,
      min: 0,
    },
    {
      type: 'select',
      name: 'fromCurrency',
      label: 'Da valuta',
      options: [
        { value: 'USD', label: 'USD - Dollaro USA' },
        { value: 'EUR', label: 'EUR - Euro' },
        { value: 'GBP', label: 'GBP - Sterlina' },
        { value: 'JPY', label: 'JPY - Yen' },
      ],
      defaultValue: 'USD',
    },
    {
      type: 'select',
      name: 'toCurrency',
      label: 'A valuta',
      options: [
        { value: 'USD', label: 'USD - Dollaro USA' },
        { value: 'EUR', label: 'EUR - Euro' },
        { value: 'GBP', label: 'GBP - Sterlina' },
        { value: 'JPY', label: 'JPY - Yen' },
      ],
      defaultValue: 'EUR',
    },
  ],
  ResultView,
  ctaLabel: 'Converti',
};

export default definition;



// 🔧 File: frontend/src/tools/math-unit-converter/index.jsx
// 🔗 NeoPanze — Unit Converter

import React from 'react';

function ResultView({ result }) {
  if (!result?.result) {
    return null;
  }

  return (
    <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
      <p className='font-semibold text-indigo-900 mb-2'>
        {result.original} {result.fromUnit} = {result.formatted} {result.toUnit}
      </p>
    </div>
  );
}

const definition = {
  id: 'math-unit-converter',
  fields: [
    {
      type: 'number',
      name: 'value',
      label: 'Valore',
      required: true,
    },
    {
      type: 'select',
      name: 'category',
      label: 'Categoria',
      options: [
        { value: 'length', label: 'Lunghezza' },
        { value: 'weight', label: 'Peso' },
        { value: 'temperature', label: 'Temperatura' },
        { value: 'volume', label: 'Volume' },
      ],
      defaultValue: 'length',
    },
    {
      type: 'text',
      name: 'fromUnit',
      label: 'Da unità',
      placeholder: 'm, km, cm, etc.',
      required: true,
    },
    {
      type: 'text',
      name: 'toUnit',
      label: 'A unità',
      placeholder: 'm, km, cm, etc.',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Converti',
};

export default definition;



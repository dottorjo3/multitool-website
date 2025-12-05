// 🔧 File: frontend/src/tools/math-triangle-calculator/index.jsx
// 🔗 NeoPanze — Triangle Calculator

import React from 'react';

function ResultView({ result }) {
  if (!result?.result) {
    return null;
  }

  return (
    <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
      <p className='font-semibold text-indigo-900 mb-2'>{result.formula}</p>
      <p className='text-2xl font-bold text-indigo-600'>{result.result}</p>
    </div>
  );
}

const definition = {
  id: 'math-triangle-calculator',
  fields: [
    {
      type: 'select',
      name: 'type',
      label: 'Calcolo',
      options: [
        { value: 'area', label: 'Area (base × altezza / 2)' },
        { value: 'perimeter', label: 'Perimetro (a + b + c)' },
        { value: 'hypotenuse', label: 'Ipotenusa (Teorema di Pitagora)' },
      ],
      defaultValue: 'area',
    },
    {
      type: 'number',
      name: 'a',
      label: 'Lato a (o base)',
      required: true,
      min: 0,
    },
    {
      type: 'number',
      name: 'b',
      label: 'Lato b (o altezza)',
      required: true,
      min: 0,
    },
    {
      type: 'number',
      name: 'c',
      label: 'Lato c (solo per perimetro)',
      min: 0,
    },
  ],
  ResultView,
  ctaLabel: 'Calcola',
};

export default definition;



// 🔧 File: frontend/src/tools/math-bmi-calculator/index.jsx
// 🔗 NeoPanze — BMI Calculator

import React from 'react';

function ResultView({ result }) {
  if (!result?.bmi) {
    return null;
  }

  const categoryColor = {
    'Sottopeso': 'blue',
    'Normale': 'green',
    'Sovrappeso': 'amber',
    'Obeso': 'red',
  }[result.category] || 'gray';

  return (
    <div className={`p-4 bg-${categoryColor}-50 border border-${categoryColor}-100 rounded-lg`}>
      <p className='font-semibold text-slate-900 mb-2'>BMI: {result.bmi}</p>
      <p className={`text-xl font-bold text-${categoryColor}-600`}>{result.category}</p>
      <div className='mt-3 text-sm text-slate-600'>
        <p>Peso: {result.weightKg} kg</p>
        <p>Altezza: {result.heightM} m</p>
      </div>
    </div>
  );
}

const definition = {
  id: 'math-bmi-calculator',
  fields: [
    {
      type: 'select',
      name: 'unit',
      label: 'Sistema',
      options: [
        { value: 'metric', label: 'Metrico (kg, cm)' },
        { value: 'imperial', label: 'Imperiale (lbs, ft)' },
      ],
      defaultValue: 'metric',
    },
    {
      type: 'number',
      name: 'weight',
      label: 'Peso',
      required: true,
      helperText: 'In kg (metrico) o lbs (imperiale)',
    },
    {
      type: 'number',
      name: 'height',
      label: 'Altezza',
      required: true,
      helperText: 'In cm (metrico) o ft (imperiale)',
    },
  ],
  ResultView,
  ctaLabel: 'Calcola BMI',
};

export default definition;



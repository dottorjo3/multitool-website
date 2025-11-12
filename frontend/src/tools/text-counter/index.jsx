// 🔧 File: frontend/src/tools/text-counter/index.jsx
// 🔗 Farm Ready — UI contatore parole/caratteri

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  const stats = [
    { label: 'Caratteri', value: result.characters },
    { label: 'Caratteri (senza spazi)', value: result.charactersNoSpaces },
    { label: 'Parole', value: result.words },
    { label: 'Frasi', value: result.sentences },
    { label: 'Righe', value: result.lines },
    { label: 'Paragrafi', value: result.paragraphs },
  ];

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
      {stats.map((item) => (
        <div key={item.label} className='rounded-lg border border-indigo-100 bg-indigo-50/60 px-3 py-2'>
          <p className='text-xs uppercase tracking-wide text-indigo-500'>{item.label}</p>
          <p className='text-lg font-semibold text-indigo-800'>{item.value}</p>
        </div>
      ))}
    </div>
  );
}

const definition = {
  id: 'text-counter',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo da analizzare',
      placeholder: 'Incolla o scrivi il tuo testo...',
      rows: 10,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Conta elementi',
};

export default definition;



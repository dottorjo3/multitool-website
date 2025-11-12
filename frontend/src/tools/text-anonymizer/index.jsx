// 🔧 File: frontend/src/tools/text-anonymizer/index.jsx
// 🔗 NeoPanze — Text Anonymizer

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <p>Sostituzioni effettuate: {result.replacementsCount}</p>
      <div className='bg-slate-900 text-slate-50 text-sm rounded-lg p-4 whitespace-pre-wrap break-words'>
        {result.anonymized}
      </div>
      {result.replacementsCount > 0 && (
        <div>
          <p className='font-semibold text-slate-700 mb-2'>Dettaglio sostituzioni</p>
          <ul className='space-y-1'>
            {result.replacements.map((item, index) => (
              <li key={`${item.type}-${index}`} className='text-xs text-slate-500'>
                [{item.type}] {item.original}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const definition = {
  id: 'text-anonymizer',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo da anonimizzare',
      placeholder: 'Incolla un testo contenente email o numeri...',
      rows: 10,
      required: true,
    },
    {
      type: 'checkbox',
      name: 'maskEmail',
      label: 'Maschera email',
      defaultValue: 'true',
    },
    {
      type: 'checkbox',
      name: 'maskPhone',
      label: 'Maschera numeri di telefono',
      defaultValue: 'true',
    },
    {
      type: 'checkbox',
      name: 'maskNumbers',
      label: 'Maschera numeri lunghi (>=4 cifre)',
      defaultValue: 'false',
    },
  ],
  ResultView,
  ctaLabel: 'Anonimizza testo',
};

export default definition;


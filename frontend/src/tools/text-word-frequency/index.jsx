// 🔧 File: frontend/src/tools/text-word-frequency/index.jsx
// 🔗 NeoPanze — Frequenza parole

import React from 'react';

function ResultView({ result }) {
  if (!result?.frequencies) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <p className='text-sm text-slate-600'>
        Totale parole: {result.totalWords} • Uniche: {result.uniqueWords} • Case sensitive: {result.caseSensitive ? 'Sì' : 'No'}
      </p>
      <table className='min-w-full divide-y divide-slate-200 text-sm'>
        <thead className='bg-slate-100'>
          <tr>
            <th className='px-3 py-2 text-left font-semibold text-slate-600'>Parola</th>
            <th className='px-3 py-2 text-right font-semibold text-slate-600'>Conteggio</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-200'>
          {result.frequencies.map((item) => (
            <tr key={item.word}>
              <td className='px-3 py-2'>{item.word}</td>
              <td className='px-3 py-2 text-right font-semibold'>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const definition = {
  id: 'text-word-frequency',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo da analizzare',
      placeholder: 'Incolla un testo...',
      rows: 10,
      required: true,
    },
    {
      type: 'number',
      name: 'top',
      label: 'Mostra solo le prime N parole (opzionale)',
      min: 1,
      max: 200,
      helperText: 'Lascia vuoto per mostrare tutte le parole',
    },
    {
      type: 'checkbox',
      name: 'caseSensitive',
      label: 'Distinzione maiuscole/minuscole',
      defaultValue: 'false',
    },
  ],
  ResultView,
  ctaLabel: 'Conta parole',
};

export default definition;



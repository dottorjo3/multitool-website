// 🔧 File: frontend/src/tools/text-ngram/index.jsx
// 🔗 NeoPanze — N-gram Analyzer

import React from 'react';

function ResultView({ result }) {
  if (!result?.frequencies) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <p className='text-sm text-slate-600'>
        N: {result.n} • Totale n-gram: {result.totalNgrams} • Unici: {result.uniqueNgrams} • Case sensitive: {result.caseSensitive ? 'Sì' : 'No'}
      </p>
      <table className='min-w-full divide-y divide-slate-200 text-sm'>
        <thead className='bg-slate-100'>
          <tr>
            <th className='px-3 py-2 text-left font-semibold text-slate-600'>n-gram</th>
            <th className='px-3 py-2 text-right font-semibold text-slate-600'>Conteggio</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-200'>
          {result.frequencies.map((item) => (
            <tr key={item.gram}>
              <td className='px-3 py-2'>{item.gram}</td>
              <td className='px-3 py-2 text-right font-semibold'>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const definition = {
  id: 'text-ngram',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo di input',
      placeholder: 'Incolla un testo per estrarre n-gram...',
      rows: 10,
      required: true,
    },
    {
      type: 'number',
      name: 'n',
      label: 'Dimensione n-gram',
      defaultValue: 2,
      min: 1,
      max: 5,
    },
    {
      type: 'number',
      name: 'top',
      label: 'Mostra primi N risultati',
      defaultValue: 20,
      min: 1,
      max: 200,
    },
    {
      type: 'checkbox',
      name: 'caseSensitive',
      label: 'Case sensitive',
      defaultValue: 'false',
    },
  ],
  ResultView,
  ctaLabel: 'Genera n-gram',
};

export default definition;



// 🔧 File: frontend/src/tools/text-keyword-density/index.jsx
// 🔗 NeoPanze — Keyword Density

import React from 'react';

function ResultView({ result }) {
  if (!result?.keywords) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <p className='text-sm text-slate-600'>
        Keyword totali: {result.totalKeywords} • Uniche: {result.uniqueKeywords} • Min lunghezza: {result.minLength}
      </p>
      <table className='min-w-full divide-y divide-slate-200 text-sm'>
        <thead className='bg-slate-100'>
          <tr>
            <th className='px-3 py-2 text-left font-semibold text-slate-600'>Keyword</th>
            <th className='px-3 py-2 text-right font-semibold text-slate-600'>Occorrenze</th>
            <th className='px-3 py-2 text-right font-semibold text-slate-600'>Densità %</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-200'>
          {result.keywords.map((item) => (
            <tr key={item.keyword}>
              <td className='px-3 py-2 capitalize'>{item.keyword}</td>
              <td className='px-3 py-2 text-right font-semibold'>{item.count}</td>
              <td className='px-3 py-2 text-right font-semibold'>{item.density}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const definition = {
  id: 'text-keyword-density',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo sorgente',
      placeholder: 'Incolla un testo per valutare la densità delle keyword...',
      rows: 10,
      required: true,
    },
    {
      type: 'number',
      name: 'minLength',
      label: 'Lunghezza minima keyword',
      defaultValue: 3,
      min: 1,
      max: 15,
    },
    {
      type: 'number',
      name: 'top',
      label: 'Numero massimo risultati',
      defaultValue: 20,
      min: 1,
      max: 200,
    },
  ],
  ResultView,
  ctaLabel: 'Calcola densità keyword',
};

export default definition;



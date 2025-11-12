// 🔧 File: frontend/src/tools/text-letter-frequency/index.jsx
// 🔗 NeoPanze — Letter Frequency

import React from 'react';

function ResultView({ result }) {
  if (!result) return null;

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='flex flex-wrap gap-4'>
        <div className='bg-indigo-50 text-indigo-700 rounded-xl px-4 py-3'>
          <p className='text-xs uppercase font-semibold'>Lettere totali</p>
          <p className='text-xl font-bold'>{result.totalLetters}</p>
        </div>
        <div className='bg-slate-100 text-slate-700 rounded-xl px-4 py-3'>
          <p className='text-xs uppercase font-semibold'>Lettere uniche</p>
          <p className='text-xl font-bold'>{result.uniqueLetters}</p>
        </div>
      </div>
      <div className='rounded-xl border border-slate-200 overflow-hidden'>
        <table className='min-w-full text-left text-xs'>
          <thead className='bg-slate-100 text-slate-500 uppercase tracking-wide'>
            <tr>
              <th className='px-3 py-2'>Lettera</th>
              <th className='px-3 py-2 text-right'>Conteggio</th>
              <th className='px-3 py-2 text-right'>%</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-100 bg-white'>
            {result.frequencies.map((item) => (
              <tr key={item.letter}>
                <td className='px-3 py-2 font-semibold text-slate-700'>{item.letter}</td>
                <td className='px-3 py-2 text-right'>{item.count}</td>
                <td className='px-3 py-2 text-right'>{item.percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-letter-frequency',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo',
      placeholder: 'Inserisci testo per analizzare la frequenza delle lettere…',
      rows: 10,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Calcola frequenza',
};

export default definition;



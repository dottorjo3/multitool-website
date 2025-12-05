// 🔧 File: frontend/src/tools/text-sentence-splitter/index.jsx
// 🔗 NeoPanze — Sentence Splitter

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-3'>
          Frasi trovate: <span className='text-indigo-600'>{result.count}</span>
        </p>
        <div className='bg-white p-4 rounded border border-indigo-200 max-h-96 overflow-y-auto'>
          <div className='space-y-2'>
            {result.sentences.map((sentence, index) => (
              <div key={index} className='p-2 bg-slate-50 rounded border border-slate-200'>
                <span className='text-xs text-slate-500 mr-2'>{index + 1}.</span>
                <span className='text-slate-900'>{sentence}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'text-sentence-splitter',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da suddividere',
      placeholder: 'Inserisci il testo da suddividere in frasi...',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Suddividi in frasi',
};

export default definition;


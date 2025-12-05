// 🔧 File: frontend/src/tools/math-prime-checker/index.jsx
// 🔗 NeoPanze — Prime Checker

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className={`p-4 bg-${result.isPrime ? 'green' : 'red'}-50 border border-${result.isPrime ? 'green' : 'red'}-100 rounded-lg`}>
      <p className={`font-semibold text-${result.isPrime ? 'green' : 'red'}-900 mb-2`}>
        {result.message}
      </p>
      {!result.isPrime && result.factors && (
        <div className='mt-3'>
          <p className='text-sm text-slate-600 mb-1'>Fattori ({result.factorCount}):</p>
          <div className='flex flex-wrap gap-1'>
            {result.factors.map((factor, idx) => (
              <span key={idx} className='px-2 py-1 bg-white text-xs rounded border'>
                {factor}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const definition = {
  id: 'math-prime-checker',
  fields: [
    {
      type: 'number',
      name: 'number',
      label: 'Numero',
      required: true,
      min: 1,
      helperText: 'Inserisci un numero intero positivo',
    },
  ],
  ResultView,
  ctaLabel: 'Verifica',
};

export default definition;



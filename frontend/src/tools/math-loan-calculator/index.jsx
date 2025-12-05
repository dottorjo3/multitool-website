// 🔧 File: frontend/src/tools/math-loan-calculator/index.jsx
// 🔗 NeoPanze — Loan Calculator

import React from 'react';

function ResultView({ result }) {
  if (!result?.monthlyPayment) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>Rata Mensile</p>
        <p className='text-3xl font-bold text-indigo-600'>€{result.monthlyPayment}</p>
      </div>
      <div className='grid grid-cols-2 gap-3 text-sm'>
        <div className='p-3 bg-slate-50 rounded border'>
          <p className='text-slate-500'>Totale da pagare</p>
          <p className='font-bold text-lg'>€{result.totalPayment}</p>
        </div>
        <div className='p-3 bg-slate-50 rounded border'>
          <p className='text-slate-500'>Interessi totali</p>
          <p className='font-bold text-lg'>€{result.totalInterest}</p>
        </div>
        <div className='p-3 bg-slate-50 rounded border'>
          <p className='text-slate-500'>Capitale</p>
          <p className='font-bold'>€{result.principal}</p>
        </div>
        <div className='p-3 bg-slate-50 rounded border'>
          <p className='text-slate-500'>Numero rate</p>
          <p className='font-bold'>{result.numPayments}</p>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'math-loan-calculator',
  fields: [
    {
      type: 'number',
      name: 'principal',
      label: 'Capitale (€)',
      required: true,
      min: 1,
    },
    {
      type: 'number',
      name: 'rate',
      label: 'Tasso annuo (%)',
      required: true,
      min: 0,
      step: 0.1,
    },
    {
      type: 'number',
      name: 'years',
      label: 'Anni',
      required: true,
      min: 1,
    },
  ],
  ResultView,
  ctaLabel: 'Calcola Rata',
};

export default definition;



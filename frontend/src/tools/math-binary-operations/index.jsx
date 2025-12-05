// 🔧 File: frontend/src/tools/math-binary-operations/index.jsx
// 🔗 NeoPanze — Binary Operations

import React from 'react';

function ResultView({ result }) {
  if (!result?.result) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>{result.formula}</p>
        <p className='text-2xl font-bold text-indigo-600'>{result.result}</p>
        <div className='mt-3 text-sm space-y-1'>
          <p className='font-mono text-xs'>Binario 1: {result.binary1}</p>
          {result.binary2 && <p className='font-mono text-xs'>Binario 2: {result.binary2}</p>}
          <p className='font-mono text-xs'>Risultato: {result.resultBinary}</p>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'math-binary-operations',
  fields: [
    {
      type: 'select',
      name: 'operation',
      label: 'Operazione',
      options: [
        { value: 'and', label: 'AND (&)' },
        { value: 'or', label: 'OR (|)' },
        { value: 'xor', label: 'XOR (^)' },
        { value: 'not', label: 'NOT (~)' },
        { value: 'shift-left', label: 'Shift Left (<<)' },
        { value: 'shift-right', label: 'Shift Right (>>)' },
      ],
      defaultValue: 'and',
    },
    {
      type: 'number',
      name: 'number1',
      label: 'Numero 1',
      required: true,
    },
    {
      type: 'number',
      name: 'number2',
      label: 'Numero 2',
      helperText: 'Non richiesto per NOT',
    },
  ],
  ResultView,
  ctaLabel: 'Esegui',
};

export default definition;



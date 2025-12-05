// 🔧 File: frontend/src/tools/math-number-base64/index.jsx
// 🔗 Number Base64

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='bg-white border border-slate-200 rounded-lg p-4'>
      <pre className='text-sm text-slate-700 whitespace-pre-wrap break-words'>
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
}

const definition = {
  id: 'math-number-base64',
  fields: [],
  ResultView,
  ctaLabel: 'Calcola',
};

export default definition;

// 🔧 File: frontend/src/tools/data-dashboard-brief/index.jsx
// 🔗 Dashboard Brief

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
  id: 'data-dashboard-brief',
  fields: [
  {
    "type": "textarea",
    "name": "input",
    "label": "Input",
    "rows": 6,
    "required": true
  }
],
  ResultView,
  ctaLabel: 'Esegui',
};

export default definition;

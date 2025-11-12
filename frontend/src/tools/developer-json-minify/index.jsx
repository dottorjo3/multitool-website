// 🔧 File: frontend/src/tools/developer-json-minify/index.jsx
// 🔗 NeoPanze — JSON Minifier

import React from 'react';

function ResultView({ result }) {
  if (!result?.minified) return null;

  return (
    <textarea
      readOnly
      className='w-full rounded-xl border border-slate-200 bg-slate-900 text-slate-50 font-mono text-xs p-4'
      rows={result.minified.length < 400 ? 6 : 12}
      value={result.minified}
    />
  );
}

const definition = {
  id: 'developer-json-minify',
  fields: [
    {
      type: 'textarea',
      name: 'json',
      label: 'JSON',
      placeholder: `{
  "name": "Bibble",
  "freeTools": 75
}
`,
      rows: 12,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Minifica JSON',
};

export default definition;


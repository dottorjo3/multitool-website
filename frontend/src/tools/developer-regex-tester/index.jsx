// 🔧 File: frontend/src/tools/developer-regex-tester/index.jsx
// 🔗 NeoPanze — Regex Tester

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <p>Match trovati: {result.matchesCount}</p>
      <div className='space-y-2'>
        {result.matches.map((item, index) => (
          <div key={`${item.match}-${item.index}-${index}`} className='border border-slate-200 rounded-lg p-3'>
            <p className='font-mono text-slate-900'>{item.match}</p>
            <p className='text-xs text-slate-500'>Posizione: {item.index}</p>
            {item.groups.length > 0 && (
              <div className='mt-2'>
                <p className='text-xs font-semibold text-slate-500'>Gruppi:</p>
                <ul className='list-disc pl-4 text-xs text-slate-500'>
                  {item.groups.map((group, idx) => (
                    <li key={idx}>{group ?? '—'}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const definition = {
  id: 'developer-regex-tester',
  fields: [
    {
      type: 'text',
      name: 'pattern',
      label: 'Pattern',
      placeholder: '\\w+',
      required: true,
    },
    {
      type: 'text',
      name: 'flags',
      label: 'Flag',
      defaultValue: 'g',
      placeholder: 'gimsyu',
    },
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo da analizzare',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Esegui regex',
};

export default definition;


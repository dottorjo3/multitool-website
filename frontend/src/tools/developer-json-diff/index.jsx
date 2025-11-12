// 🔧 File: frontend/src/tools/developer-json-diff/index.jsx
// 🔗 NeoPanze — JSON Diff

import React from 'react';

function Section({ title, items, type }) {
  if (!items?.length) {
    return null;
  }
  return (
    <div className='border border-slate-200 rounded-lg p-3'>
      <p className='font-semibold text-slate-700 mb-2'>
        {title} ({items.length})
      </p>
      <ul className='space-y-1 text-xs text-slate-600'>
        {items.map((item, index) => (
          <li key={`${type}-${index}`}>
            <span className='font-mono text-slate-900'>{item.path}</span>
            {type === 'changed' ? (
              <span> → {JSON.stringify(item.oldValue)} → {JSON.stringify(item.newValue)}</span>
            ) : (
              <span> → {JSON.stringify(item.value)}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-3 text-sm text-slate-600'>
      <p>
        Aggiunte: {result.addedCount} • Rimosse: {result.removedCount} • Modificate: {result.changedCount}
      </p>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
        <Section title='Aggiunte' items={result.added} type='added' />
        <Section title='Rimosse' items={result.removed} type='removed' />
        <Section title='Modificate' items={result.changed} type='changed' />
      </div>
    </div>
  );
}

const definition = {
  id: 'developer-json-diff',
  fields: [
    {
      type: 'textarea',
      name: 'jsonA',
      label: 'JSON A',
      placeholder: '{ "name": "Alice" }',
      rows: 8,
      required: true,
    },
    {
      type: 'textarea',
      name: 'jsonB',
      label: 'JSON B',
      placeholder: '{ "name": "Bob" }',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Confronta JSON',
};

export default definition;


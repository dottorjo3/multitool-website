// 🔧 File: frontend/src/tools/data-csv-split-by-column/index.jsx
// 🔗 NeoPanze — CSV Split by Column

import React from 'react';

function ResultView({ result }) {
  if (!result?.split) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>
          CSV diviso per: <span className='font-mono'>{result.column}</span>
        </p>
        <p className='text-sm text-indigo-700'>
          Gruppi: {result.groupCount} • Righe totali: {result.totalRows}
        </p>
      </div>
      
      <div className='space-y-3'>
        <p className='font-semibold text-slate-900'>Gruppi ({result.groups?.length || 0}):</p>
        {result.groups && result.groups.map((group, idx) => (
          <div key={idx} className='p-3 bg-slate-50 border border-slate-200 rounded-lg'>
            <p className='font-semibold text-slate-900 mb-2'>
              Gruppo: <span className='font-mono'>{group}</span>
            </p>
            <pre className='bg-slate-900 text-slate-50 text-xs rounded p-2 overflow-auto max-h-48'>
              {result.split[group]}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

const definition = {
  id: 'data-csv-split-by-column',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'CSV da dividere',
      placeholder: 'name,type\nAlice,user\nBob,admin\nCarol,user',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'column',
      label: 'Colonna per divisione',
      placeholder: 'type',
      required: true,
      helperText: 'Il CSV verrà diviso in base ai valori di questa colonna',
    },
    {
      type: 'text',
      name: 'delimiter',
      label: 'Delimitatore',
      defaultValue: ',',
    },
  ],
  ResultView,
  ctaLabel: 'Dividi CSV',
};

export default definition;



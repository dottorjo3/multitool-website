// 🔧 File: frontend/src/tools/data-json-table-viewer/index.jsx
// 🔗 NeoPanze — JSON Table Viewer

import React from 'react';

function ResultView({ result }) {
  if (!result?.headers) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-2'>
          Visualizzazione Tabella
        </p>
        <p className='text-sm text-indigo-700'>
          Righe: {result.rowCount} • Colonne: {result.columnCount} • 
          Tipo: {result.isArray ? 'Array' : 'Oggetto'}
        </p>
      </div>
      
      {result.rows && result.rows.length > 0 && (
        <div className='overflow-x-auto'>
          <table className='min-w-full border border-slate-200 rounded-lg'>
            <thead>
              <tr className='bg-slate-100'>
                {result.headers.map((header, idx) => (
                  <th key={idx} className='px-4 py-2 text-left text-xs font-semibold text-slate-700 border border-slate-300'>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.rows.map((row, rowIdx) => (
                <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className='px-4 py-2 text-xs text-slate-900 border border-slate-300'>
                      {String(cell).length > 50 ? `${String(cell).substring(0, 50)}...` : String(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <details className='p-3 bg-slate-50 border border-slate-200 rounded-lg'>
        <summary className='cursor-pointer text-sm font-semibold text-slate-700'>
          JSON Formattato
        </summary>
        <pre className='mt-2 bg-slate-900 text-slate-50 text-xs rounded p-3 overflow-auto max-h-64'>
          {result.formatted}
        </pre>
      </details>
    </div>
  );
}

const definition = {
  id: 'data-json-table-viewer',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'JSON da visualizzare',
      placeholder: '[{"name": "Alice", "age": 25}, {"name": "Bob", "age": 30}]',
      rows: 10,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Visualizza Tabella',
};

export default definition;



// 🔧 File: frontend/src/tools/data-csv-to-excel/index.jsx
// 🔗 NeoPanze — CSV to Excel

import React, { useState } from 'react';

function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result?.excelData) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.excelData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-3'>
      <div className='p-3 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='text-sm text-indigo-900'>
          Foglio: <span className='font-semibold'>{result.sheetName}</span>
        </p>
        <p className='text-sm text-indigo-700'>
          Righe: {result.rows} • Colonne: {result.columns}
        </p>
        {result.note && (
          <p className='text-xs text-indigo-600 mt-1'>{result.note}</p>
        )}
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-slate-600'>Dati Excel (JSON)</p>
        <button
          type='button'
          onClick={handleCopy}
          className='text-xs font-semibold text-indigo-600 hover:text-indigo-500'
        >
          {copied ? 'Copiato!' : 'Copia JSON'}
        </button>
      </div>
      <pre className='bg-slate-900 text-slate-50 text-xs rounded-lg p-4 overflow-auto max-h-96'>
        {result.excelData}
      </pre>
    </div>
  );
}

const definition = {
  id: 'data-csv-to-excel',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'CSV da convertire',
      placeholder: 'name,age\nAlice,25\nBob,30',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'sheetName',
      label: 'Nome foglio',
      defaultValue: 'Sheet1',
    },
    {
      type: 'text',
      name: 'delimiter',
      label: 'Delimitatore',
      defaultValue: ',',
    },
  ],
  ResultView,
  ctaLabel: 'Converti a Excel',
};

export default definition;



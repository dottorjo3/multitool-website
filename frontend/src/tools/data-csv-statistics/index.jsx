// 🔧 File: frontend/src/tools/data-csv-statistics/index.jsx
// 🔗 NeoPanze — CSV Statistics

import React from 'react';

function ResultView({ result }) {
  if (!result?.stats) {
    return null;
  }

  const { stats } = result;

  return (
    <div className='space-y-4'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900 mb-3'>
          Statistiche CSV
        </p>
        <div className='grid grid-cols-2 gap-3 mb-4'>
          <div className='bg-white p-3 rounded border border-indigo-200'>
            <p className='text-xs text-slate-500'>Righe</p>
            <p className='text-xl font-bold text-indigo-600'>{stats.rows}</p>
          </div>
          <div className='bg-white p-3 rounded border border-indigo-200'>
            <p className='text-xs text-slate-500'>Colonne</p>
            <p className='text-xl font-bold text-indigo-600'>{stats.columns}</p>
          </div>
        </div>
        <div>
          <p className='text-sm font-semibold text-indigo-900 mb-2'>Colonne:</p>
          <div className='flex flex-wrap gap-2'>
            {stats.columnNames.map((col, idx) => (
              <span key={idx} className='px-2 py-1 bg-white text-xs font-mono rounded border border-indigo-200'>
                {col}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className='space-y-2'>
        <p className='font-semibold text-slate-900'>Statistiche per colonna:</p>
        {Object.entries(stats.columnStats).map(([colName, colStats]) => (
          <div key={colName} className='p-3 bg-slate-50 border border-slate-200 rounded-lg'>
            <p className='font-semibold text-slate-900 mb-1'>{colName}:</p>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-2 text-xs'>
              <div>
                <span className='text-slate-500'>Totali:</span> <span className='font-semibold'>{colStats.total}</span>
              </div>
              <div>
                <span className='text-slate-500'>Vuoti:</span> <span className='font-semibold'>{colStats.empty}</span>
              </div>
              {colStats.numeric > 0 && (
                <>
                  <div>
                    <span className='text-slate-500'>Min:</span> <span className='font-semibold'>{colStats.min}</span>
                  </div>
                  <div>
                    <span className='text-slate-500'>Max:</span> <span className='font-semibold'>{colStats.max}</span>
                  </div>
                  <div>
                    <span className='text-slate-500'>Media:</span> <span className='font-semibold'>{colStats.avg}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const definition = {
  id: 'data-csv-statistics',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'CSV da analizzare',
      placeholder: 'name,age,score\nAlice,25,95\nBob,30,87',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'delimiter',
      label: 'Delimitatore',
      defaultValue: ',',
    },
  ],
  ResultView,
  ctaLabel: 'Analizza CSV',
};

export default definition;



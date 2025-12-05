// 🔧 File: frontend/src/tools/data-csv-validator/index.jsx
// 🔗 NeoPanze — CSV Validator

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4'>
      {result.isValid ? (
        <div className='p-4 bg-green-50 border border-green-200 rounded-lg'>
          <p className='font-semibold text-green-900 mb-2'>✓ CSV Valido</p>
          <div className='text-sm text-green-700 space-y-1'>
            <p>Righe: <span className='font-semibold'>{result.rows}</span></p>
            <p>Colonne: <span className='font-semibold'>{result.columns}</span></p>
            {result.headers && (
              <div>
                <p className='mb-1'>Header:</p>
                <div className='flex flex-wrap gap-1'>
                  {result.headers.map((h, idx) => (
                    <span key={idx} className='px-2 py-1 bg-green-100 text-xs font-mono rounded'>
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className='p-4 bg-red-50 border border-red-200 rounded-lg'>
          <p className='font-semibold text-red-900 mb-2'>✗ CSV Non Valido</p>
          <p className='text-sm text-red-700 mb-3'>
            Trovati {result.errorCount} errori e {result.warningCount} avvisi
          </p>
          {result.errors && result.errors.length > 0 && (
            <div className='space-y-2 mb-3'>
              <p className='text-xs font-semibold text-red-800'>Errori:</p>
              {result.errors.map((error, idx) => (
                <p key={idx} className='text-xs text-red-700'>• {error}</p>
              ))}
            </div>
          )}
          {result.warnings && result.warnings.length > 0 && (
            <div className='space-y-2'>
              <p className='text-xs font-semibold text-red-800'>Avvisi:</p>
              {result.warnings.map((warning, idx) => (
                <p key={idx} className='text-xs text-red-600'>• {warning}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const definition = {
  id: 'data-csv-validator',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'CSV da validare',
      placeholder: 'name,age\nAlice,25\nBob,30',
      rows: 10,
      required: true,
    },
    {
      type: 'text',
      name: 'delimiter',
      label: 'Delimitatore',
      defaultValue: ',',
    },
    {
      type: 'checkbox',
      name: 'strictColumnCount',
      label: 'Conteggio colonne rigoroso',
      defaultValue: 'false',
      helperText: 'Considera errore se le righe hanno numero diverso di colonne',
    },
  ],
  ResultView,
  ctaLabel: 'Valida CSV',
};

export default definition;



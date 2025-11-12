// 🔧 File: frontend/src/tools/developer-timestamp-converter/index.jsx
// 🔗 NeoPanze — Timestamp Converter

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-3 text-sm text-slate-700'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <div className='bg-slate-100 rounded-lg p-3'>
          <p className='font-semibold text-slate-600'>Unix (secondi)</p>
          <p className='mt-1 font-mono text-slate-900'>{result.unix}</p>
        </div>
        <div className='bg-slate-100 rounded-lg p-3'>
          <p className='font-semibold text-slate-600'>ISO 8601</p>
          <p className='mt-1 font-mono text-slate-900 break-all'>{result.iso}</p>
        </div>
        {result.locale && (
          <div className='bg-slate-100 rounded-lg p-3'>
            <p className='font-semibold text-slate-600'>Locale</p>
            <p className='mt-1'>{result.locale}</p>
          </div>
        )}
        {result.utc && (
          <div className='bg-slate-100 rounded-lg p-3'>
            <p className='font-semibold text-slate-600'>UTC</p>
            <p className='mt-1'>{result.utc}</p>
          </div>
        )}
      </div>
      {result.milliseconds && (
        <p className='text-xs text-slate-500'>
          Millisecondi: {result.milliseconds}
        </p>
      )}
    </div>
  );
}

const definition = {
  id: 'developer-timestamp-converter',
  fields: [
    {
      type: 'text',
      name: 'input',
      label: 'Valore da convertire',
      placeholder: 'Es. 1698765432 oppure 2025-11-08T15:37:00Z',
      required: true,
    },
    {
      type: 'select',
      name: 'mode',
      label: 'Modalità',
      defaultValue: 'unix-to-iso',
      options: [
        { value: 'unix-to-iso', label: 'Unix → ISO' },
        { value: 'iso-to-unix', label: 'ISO → Unix' },
      ],
    },
  ],
  ResultView,
  ctaLabel: 'Converti timestamp',
};

export default definition;



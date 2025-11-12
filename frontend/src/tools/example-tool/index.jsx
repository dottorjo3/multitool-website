// 🔧 File: frontend/src/tools/example-tool/index.jsx
// 🔗 Farm Ready — definizione frontend per il tool di esempio

import React from 'react';

function ResultView({ result }) {
  return (
    <div className='bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2'>
      <h3 className='text-lg font-semibold text-gray-800'>Risultato API</h3>
      <pre className='text-sm text-gray-700 whitespace-pre-wrap break-words'>
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
}

const definition = {
  id: 'example-tool',
  fields: [
    {
      type: 'textarea',
      name: 'message',
      label: 'Messaggio da inviare',
      placeholder: 'Scrivi un messaggio da inviare al tool di esempio',
      required: false,
      defaultValue: 'Ciao dal frontend!',
      helperText: 'Questo testo verrà inviato al backend per verificare la pipeline.',
    },
  ],
  ResultView,
};

export default definition;


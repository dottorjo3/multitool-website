// 🔧 File: frontend/src/tools/pdf-unlock/index.jsx
// 🔗 Farm Ready — configurazione frontend per PDF Unlock

import React from 'react';

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  const download = () => {
    const link = document.createElement('a');
    link.href = `data:${result.outputFile.mimeType};base64,${result.outputFile.base64}`;
    link.download = result.outputFile.name;
    link.click();
  };

  return (
    <div className='bg-rose-50 border border-rose-200 rounded-lg p-4 space-y-2'>
      <h3 className='text-lg font-semibold text-rose-800'>PDF sbloccato</h3>
      <button
        type='button'
        onClick={download}
        className='px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700'
      >
        Scarica PDF sbloccato
      </button>
    </div>
  );
}

const definition = {
  id: 'pdf-unlock',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica il PDF protetto',
      helperText: 'Inserisci il documento da sbloccare.',
      accept: '.pdf',
      multiple: false,
      required: true,
    },
    {
      type: 'text',
      name: 'password',
      label: 'Password corrente',
      placeholder: 'Password necessaria per aprire il PDF',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Sblocca PDF',
};

export default definition;



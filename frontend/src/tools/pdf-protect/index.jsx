// 🔧 File: frontend/src/tools/pdf-protect/index.jsx
// 🔗 Farm Ready — configurazione frontend per PDF Protect

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
    <div className='bg-sky-50 border border-sky-200 rounded-lg p-4 space-y-2'>
      <h3 className='text-lg font-semibold text-sky-800'>PDF protetto con successo</h3>
      <button
        type='button'
        onClick={download}
        className='px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700'
      >
        Scarica PDF protetto
      </button>
    </div>
  );
}

const definition = {
  id: 'pdf-protect',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica il PDF da proteggere',
      helperText: 'Il file verrà protetto con password.',
      accept: '.pdf',
      multiple: false,
      required: true,
    },
    {
      type: 'text',
      name: 'userPassword',
      label: 'Password utente',
      placeholder: 'Almeno 4 caratteri',
      helperText: 'Sarà necessaria per aprire il PDF.',
      required: true,
    },
    {
      type: 'text',
      name: 'ownerPassword',
      label: 'Password proprietario (opzionale)',
      placeholder: 'Lascia vuoto per usare la stessa password utente',
      required: false,
    },
  ],
  ResultView,
  ctaLabel: 'Proteggi PDF',
};

export default definition;



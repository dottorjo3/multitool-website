// 🔧 File: frontend/src/tools/pdf-delete-pages/index.jsx
// 🔗 Farm Ready — configurazione frontend per PDF Delete Pages

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
    <div className='bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-2'>
      <h3 className='text-lg font-semibold text-amber-800'>Pagine eliminate</h3>
      <p className='text-sm text-amber-700'>
        Rimosse: {result.removedPages.join(', ')} — Rimaste: {result.remainingPages} pagine
      </p>
      <button
        type='button'
        onClick={download}
        className='px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700'
      >
        Scarica PDF aggiornato
      </button>
    </div>
  );
}

const definition = {
  id: 'pdf-delete-pages',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica il PDF da modificare',
      helperText: 'Puoi eliminare pagine non desiderate dal documento.',
      accept: '.pdf',
      multiple: false,
      required: true,
    },
    {
      type: 'text',
      name: 'pages',
      label: 'Pagine da eliminare',
      placeholder: 'Es: 2,5,8-10',
      helperText: 'Usa virgole per separare e il trattino per gli intervalli.',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Elimina pagine',
};

export default definition;



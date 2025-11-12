// 🔧 File: frontend/src/tools/pdf-keep-pages/index.jsx
// 🔗 Farm Ready — configurazione frontend per PDF Keep Pages

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
    <div className='bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-2'>
      <h3 className='text-lg font-semibold text-emerald-800'>Pagine estratte</h3>
      <p className='text-sm text-emerald-700'>
        Pagine incluse: {result.keptPages.join(', ')} (su {result.totalPages} totali)
      </p>
      <button
        type='button'
        onClick={download}
        className='px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700'
      >
        Scarica PDF con pagine selezionate
      </button>
    </div>
  );
}

const definition = {
  id: 'pdf-keep-pages',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica il PDF da cui estrarre le pagine',
      helperText: 'Seleziona il documento di partenza.',
      accept: '.pdf',
      multiple: false,
      required: true,
    },
    {
      type: 'text',
      name: 'pages',
      label: 'Pagine da mantenere',
      placeholder: 'Es: 1,3-6',
      helperText: 'Specifica pagine singole o intervalli, separati da virgola.',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Estrai pagine',
};

export default definition;



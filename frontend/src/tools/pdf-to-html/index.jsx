// 🔧 File: frontend/src/tools/pdf-to-html/index.jsx
// 🔗 Farm Ready — configurazione frontend per PDF to HTML

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
    <div className='bg-cyan-50 border border-cyan-200 rounded-lg p-4 space-y-3'>
      <h3 className='text-lg font-semibold text-cyan-800'>Conversione completata</h3>
      <p className='text-sm text-cyan-700'>
        File HTML generato ({result.length} caratteri)
      </p>
      <button
        type='button'
        onClick={download}
        className='px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700'
      >
        Scarica HTML
      </button>
      <details className='text-sm text-cyan-700'>
        <summary className='cursor-pointer select-none'>Anteprima contenuto</summary>
        <pre className='mt-2 bg-white p-3 rounded-lg shadow max-h-72 overflow-auto whitespace-pre-wrap break-all'>
          {result.html.slice(0, 5000)}
        </pre>
      </details>
    </div>
  );
}

const definition = {
  id: 'pdf-to-html',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica il PDF',
      helperText: 'Genera un file HTML a pagina singola con immagini embeddate.',
      accept: '.pdf',
      multiple: false,
      required: true,
    },
    {
      type: 'number',
      name: 'zoom',
      label: 'Zoom (%)',
      placeholder: '100',
      defaultValue: 100,
      min: 10,
      max: 500,
    },
    {
      type: 'number',
      name: 'firstPage',
      label: 'Prima pagina',
      min: 1,
    },
    {
      type: 'number',
      name: 'lastPage',
      label: 'Ultima pagina',
      min: 1,
    },
  ],
  ResultView,
  ctaLabel: 'Converti in HTML',
};

export default definition;



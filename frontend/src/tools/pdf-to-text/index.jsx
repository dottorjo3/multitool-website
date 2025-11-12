// 🔧 File: frontend/src/tools/pdf-to-text/index.jsx
// 🔗 Farm Ready — configurazione frontend per PDF to Text (advanced)

import React from 'react';

function ResultView({ result }) {
  if (!result?.text) {
    return null;
  }

  const download = () => {
    const link = document.createElement('a');
    link.href = `data:${result.outputFile.mimeType};base64,${result.outputFile.base64}`;
    link.download = result.outputFile.name;
    link.click();
  };

  return (
    <div className='bg-orange-50 border border-orange-200 rounded-lg p-4 space-y-3'>
      <h3 className='text-lg font-semibold text-orange-800'>Testo estratto</h3>
      <p className='text-sm text-orange-700'>
        Lunghezza testo: {result.length} caratteri
      </p>
      <button
        type='button'
        onClick={download}
        className='px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700'
      >
        Scarica TXT
      </button>
      <pre className='bg-white p-3 rounded-lg shadow max-h-96 overflow-auto whitespace-pre-wrap break-words text-sm text-gray-800'>
        {result.text.slice(0, 8000)}
      </pre>
    </div>
  );
}

const definition = {
  id: 'pdf-to-text',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica il PDF',
      helperText: 'Estrae testo preservando layout o in modalità raw.',
      accept: '.pdf',
      multiple: false,
      required: true,
    },
    {
      type: 'text',
      name: 'raw',
      label: 'Modalità raw (true/false)',
      defaultValue: 'false',
      helperText: 'True = ordina parole a flusso; False = tenta di mantenere layout.',
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
  ctaLabel: 'Estrai testo avanzato',
};

export default definition;



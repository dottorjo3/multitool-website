// 🔧 File: frontend/src/tools/pdf-flatten/index.jsx
// 🔗 NeoPanze — Appiattisci PDF (rimuove form fields e annotazioni)

import React from 'react';

function downloadBase64({ base64, name, mimeType }) {
  const link = document.createElement('a');
  link.href = `data:${mimeType};base64,${base64}`;
  link.download = name;
  link.click();
}

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  return (
    <div className='bg-green-50 border border-green-200 rounded-lg p-4 space-y-3'>
      <div>
        <h3 className='text-lg font-semibold text-green-800'>PDF appiattito con successo!</h3>
        <p className='text-sm text-green-700'>
          Pagine processate: {result.pagesFlattened || 0} • 
          Dimensione: {result.outputSizeBytes ? `${(result.outputSizeBytes / 1024).toFixed(2)} KB` : 'N/A'}
        </p>
        <p className='text-xs text-green-600 mt-2'>
          Il PDF ora contiene solo il contenuto visibile delle pagine, senza form fields o annotazioni modificabili.
        </p>
      </div>
      <button
        type='button'
        onClick={() => downloadBase64(result.outputFile)}
        className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition'
      >
        Scarica PDF appiattito
      </button>
    </div>
  );
}

const definition = {
  id: 'pdf-flatten',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica PDF da appiattire',
      helperText: 'Seleziona un file PDF con form fields o annotazioni da rimuovere (max 200 MB).',
      accept: '.pdf',
      multiple: false,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Appiattisci PDF',
};

export default definition;

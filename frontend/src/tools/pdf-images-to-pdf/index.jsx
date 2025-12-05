// 🔧 File: frontend/src/tools/pdf-images-to-pdf/index.jsx
// 🔗 NeoPanze — Crea PDF da immagini

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
        <h3 className='text-lg font-semibold text-green-800'>PDF creato con successo!</h3>
        <p className='text-sm text-green-700'>
          Pagine create: {result.pagesCreated || 0} • 
          Dimensione: {result.outputSizeBytes ? `${(result.outputSizeBytes / 1024).toFixed(2)} KB` : 'N/A'}
        </p>
      </div>
      <button
        type='button'
        onClick={() => downloadBase64(result.outputFile)}
        className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition'
      >
        Scarica PDF
      </button>
    </div>
  );
}

const definition = {
  id: 'pdf-images-to-pdf',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica immagini',
      helperText: 'Seleziona una o più immagini (JPG, PNG) da convertire in PDF. Ogni immagine diventerà una pagina.',
      accept: 'image/jpeg,image/png,image/jpg',
      multiple: true,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Crea PDF da immagini',
};

export default definition;

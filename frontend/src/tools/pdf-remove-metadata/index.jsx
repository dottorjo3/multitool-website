// 🔧 File: frontend/src/tools/pdf-remove-metadata/index.jsx
// 🔗 NeoPanze — Rimuovi metadati da PDF

import React from 'react';

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>
        Metadati rimossi. Dimensione finale: {(result.outputSizeBytes / 1024).toFixed(1)} KB
      </p>
    </div>
  );
}

const definition = {
  id: 'pdf-remove-metadata',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'PDF da ripulire',
      helperText: 'Carica un PDF per eliminare autore, titolo, soggetto e altre informazioni sensibili',
      accept: 'application/pdf',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Rimuovi metadati',
};

export default definition;



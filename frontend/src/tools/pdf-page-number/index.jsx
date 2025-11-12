// 🔧 File: frontend/src/tools/pdf-page-number/index.jsx
// 🔗 NeoPanze — Numerazione pagine PDF

import React from 'react';

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>
        Pagine numerate: {result.pages} • Dimensione finale: {(result.outputSizeBytes / 1024).toFixed(1)} KB
      </p>
    </div>
  );
}

const definition = {
  id: 'pdf-page-number',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'PDF da numerare',
      helperText: 'Carica un documento in cui aggiungere i numeri di pagina',
      accept: 'application/pdf',
      required: true,
    },
    {
      type: 'number',
      name: 'startNumber',
      label: 'Numero iniziale',
      defaultValue: 1,
      min: -9999,
      max: 999999,
    },
    {
      type: 'text',
      name: 'prefix',
      label: 'Prefisso (opzionale)',
      placeholder: 'Es. Pag.',
    },
    {
      type: 'select',
      name: 'position',
      label: 'Posizione',
      defaultValue: 'bottom-center',
      options: [
        { value: 'bottom-left', label: 'Basso sinistra' },
        { value: 'bottom-center', label: 'Basso centro' },
        { value: 'bottom-right', label: 'Basso destra' },
        { value: 'top-left', label: 'Alto sinistra' },
        { value: 'top-center', label: 'Alto centro' },
        { value: 'top-right', label: 'Alto destra' },
      ],
    },
    {
      type: 'number',
      name: 'fontSize',
      label: 'Dimensione font',
      defaultValue: 12,
      min: 6,
      max: 48,
    },
    {
      type: 'number',
      name: 'margin',
      label: 'Margine (px)',
      defaultValue: 24,
      min: 10,
      max: 100,
      helperText: 'Distanza dal bordo della pagina',
    },
  ],
  ResultView,
  ctaLabel: 'Aggiungi numeri di pagina',
};

export default definition;



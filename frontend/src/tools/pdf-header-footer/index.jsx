// 🔧 File: frontend/src/tools/pdf-header-footer/index.jsx
// 🔗 NeoPanze — Aggiungi intestazioni e piè di pagina al PDF

import React from 'react';

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>
        Header: {result.headerApplied ? 'applicato' : 'no'} • Footer: {result.footerApplied ? 'applicato' : 'no'}
      </p>
    </div>
  );
}

const definition = {
  id: 'pdf-header-footer',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'PDF da aggiornare',
      helperText: 'Carica il PDF su cui inserire header e/o footer',
      accept: 'application/pdf',
      required: true,
    },
    {
      type: 'text',
      name: 'headerText',
      label: 'Header (opzionale)',
      placeholder: 'Testo da mostrare in alto',
    },
    {
      type: 'text',
      name: 'footerText',
      label: 'Footer (opzionale)',
      placeholder: 'Testo da mostrare in basso',
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
      label: 'Margine dal bordo',
      defaultValue: 24,
      min: 10,
      max: 100,
    },
    {
      type: 'text',
      name: 'color',
      label: 'Colore (HEX)',
      defaultValue: '#333333',
      helperText: 'Es. #333333',
    },
  ],
  ResultView,
  ctaLabel: 'Applica header/footer',
};

export default definition;



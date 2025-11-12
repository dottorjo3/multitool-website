// 🔧 File: frontend/src/tools/pdf-reorder-pages/index.jsx
// 🔗 NeoPanze — Riordina pagine PDF

import React from 'react';

function ResultView({ result }) {
  if (!result?.order) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>
        Nuovo ordine: {result.order.join(', ')} • Pagine originali: {result.originalPages}
      </p>
    </div>
  );
}

const definition = {
  id: 'pdf-reorder-pages',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'PDF da riordinare',
      helperText: 'Carica il PDF per modificare l’ordine delle pagine',
      accept: 'application/pdf',
      required: true,
    },
    {
      type: 'text',
      name: 'order',
      label: 'Nuovo ordine',
      placeholder: 'Es. 3,1,2,4',
      helperText: 'Inserisci i numeri di pagina nell’ordine desiderato, separati da virgola',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Riordina pagine',
};

export default definition;



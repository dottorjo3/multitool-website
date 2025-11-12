// 🔧 File: frontend/src/tools/qr-generator/index.jsx
// 🔗 Farm Ready — UI generatore QR code

import React from 'react';

function ResultView({ result }) {
  if (!result?.output) {
    return null;
  }

  return (
    <div className='space-y-3 text-center'>
      <p className='text-sm text-slate-600'>
        Dimensione: {result.width}px • Margine: {result.margin}px
      </p>
      <div className='inline-block rounded-2xl border border-slate-200 bg-white p-4 shadow'>
        <img src={result.output} alt='QR code generato' className='mx-auto h-48 w-48 object-contain' />
      </div>
      <a
        href={result.output}
        download={`qr-${result.requestId}.png`}
        className='inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition'
      >
        Scarica PNG
      </a>
    </div>
  );
}

const definition = {
  id: 'qr-generator',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo / URL / JSON da codificare',
      rows: 4,
      required: true,
    },
    {
      type: 'number',
      name: 'width',
      label: 'Dimensione (px)',
      defaultValue: 512,
      min: 64,
      max: 1024,
    },
    {
      type: 'number',
      name: 'margin',
      label: 'Margine (px)',
      defaultValue: 2,
      min: 0,
      max: 20,
    },
    {
      type: 'text',
      name: 'colorDark',
      label: 'Colore scuro',
      defaultValue: '#000000',
    },
    {
      type: 'text',
      name: 'colorLight',
      label: 'Colore chiaro',
      defaultValue: '#FFFFFF',
    },
  ],
  ResultView,
  ctaLabel: 'Genera QR code',
};

export default definition;



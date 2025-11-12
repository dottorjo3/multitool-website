// 🔧 File: frontend/src/tools/image-watermark/index.jsx
// 🔗 Farm Ready — UI watermark testuale con controlli rapidi

import React from 'react';

function downloadFile({ base64, mimeType, name }) {
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
    <div className='bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-2'>
      <h3 className='text-lg font-semibold text-amber-800'>Watermark applicato</h3>
      <p className='text-sm text-amber-700'>
        Testo: “{result.text}” — Posizione: {result.position} — Opacità: {result.opacity}
      </p>
      <button
        type='button'
        onClick={() => downloadFile(result.outputFile)}
        className='px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition'
      >
        Scarica immagine watermark
      </button>
    </div>
  );
}

const definition = {
  id: 'image-watermark',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica immagine',
      helperText: 'Supporta JPG, PNG, WebP, AVIF, TIFF (max 200 MB).',
      accept: '.jpg,.jpeg,.png,.webp,.avif,.tiff,.tif',
      multiple: false,
      required: true,
    },
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo del watermark',
      placeholder: 'Es. BIBBLE 2.0 – Tool Empire',
      required: true,
      rows: 2,
    },
    {
      type: 'select',
      name: 'position',
      label: 'Posizione',
      defaultValue: 'center',
      options: [
        { value: 'center', label: 'Centrale' },
        { value: 'top-left', label: 'In alto a sinistra' },
        { value: 'top-right', label: 'In alto a destra' },
        { value: 'bottom-left', label: 'In basso a sinistra' },
        { value: 'bottom-right', label: 'In basso a destra' },
      ],
    },
    {
      type: 'number',
      name: 'opacity',
      label: 'Opacità (0-1)',
      defaultValue: 0.35,
      min: 0,
      max: 1,
      step: 0.05,
      helperText: '0 = trasparente, 1 = opaco',
    },
    {
      type: 'number',
      name: 'fontSize',
      label: 'Dimensione testo (px)',
      defaultValue: 64,
      min: 12,
      max: 300,
    },
    {
      type: 'number',
      name: 'angle',
      label: 'Angolo (gradi)',
      defaultValue: -35,
      min: -180,
      max: 180,
    },
    {
      type: 'text',
      name: 'color',
      label: 'Colore (hex)',
      defaultValue: '#FFFFFF',
      placeholder: '#FFFFFF',
    },
  ],
  ResultView,
  ctaLabel: 'Applica watermark',
};

export default definition;



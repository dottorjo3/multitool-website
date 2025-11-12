// 🔧 File: frontend/src/tools/image-overlay-text/index.jsx
// 🔗 NeoPanze — Overlay testo

import React from 'react';

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>
        Posizione: {result.position} • Font size: {result.fontSize}px • Colore: {result.color} • Opacità: {result.opacity}
      </p>
      <img
        src={`data:${result.outputFile.mimeType};base64,${result.outputFile.base64}`}
        alt='Anteprima overlay'
        className='max-h-96 rounded-xl border border-slate-200 shadow-sm'
      />
    </div>
  );
}

const definition = {
  id: 'image-overlay-text',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Immagine',
      helperText: 'Carica l’immagine su cui sovrapporre il testo',
      accept: 'image/*',
      required: true,
    },
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo da sovrapporre',
      placeholder: 'Es. Bibble 2.0 Tool Empire',
      rows: 3,
      required: true,
    },
    {
      type: 'select',
      name: 'position',
      label: 'Posizione',
      defaultValue: 'center',
      options: [
        { value: 'top-left', label: 'Alto sinistra' },
        { value: 'top-right', label: 'Alto destra' },
        { value: 'center', label: 'Centro' },
        { value: 'bottom-left', label: 'Basso sinistra' },
        { value: 'bottom-right', label: 'Basso destra' },
      ],
    },
    {
      type: 'number',
      name: 'fontSize',
      label: 'Dimensione font',
      defaultValue: 48,
      min: 8,
      max: 200,
    },
    {
      type: 'text',
      name: 'color',
      label: 'Colore (HEX)',
      defaultValue: '#FFFFFF',
    },
    {
      type: 'number',
      name: 'opacity',
      label: 'Opacità (0-1)',
      defaultValue: 0.9,
      min: 0,
      max: 1,
      step: 0.1,
    },
    {
      type: 'number',
      name: 'padding',
      label: 'Padding (px)',
      defaultValue: 20,
      min: 0,
      max: 200,
    },
  ],
  ResultView,
  ctaLabel: 'Sovrapponi testo',
};

export default definition;



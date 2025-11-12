// 🔧 File: frontend/src/tools/video-thumbnail/index.jsx
// 🔗 NeoPanze — Video Thumbnail Extractor

import React from 'react';

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>
        Thumbnail estratto a {result.timestamp} {result.width ? `• Larghezza: ${result.width}px` : ''}
      </p>
      <img
        src={`data:${result.outputFile.mimeType};base64,${result.outputFile.base64}`}
        alt='Anteprima thumbnail'
        className='max-h-96 rounded-xl border border-slate-200 shadow-sm'
      />
    </div>
  );
}

const definition = {
  id: 'video-thumbnail',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Video sorgente',
      helperText: 'Carica un video dal quale estrarre il frame',
      accept: 'video/*',
      required: true,
    },
    {
      type: 'text',
      name: 'timestamp',
      label: 'Timestamp (HH:MM:SS)',
      defaultValue: '00:00:01',
    },
    {
      type: 'number',
      name: 'width',
      label: 'Larghezza output (opzionale)',
      helperText: 'Lascia vuoto per mantenere proporzioni originali',
      min: 16,
      max: 3840,
    },
    {
      type: 'select',
      name: 'format',
      label: 'Formato',
      defaultValue: 'jpg',
      options: [
        { value: 'jpg', label: 'JPG' },
        { value: 'png', label: 'PNG' },
        { value: 'webp', label: 'WEBP' },
      ],
    },
  ],
  ResultView,
  ctaLabel: 'Estrai thumbnail',
};

export default definition;



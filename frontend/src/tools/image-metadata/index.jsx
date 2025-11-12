// 🔧 File: frontend/src/tools/image-metadata/index.jsx
// 🔗 Farm Ready — Visualizza metadata e permette la pulizia

import React from 'react';

function formatMetadata(metadata) {
  if (!metadata) return null;
  return [
    { label: 'Formato', value: metadata.format },
    { label: 'Dimensioni', value: `${metadata.width}×${metadata.height}` },
    { label: 'Spazio colore', value: metadata.space },
    { label: 'DPI', value: metadata.density },
    { label: 'Profilo ICC', value: metadata.hasProfile ? 'presente' : 'assente' },
    { label: 'EXIF', value: metadata.hasExif ? 'presente' : 'assente' },
    { label: 'Orientamento', value: metadata.orientation || 'n/d' },
    { label: 'Dimensione file', value: `${(metadata.sizeBytes / 1024).toFixed(1)} KB` },
  ];
}

function download(cleaned) {
  const link = document.createElement('a');
  link.href = `data:${cleaned.mimeType};base64,${cleaned.base64}`;
  link.download = cleaned.name;
  link.click();
}

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  const items = formatMetadata(result.metadata);

  return (
    <div className='bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4'>
      <div>
        <h3 className='text-lg font-semibold text-slate-800'>Metadata immagine</h3>
        <p className='text-sm text-slate-600'>File analizzato: {result.originalName}</p>
      </div>

      <dl className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        {items?.map((item) => (
          <div key={item.label} className='bg-white rounded-lg border border-slate-100 px-3 py-2'>
            <dt className='text-xs uppercase tracking-wide text-slate-500'>{item.label}</dt>
            <dd className='text-sm font-medium text-slate-800'>{item.value}</dd>
          </div>
        ))}
      </dl>

      {result.cleaned && (
        <div className='bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-2'>
          <p className='text-sm text-emerald-700'>
            Metadata rimossi. Nuova dimensione: {(result.cleaned.outputSizeBytes / 1024).toFixed(1)} KB
          </p>
          <button
            type='button'
            onClick={() => download(result.cleaned)}
            className='px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition'
          >
            Scarica immagine pulita
          </button>
        </div>
      )}
    </div>
  );
}

const definition = {
  id: 'image-metadata',
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
      type: 'checkbox',
      name: 'clean',
      label: 'Rimuovi metadata',
      helperText: 'Genera una copia senza EXIF/ICC',
      defaultValue: 'false',
    },
  ],
  ResultView,
  ctaLabel: 'Analizza immagine',
};

export default definition;



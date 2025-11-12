// 🔧 File: frontend/src/tools/image-compress/index.jsx
// 🔗 Farm Ready — UI compressione con indicatore rapporto

import React from 'react';

function download({ base64, mimeType, name }) {
  const link = document.createElement('a');
  link.href = `data:${mimeType};base64,${base64}`;
  link.download = name;
  link.click();
}

function formatSize(bytes) {
  if (!bytes && bytes !== 0) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function ResultView({ result }) {
  if (!result?.outputFile) {
    return null;
  }

  const saved = result.originalSizeBytes - result.outputSizeBytes;
  const savedPercent = result.originalSizeBytes
    ? Math.max(0, (saved / result.originalSizeBytes) * 100).toFixed(1)
    : null;

  return (
    <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2'>
      <h3 className='text-lg font-semibold text-blue-800'>Compressione completata</h3>
      <p className='text-sm text-blue-700'>
        Originale: {formatSize(result.originalSizeBytes)} → Nuovo: {formatSize(result.outputSizeBytes)}{' '}
        {savedPercent !== null && <span>(- {savedPercent}% circa)</span>}
      </p>
      <button
        type='button'
        onClick={() => download(result.outputFile)}
        className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
      >
        Scarica immagine compressa
      </button>
    </div>
  );
}

const definition = {
  id: 'image-compress',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Carica immagine',
      helperText: 'Formati supportati: JPG, PNG, WebP, AVIF (max 200 MB).',
      accept: '.jpg,.jpeg,.png,.webp,.avif',
      multiple: false,
      required: true,
    },
    {
      type: 'number',
      name: 'quality',
      label: 'Qualità (1-100)',
      defaultValue: 75,
      min: 1,
      max: 100,
      helperText: 'Valori più bassi = file più leggero',
    },
    {
      type: 'select',
      name: 'format',
      label: 'Formato uscita',
      defaultValue: 'jpeg',
      options: [
        { value: 'jpeg', label: 'JPEG (universale)' },
        { value: 'png', label: 'PNG (lossless)' },
        { value: 'webp', label: 'WebP (modern web)' },
        { value: 'avif', label: 'AVIF (massima compressione)' },
      ],
    },
  ],
  ResultView,
  ctaLabel: 'Comprimi immagine',
};

export default definition;



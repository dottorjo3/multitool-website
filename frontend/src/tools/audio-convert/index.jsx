// 🔧 File: frontend/src/tools/audio-convert/index.jsx
// 🔗 NeoPanze — Conversione formati audio

import React, { useMemo } from 'react';

function useDownloadLink(result) {
  return useMemo(() => {
    if (!result?.outputFile?.base64) {
      return null;
    }
    return `data:${result.outputFile.mimeType};base64,${result.outputFile.base64}`;
  }, [result]);
}

function ResultView({ result }) {
  const downloadHref = useDownloadLink(result);

  if (!result?.outputFile) {
    return null;
  }

  const originalSizeMB = result.originalSize ? (result.originalSize / (1024 * 1024)).toFixed(2) : 'N/A';
  const outputSizeMB = result.outputSizeBytes ? (result.outputSizeBytes / (1024 * 1024)).toFixed(2) : 'N/A';

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>
        Da {result.originalFormat?.toUpperCase() || 'N/A'} a {result.targetFormat?.toUpperCase() || 'N/A'} • 
        Originale: {originalSizeMB} MB • Convertito: {outputSizeMB} MB
      </p>
      {downloadHref && (
        <a
          href={downloadHref}
          download={result.outputFile.name}
          className='inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition'
        >
          Scarica audio convertito
        </a>
      )}
    </div>
  );
}

const definition = {
  id: 'audio-convert',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'File audio da convertire',
      helperText: 'MP3, WAV, OGG, AAC, FLAC, M4A',
      accept: 'audio/*',
      required: true,
    },
    {
      type: 'select',
      name: 'format',
      label: 'Formato destinazione',
      defaultValue: 'mp3',
      options: [
        { value: 'mp3', label: 'MP3 (compatibile)' },
        { value: 'wav', label: 'WAV (senza perdita)' },
        { value: 'ogg', label: 'OGG (Vorbis)' },
        { value: 'aac', label: 'AAC' },
        { value: 'flac', label: 'FLAC (lossless)' },
        { value: 'm4a', label: 'M4A (AAC)' },
      ],
    },
    {
      type: 'number',
      name: 'bitrate',
      label: 'Bitrate (kbps)',
      defaultValue: 192,
      min: 64,
      max: 512,
      helperText: 'Più alto = migliore qualità (e file più grande)',
    },
  ],
  ResultView,
  ctaLabel: 'Converti audio',
};

export default definition;



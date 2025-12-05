// 🔧 File: frontend/src/tools/audio-compress/index.jsx
// 🔗 NeoPanze — Comprimi file audio

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
  const compressionRatio = result.originalSize && result.outputSizeBytes 
    ? ((1 - result.outputSizeBytes / result.originalSize) * 100).toFixed(1) 
    : 'N/A';

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>
        Compressione: {compressionRatio}% • Originale: {originalSizeMB} MB → Compresso: {outputSizeMB} MB
      </p>
      {downloadHref && (
        <a
          href={downloadHref}
          download={result.outputFile.name}
          className='inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition'
        >
          Scarica audio compresso
        </a>
      )}
    </div>
  );
}

const definition = {
  id: 'audio-compress',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'File audio da comprimere',
      helperText: 'MP3, WAV, OGG, AAC, FLAC, M4A',
      accept: 'audio/*',
      required: true,
    },
    {
      type: 'number',
      name: 'bitrate',
      label: 'Bitrate target (kbps)',
      defaultValue: 128,
      min: 64,
      max: 320,
      helperText: 'Più basso = file più piccolo ma qualità inferiore',
    },
  ],
  ResultView,
  ctaLabel: 'Comprimi audio',
};

export default definition;



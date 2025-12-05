// 🔧 File: frontend/src/tools/video-mute/index.jsx
// 🔗 NeoPanze — Rimuovi audio da video

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
        Audio rimosso • Originale: {originalSizeMB} MB → Mutato: {outputSizeMB} MB
      </p>
      {downloadHref && (
        <a
          href={downloadHref}
          download={result.outputFile.name}
          className='inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition'
        >
          Scarica video muto
        </a>
      )}
    </div>
  );
}

const definition = {
  id: 'video-mute',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Video da mutare',
      helperText: 'Il video verrà salvato senza traccia audio',
      accept: 'video/*',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Rimuovi audio',
};

export default definition;



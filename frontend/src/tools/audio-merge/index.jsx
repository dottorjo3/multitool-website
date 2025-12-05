// 🔧 File: frontend/src/tools/audio-merge/index.jsx
// 🔗 NeoPanze — Unisci più file audio

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

  const totalSizeMB = result.totalOriginalSize ? (result.totalOriginalSize / (1024 * 1024)).toFixed(2) : 'N/A';
  const outputSizeMB = result.outputSizeBytes ? (result.outputSizeBytes / (1024 * 1024)).toFixed(2) : 'N/A';

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>
        Uniti {result.filesCount || 0} file • Dimensione totale: {totalSizeMB} MB → {outputSizeMB} MB
      </p>
      {downloadHref && (
        <a
          href={downloadHref}
          download={result.outputFile.name}
          className='inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition'
        >
          Scarica audio unito
        </a>
      )}
    </div>
  );
}

const definition = {
  id: 'audio-merge',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'File audio da unire',
      helperText: 'Carica almeno 2 file audio (stesso formato consigliato)',
      accept: 'audio/*',
      multiple: true,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Unisci audio',
};

export default definition;



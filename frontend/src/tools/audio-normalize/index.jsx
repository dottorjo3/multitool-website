// 🔧 File: frontend/src/tools/audio-normalize/index.jsx
// 🔗 NeoPanze — Normalizza volume audio

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

  return (
    <div className='space-y-3'>
      <p className='text-sm text-slate-600'>
        Volume normalizzato {result.targetLevel ? `a ${result.targetLevel} dB` : ''}
      </p>
      {downloadHref && (
        <a
          href={downloadHref}
          download={result.outputFile.name}
          className='inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition'
        >
          Scarica audio normalizzato
        </a>
      )}
    </div>
  );
}

const definition = {
  id: 'audio-normalize',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'File audio da normalizzare',
      helperText: 'Normalizza il volume a un livello costante',
      accept: 'audio/*',
      required: true,
    },
    {
      type: 'number',
      name: 'targetLevel',
      label: 'Livello target (dB)',
      defaultValue: -23,
      min: -60,
      max: 0,
      helperText: 'Standard: -23 dB (EBU R128)',
    },
  ],
  ResultView,
  ctaLabel: 'Normalizza audio',
};

export default definition;



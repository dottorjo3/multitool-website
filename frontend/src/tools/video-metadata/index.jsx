// 🔧 File: frontend/src/tools/video-metadata/index.jsx
// 🔗 NeoPanze — Metadati Video

import React from 'react';

function InfoRow({ label, value }) {
  if (value === undefined || value === null || value === '') {
    return null;
  }
  return (
    <div className='flex justify-between text-sm text-slate-600 border-b border-slate-100 py-1'>
      <span className='font-medium text-slate-700'>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <div className='rounded-xl border border-slate-200 shadow-sm p-4 space-y-2'>
        <h3 className='text-sm font-semibold text-slate-700 uppercase tracking-wide'>Formato</h3>
        <InfoRow label='File' value={result.format.filename} />
        <InfoRow label='Durata (s)' value={result.format.durationSeconds} />
        <InfoRow label='Dimensione (byte)' value={result.format.sizeBytes} />
        <InfoRow label='Bitrate' value={result.format.bitRate} />
        <InfoRow label='Descrizione' value={result.format.formatLongName} />
      </div>
      {result.video && (
        <div className='rounded-xl border border-slate-200 shadow-sm p-4 space-y-2'>
          <h3 className='text-sm font-semibold text-slate-700 uppercase tracking-wide'>Video</h3>
          <InfoRow label='Codec' value={result.video.codec} />
          <InfoRow label='Risoluzione' value={`${result.video.width}×${result.video.height}`} />
          <InfoRow label='Frame rate' value={result.video.frameRate} />
          <InfoRow label='Bitrate' value={result.video.bitRate} />
        </div>
      )}
      {result.audio && (
        <div className='rounded-xl border border-slate-200 shadow-sm p-4 space-y-2'>
          <h3 className='text-sm font-semibold text-slate-700 uppercase tracking-wide'>Audio</h3>
          <InfoRow label='Codec' value={result.audio.codec} />
          <InfoRow label='Canali' value={result.audio.channels} />
          <InfoRow label='Sample rate' value={result.audio.sampleRate} />
          <InfoRow label='Bitrate' value={result.audio.bitRate} />
        </div>
      )}
      <details className='text-xs text-slate-500'>
        <summary className='cursor-pointer font-semibold text-slate-600'>JSON completo</summary>
        <pre className='mt-2 bg-slate-900 text-slate-50 p-3 rounded-lg overflow-auto max-h-64'>
          {JSON.stringify(result.raw, null, 2)}
        </pre>
      </details>
    </div>
  );
}

const definition = {
  id: 'video-metadata',
  fields: [
    {
      type: 'file',
      name: 'file',
      label: 'Video',
      helperText: 'Carica un video per leggere i metadati',
      accept: 'video/*',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Estrai metadati',
};

export default definition;



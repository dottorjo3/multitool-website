// 🔧 File: frontend/src/tools/developer-semver-parser/index.jsx
// 🔗 NeoPanze — SemVer Parser

import React from 'react';

function ResultView({ result }) {
  if (!result) return null;

  return (
    <div className='space-y-3 text-sm text-slate-600'>
      <div className='flex flex-wrap gap-3'>
        <span className='bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold'>
          {result.version}
        </span>
        <span className='bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold'>
          {result.stable ? 'Stable' : 'Pre-release'}
        </span>
      </div>
      <div className='grid grid-cols-3 gap-3'>
        <div className='bg-slate-100 text-slate-700 rounded-xl p-4 text-center'>
          <p className='text-xs uppercase font-semibold'>Major</p>
          <p className='text-xl font-bold'>{result.major}</p>
        </div>
        <div className='bg-slate-100 text-slate-700 rounded-xl p-4 text-center'>
          <p className='text-xs uppercase font-semibold'>Minor</p>
          <p className='text-xl font-bold'>{result.minor}</p>
        </div>
        <div className='bg-slate-100 text-slate-700 rounded-xl p-4 text-center'>
          <p className='text-xs uppercase font-semibold'>Patch</p>
          <p className='text-xl font-bold'>{result.patch}</p>
        </div>
      </div>
      <div className='rounded-xl border border-slate-200 bg-white divide-y text-xs'>
        <div className='px-4 py-2 flex justify-between'>
          <span className='font-semibold text-slate-700'>Prerelease</span>
          <span className='text-slate-500'>{result.prerelease.join('.') || '—'}</span>
        </div>
        <div className='px-4 py-2 flex justify-between'>
          <span className='font-semibold text-slate-700'>Build metadata</span>
          <span className='text-slate-500'>{result.buildMetadata.join('.') || '—'}</span>
        </div>
      </div>
    </div>
  );
}

const definition = {
  id: 'developer-semver-parser',
  fields: [
    {
      type: 'text',
      name: 'version',
      label: 'Versione SemVer',
      placeholder: '1.2.3-beta+build',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Analizza versione',
};

export default definition;



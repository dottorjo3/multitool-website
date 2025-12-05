// 🔧 File: frontend/src/tools/ai-keyword-extractor/index.jsx
// 🔗 Estrattore keyword AI

import React from 'react';

function ResultView({ result }) {
  if (!result?.keywords) return null;

  return (
    <div className='space-y-4'>
      <div className='text-sm text-slate-600'>
        <p>Keyword trovate: {result.count}</p>
        {result.provider && result.provider !== 'mock' && (
          <p className='text-xs text-slate-500 mt-1'>Provider: {result.provider} | Model: {result.model}</p>
        )}
      </div>

      <div className='space-y-2'>
        {result.keywords.map((kw, idx) => (
          <div key={idx} className='flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg'>
            <div className='flex-1'>
              <span className='font-medium text-slate-900'>{kw.word}</span>
              {kw.count && <span className='ml-2 text-xs text-slate-500'>({kw.count} occorrenze)</span>}
            </div>
            {kw.relevance && (
              <div className='text-sm text-blue-600 font-semibold'>
                {(kw.relevance * 100).toFixed(1)}%
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const definition = {
  id: 'ai-keyword-extractor',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo da analizzare',
      placeholder: 'Inserisci il testo da cui estrarre le keyword...',
      required: true,
      rows: 8,
    },
    {
      type: 'number',
      name: 'maxKeywords',
      label: 'Numero massimo keyword',
      defaultValue: 10,
      min: 1,
      max: 50,
      helperText: 'Numero di keyword da estrarre (1-50)',
    },
  ],
  ResultView,
  ctaLabel: 'Estrai keyword',
};

export default definition;



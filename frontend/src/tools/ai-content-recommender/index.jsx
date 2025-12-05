// 🔧 File: frontend/src/tools/ai-content-recommender/index.jsx
// 🔗 Raccomandatore contenuti AI

import React from 'react';

function ResultView({ result }) {
  if (!result?.recommendations) return null;

  return (
    <div className='space-y-4'>
      <div className='text-sm text-slate-600'>
        <p>Raccomandazioni: {result.count}</p>
        <p>Tipo contenuto: {result.contentType}</p>
        {result.provider && result.provider !== 'mock' && (
          <p className='text-xs text-slate-500 mt-1'>Provider: {result.provider} | Model: {result.model}</p>
        )}
      </div>

      <div className='space-y-3'>
        {result.recommendations.map((rec, idx) => (
          <div key={idx} className='p-4 bg-white border border-slate-200 rounded-lg'>
            <div className='flex items-start justify-between mb-2'>
              <h3 className='font-semibold text-slate-900'>{rec.title}</h3>
              {rec.relevance && (
                <span className='text-sm text-blue-600 font-semibold'>
                  {(rec.relevance * 100).toFixed(0)}%
                </span>
              )}
            </div>
            {rec.type && (
              <span className='inline-block mb-2 px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded'>
                {rec.type}
              </span>
            )}
            {rec.description && (
              <p className='text-sm text-slate-600 mt-2'>{rec.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const definition = {
  id: 'ai-content-recommender',
  fields: [
    {
      type: 'text',
      name: 'topic',
      label: 'Argomento',
      placeholder: 'Es. Machine Learning per principianti',
      required: true,
    },
    {
      type: 'select',
      name: 'contentType',
      label: 'Tipo contenuto',
      defaultValue: 'article',
      options: [
        { value: 'article', label: 'Articolo' },
        { value: 'video', label: 'Video' },
        { value: 'post', label: 'Post' },
        { value: 'tutorial', label: 'Tutorial' },
      ],
    },
    {
      type: 'number',
      name: 'numRecommendations',
      label: 'Numero raccomandazioni',
      defaultValue: 5,
      min: 1,
      max: 10,
      helperText: 'Numero di raccomandazioni da generare (1-10)',
    },
  ],
  ResultView,
  ctaLabel: 'Genera raccomandazioni',
};

export default definition;



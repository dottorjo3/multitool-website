// 🔧 File: frontend/src/tools/ai-language-detector/index.jsx
// 🔗 Rilevatore lingua AI

import React from 'react';

function ResultView({ result }) {
  if (!result) return null;

  const getLanguageFlag = (lang) => {
    const flags = { it: '🇮🇹', en: '🇬🇧', es: '🇪🇸', fr: '🇫🇷', de: '🇩🇪' };
    return flags[lang] || '🌐';
  };

  return (
    <div className='space-y-4'>
      <div className='p-4 bg-white border border-blue-200 rounded-lg text-center'>
        <div className='text-4xl mb-2'>{getLanguageFlag(result.language)}</div>
        <div className='text-2xl font-bold text-slate-900 mb-1'>{result.languageName || result.language}</div>
        <div className='text-sm text-slate-600'>Confidenza: {(result.confidence * 100).toFixed(1)}%</div>
        <div className='w-full bg-slate-200 rounded-full h-2 mt-3'>
          <div
            className='bg-blue-600 h-2 rounded-full'
            style={{ width: `${(result.confidence * 100).toFixed(0)}%` }}
          />
        </div>
      </div>

      {result.alternativeLanguages && result.alternativeLanguages.length > 0 && (
        <div>
          <h3 className='text-sm font-semibold text-slate-700 mb-2'>Lingue alternative:</h3>
          <div className='space-y-2'>
            {result.alternativeLanguages.map((alt, idx) => (
              <div key={idx} className='flex items-center justify-between p-2 bg-slate-50 rounded'>
                <span>{alt.language} ({alt.name})</span>
                <span className='text-sm text-slate-600'>{(alt.confidence * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {result.provider && result.provider !== 'mock' && (
        <div className='text-xs text-slate-500'>Provider: {result.provider} | Model: {result.model}</div>
      )}
    </div>
  );
}

const definition = {
  id: 'ai-language-detector',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo da analizzare',
      placeholder: 'Inserisci il testo di cui vuoi rilevare la lingua...',
      required: true,
      rows: 6,
    },
  ],
  ResultView,
  ctaLabel: 'Rileva lingua',
};

export default definition;



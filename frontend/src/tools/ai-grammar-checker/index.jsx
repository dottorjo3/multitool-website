// 🔧 File: frontend/src/tools/ai-grammar-checker/index.jsx
// 🔗 Controllo grammatica AI

import React from 'react';

function ResultView({ result }) {
  if (!result) return null;

  return (
    <div className='space-y-4'>
      {result.errorsFound > 0 && (
        <div className='p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800'>
          <p>Trovati {result.errorsFound} errori da correggere</p>
        </div>
      )}

      {result.errorsFound === 0 && (
        <div className='p-3 bg-green-50 border border-green-200 rounded-lg text-green-800'>
          <p>Nessun errore trovato! Il testo è corretto.</p>
        </div>
      )}

      <div className='space-y-4'>
        {result.original && (
          <div>
            <h3 className='text-sm font-semibold text-slate-700 mb-2'>Testo originale:</h3>
            <div className='p-4 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 whitespace-pre-wrap'>
              {result.original}
            </div>
          </div>
        )}

        {result.corrected && result.corrected !== result.original && (
          <div>
            <h3 className='text-sm font-semibold text-slate-700 mb-2'>Testo corretto:</h3>
            <div className='p-4 bg-white border border-green-200 rounded-lg text-slate-900 whitespace-pre-wrap'>
              {result.corrected}
            </div>
          </div>
        )}

        {result.corrections && result.corrections.length > 0 && (
          <div>
            <h3 className='text-sm font-semibold text-slate-700 mb-2'>Correzioni applicate:</h3>
            <ul className='space-y-2'>
              {result.corrections.map((corr, idx) => (
                <li key={idx} className='p-3 bg-white border border-slate-200 rounded-lg text-sm'>
                  <span className='font-medium'>{corr.original}</span> → <span className='text-green-600'>{corr.corrected}</span>
                  {corr.explanation && <div className='text-xs text-slate-500 mt-1'>{corr.explanation}</div>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {result.provider && result.provider !== 'mock' && (
        <div className='text-xs text-slate-500'>Provider: {result.provider} | Model: {result.model}</div>
      )}
    </div>
  );
}

const definition = {
  id: 'ai-grammar-checker',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo da controllare',
      placeholder: 'Inserisci il testo da controllare e correggere...',
      required: true,
      rows: 8,
    },
  ],
  ResultView,
  ctaLabel: 'Controlla grammatica',
};

export default definition;



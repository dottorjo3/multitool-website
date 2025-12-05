// 🔧 File: frontend/src/tools/text-url-extractor/index.jsx
// 🔗 NeoPanze — URL Extractor (Advanced)

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  if (result.total !== undefined) {
    // Modalità "all"
    return (
      <div className='space-y-4 text-sm text-slate-600'>
        <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
          <p className='font-semibold text-indigo-900'>
            Totale trovato: <span className='text-indigo-600'>{result.total}</span>
          </p>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='border border-slate-200 rounded-lg p-4'>
            <h3 className='font-semibold text-slate-900 mb-2'>
              URL completi ({result.fullUrls.count})
            </h3>
            <div className='max-h-48 overflow-y-auto space-y-1'>
              {result.fullUrls.urls.map((url, index) => (
                <a 
                  key={index}
                  href={url} 
                  target='_blank' 
                  rel='noopener noreferrer'
                  className='block text-xs text-indigo-600 hover:text-indigo-800 break-all'
                >
                  {url}
                </a>
              ))}
            </div>
          </div>
          
          <div className='border border-slate-200 rounded-lg p-4'>
            <h3 className='font-semibold text-slate-900 mb-2'>
              Domini ({result.domains.count})
            </h3>
            <div className='max-h-48 overflow-y-auto space-y-1'>
              {result.domains.domains.map((domain, index) => (
                <p key={index} className='text-xs font-mono text-slate-700 break-all'>
                  {domain}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (result.domains !== undefined) {
    // Modalità "domains"
    return (
      <div className='space-y-4 text-sm text-slate-600'>
        <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
          <p className='font-semibold text-indigo-900'>
            Domini trovati: <span className='text-indigo-600'>{result.count}</span>
          </p>
        </div>
        <div className='max-h-96 overflow-y-auto border border-slate-200 rounded-lg p-4 space-y-2'>
          {result.domains.map((domain, index) => (
            <p key={index} className='p-2 bg-slate-50 rounded font-mono text-sm text-slate-900'>
              {domain}
            </p>
          ))}
        </div>
      </div>
    );
  }

  // Modalità "full" (default)
  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg'>
        <p className='font-semibold text-indigo-900'>
          URL trovati: <span className='text-indigo-600'>{result.count}</span>
        </p>
      </div>
      <div className='max-h-96 overflow-y-auto border border-slate-200 rounded-lg p-4 space-y-2'>
        {result.urls.map((url, index) => (
          <a 
            key={index}
            href={url} 
            target='_blank' 
            rel='noopener noreferrer'
            className='block p-2 bg-slate-50 rounded text-sm text-indigo-600 hover:text-indigo-800 break-all'
          >
            {url}
          </a>
        ))}
      </div>
    </div>
  );
}

const definition = {
  id: 'text-url-extractor',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da analizzare',
      placeholder: 'Inserisci il testo da cui estrarre gli URL...',
      rows: 8,
      required: true,
    },
    {
      type: 'select',
      name: 'extractType',
      label: 'Tipo di estrazione',
      options: [
        { value: 'full', label: 'Solo URL completi (http://...)' },
        { value: 'domains', label: 'Solo domini' },
        { value: 'all', label: 'Entrambi' },
      ],
      defaultValue: 'full',
    },
  ],
  ResultView,
  ctaLabel: 'Estrai URL',
};

export default definition;


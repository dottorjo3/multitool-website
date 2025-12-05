// 🔧 File: frontend/src/tools/text-extract-ips/index.jsx
// 🔗 NeoPanze — Extract IPs

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4 text-sm text-slate-600'>
      <div className='p-4 bg-indigo-50 border border-indigo-100 rounded-lg space-y-2'>
        <p className='font-semibold text-indigo-900'>
          Indirizzi IP trovati: <span className='text-indigo-600'>{result.count}</span>
        </p>
        {result.count > 0 && (
          <div className='flex gap-4 text-sm text-indigo-700'>
            <span>IPv4: {result.ipv4Count}</span>
            <span>IPv6: {result.ipv6Count}</span>
          </div>
        )}
      </div>
      
      {result.count > 0 ? (
        <div className='space-y-2'>
          <h3 className='font-semibold text-slate-900'>Elenco indirizzi IP:</h3>
          <div className='max-h-96 overflow-y-auto border border-slate-200 rounded-lg p-4 space-y-2'>
            {result.ipsWithDetails.map((item, index) => (
              <div key={index} className='p-2 bg-slate-50 rounded border border-slate-200 flex items-center justify-between'>
                <span className='font-mono text-sm text-slate-900'>{item.ip}</span>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  item.type === 'IPv4' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className='text-slate-500'>Nessun indirizzo IP trovato nel testo.</p>
      )}
    </div>
  );
}

const definition = {
  id: 'text-extract-ips',
  fields: [
    {
      type: 'textarea',
      name: 'input',
      label: 'Testo da analizzare',
      placeholder: 'Inserisci il testo da cui estrarre gli indirizzi IP...',
      rows: 8,
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Estrai IP',
};

export default definition;


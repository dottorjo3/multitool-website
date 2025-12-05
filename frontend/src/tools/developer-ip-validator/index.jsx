// 🔧 File: frontend/src/tools/developer-ip-validator/index.jsx
// 🔗 NeoPanze — IP Validator

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className='space-y-4'>
      {result.isValid ? (
        <div className='p-4 bg-green-50 border border-green-200 rounded-lg'>
          <p className='font-semibold text-green-900 mb-2'>✓ IP Valido</p>
          <div className='space-y-2'>
            <p className='text-2xl font-bold text-green-600'>{result.ip}</p>
            <div className='flex gap-4 text-sm text-green-700'>
              <span>Tipo: <span className='font-semibold'>{result.type}</span></span>
              {result.isIPv4 && <span className='px-2 py-1 bg-green-100 rounded'>IPv4</span>}
              {result.isIPv6 && <span className='px-2 py-1 bg-green-100 rounded'>IPv6</span>}
            </div>
          </div>
        </div>
      ) : (
        <div className='p-4 bg-red-50 border border-red-200 rounded-lg'>
          <p className='font-semibold text-red-900 mb-2'>✗ IP Non Valido</p>
          <p className='text-sm text-red-700'>{result.ip}</p>
          <p className='text-xs text-red-600 mt-2'>
            Inserisci un indirizzo IPv4 (es: 192.168.1.1) o IPv6 valido
          </p>
        </div>
      )}
    </div>
  );
}

const definition = {
  id: 'developer-ip-validator',
  fields: [
    {
      type: 'text',
      name: 'input',
      label: 'Indirizzo IP',
      placeholder: '192.168.1.1 o 2001:0db8:85a3::8a2e:0370:7334',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Valida IP',
};

export default definition;



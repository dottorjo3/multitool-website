// 🔧 File: frontend/src/tools/security-password-strength-checker/index.jsx
// 🔗 NeoPanze — Password Strength Checker

import React from 'react';

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  const strengthColor = {
    'Debole': 'red',
    'Media': 'amber',
    'Forte': 'green',
  }[result.strength] || 'red';

  const progressPercentage = (result.score / result.maxScore) * 100;

  return (
    <div className='space-y-4'>
      <div className={`p-4 bg-${strengthColor}-50 border border-${strengthColor}-100 rounded-lg`}>
        <p className={`font-semibold text-${strengthColor}-900 mb-2`}>
          Robustezza: <span className='text-lg'>{result.strength}</span>
        </p>
        <div className='mb-2'>
          <div className='w-full bg-gray-200 rounded-full h-2'>
            <div
              className={`bg-${strengthColor}-600 h-2 rounded-full transition-all`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        <p className='text-sm text-slate-700'>
          Punteggio: {result.score}/{result.maxScore}
        </p>
      </div>
      
      <div className='p-4 bg-slate-50 border border-slate-200 rounded-lg'>
        <p className='font-semibold text-slate-900 mb-3'>Verifiche:</p>
        <div className='grid grid-cols-2 gap-2 text-sm'>
          {Object.entries(result.checks).map(([key, value]) => (
            <div key={key} className='flex items-center gap-2'>
              <span className={value ? 'text-green-600' : 'text-red-600'}>
                {value ? '✓' : '✗'}
              </span>
              <span className='text-slate-700 capitalize'>
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {result.recommendations && result.recommendations.length > 0 && (
        <div className='p-4 bg-amber-50 border border-amber-200 rounded-lg'>
          <p className='font-semibold text-amber-900 mb-2'>Raccomandazioni:</p>
          <ul className='space-y-1'>
            {result.recommendations.map((rec, idx) => (
              <li key={idx} className='text-sm text-amber-700'>• {rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const definition = {
  id: 'security-password-strength-checker',
  fields: [
    {
      type: 'password',
      name: 'password',
      label: 'Password',
      placeholder: 'Inserisci una password',
      required: true,
    },
  ],
  ResultView,
  ctaLabel: 'Verifica Robustezza',
};

export default definition;



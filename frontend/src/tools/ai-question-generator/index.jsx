// 🔧 File: frontend/src/tools/ai-question-generator/index.jsx
// 🔗 Generatore domande AI

import React from 'react';

function ResultView({ result }) {
  if (!result?.questions) return null;

  return (
    <div className='space-y-4'>
      <div className='text-sm text-slate-600'>
        <p>Domande generate: {result.count}</p>
        <p>Tipo: {result.questionType}</p>
        {result.provider && result.provider !== 'mock' && (
          <p className='text-xs text-slate-500 mt-1'>Provider: {result.provider} | Model: {result.model}</p>
        )}
      </div>

      <div className='space-y-3'>
        {result.questions.map((q, idx) => (
          <div key={idx} className='p-4 bg-white border border-slate-200 rounded-lg'>
            <div className='flex items-start gap-3'>
              <div className='flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm'>
                {idx + 1}
              </div>
              <div className='flex-1'>
                <p className='font-medium text-slate-900 mb-2'>{q.question}</p>
                {q.answer && (
                  <div className='mt-2 p-2 bg-slate-50 rounded text-sm text-slate-600'>
                    <span className='font-medium'>Risposta: </span>
                    {q.answer}
                  </div>
                )}
                {q.type && (
                  <span className='inline-block mt-2 px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded'>
                    {q.type}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const definition = {
  id: 'ai-question-generator',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Testo da cui generare domande',
      placeholder: 'Inserisci il testo da cui vuoi generare domande...',
      required: true,
      rows: 8,
    },
    {
      type: 'number',
      name: 'numQuestions',
      label: 'Numero di domande',
      defaultValue: 5,
      min: 1,
      max: 20,
      helperText: 'Numero di domande da generare (1-20)',
    },
    {
      type: 'select',
      name: 'questionType',
      label: 'Tipo di domande',
      defaultValue: 'multiple',
      options: [
        { value: 'multiple', label: 'Scelta multipla' },
        { value: 'open', label: 'Aperte' },
        { value: 'yesno', label: 'Sì/No' },
      ],
    },
  ],
  ResultView,
  ctaLabel: 'Genera domande',
};

export default definition;



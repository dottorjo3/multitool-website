// 🔧 File generato da batch-add-growth-tools.js
// Tool: Social Content Calendar

import React from 'react';

const LABELS = {
  summary: "Sintesi",
  prompt: "Calendario generato",
  sections: "Sezioni piano",
  metadata: "Parametri",
  tips: "Suggerimenti"
};

function ResultView({ result }) {
  if (!result) {
    return null;
  }

  const { summary, prompt, sections, metadata, tips } = result;

  return (
    <div className='space-y-6'>
      {summary && summary.trim() && (
        <div className='rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-indigo-900 shadow-sm'>
          <h3 className='text-xs font-semibold uppercase tracking-wide'>{LABELS.summary}</h3>
          <p className='mt-2 text-sm leading-relaxed'>{summary}</p>
        </div>
      )}

      {prompt && (
        <div>
          <div className='mb-2 flex items-center justify-between'>
            <h3 className='text-sm font-semibold text-slate-800 uppercase tracking-wide'>{LABELS.prompt}</h3>
            <button
              type='button'
              onClick={() => navigator.clipboard.writeText(prompt)}
              className='text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition'
            >
              Copia
            </button>
          </div>
          <textarea
            readOnly
            value={prompt}
            className='w-full h-48 rounded-2xl border border-slate-200 bg-slate-900/90 p-4 text-sm text-slate-50 shadow-inner'
          />
        </div>
      )}

      {Array.isArray(sections) && sections.length > 0 && (
        <div className='space-y-3'>
          <h3 className='text-sm font-semibold text-slate-800 uppercase tracking-wide'>{LABELS.sections}</h3>
          {sections.map((section) => (
            <div key={section.title} className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
              <h4 className='text-sm font-semibold text-indigo-600'>{section.title}</h4>
              <p className='mt-1 text-sm text-slate-600 whitespace-pre-line'>{section.content}</p>
            </div>
          ))}
        </div>
      )}

      {Array.isArray(metadata) && metadata.length > 0 && (
        <div className='space-y-2'>
          <h3 className='text-sm font-semibold text-slate-800 uppercase tracking-wide'>{LABELS.metadata}</h3>
          <div className='grid gap-2 md:grid-cols-2'>
            {metadata.map((item) => (
              <div key={item.label} className='rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm'>
                <p className='text-xs font-semibold uppercase tracking-wide text-slate-500'>{item.label}</p>
                <p className='mt-1 text-slate-800'>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {Array.isArray(tips) && tips.length > 0 && (
        <div className='space-y-2'>
          <h3 className='text-sm font-semibold text-slate-800 uppercase tracking-wide'>{LABELS.tips}</h3>
          <ul className='list-disc space-y-1 pl-5 text-sm text-slate-600'>
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const definition = {
  id: 'marketing-social-calendar',
  title: 'Social Content Calendar',
  fields: [
  {
    type: "text",
    name: "brand",
    label: "Brand / Progetto",
    placeholder: "Es. Tool Empire",
    required: true,
    requiredError: "Indica il brand o progetto",
    doc: "Nome del brand o progetto editoriale."
  },
  {
    type: "text",
    name: "theme",
    label: "Tema principale",
    placeholder: "Es. automazioni AI per freelance",
    required: true,
    requiredError: "Specifica il tema portante",
    doc: "Tema o storyline da sviluppare."
  },
  {
    type: "select",
    name: "frequency",
    label: "Frequenza contenuti",
    defaultValue: "3 post/settimana",
    options: [
      {
        value: "3 post/settimana",
        label: "3 post/settimana"
      },
      {
        value: "5 post/settimana",
        label: "5 post/settimana"
      },
      {
        value: "daily",
        label: "Daily"
      },
      {
        value: "mix organico + sponsored",
        label: "Mix organico + sponsored"
      }
    ],
    required: true,
    requiredError: "Scegli una frequenza",
    doc: "Frequenza media dei contenuti pubblicati."
  },
  {
    type: "select",
    name: "tone",
    label: "Tono del brand",
    defaultValue: "energico",
    options: [
      {
        value: "energico",
        label: "Energico"
      },
      {
        value: "educativo",
        label: "Educativo"
      },
      {
        value: "ironico",
        label: "Ironico"
      },
      {
        value: "minimal",
        label: "Minimal"
      }
    ],
    doc: "Tono desiderato per testi e visual."
  }
],
  ctaLabel: 'Genera calendario social',
  ResultView,
};

export default definition;

// 🔧 File generato da batch-add-growth-tools.js
// Tool: Feedback Prompt Refiner

import React from 'react';

const LABELS = {
  summary: "Sintesi",
  prompt: "Prompt di riscrittura",
  sections: "Sezioni guida",
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
  id: 'ai-prompt-feedback-refiner',
  title: 'Feedback Prompt Refiner',
  fields: [
  {
    type: "textarea",
    name: "draft",
    label: "Feedback originale",
    placeholder: "Incolla il feedback da migliorare (max 1-2 paragrafi)",
    rows: 5,
    required: true,
    requiredError: "Incolla il feedback originale",
    doc: "Testo originale che necessita di revisione."
  },
  {
    type: "select",
    name: "objective",
    label: "Obiettivo principale",
    defaultValue: "migliorare chiarezza",
    options: [
      {
        value: "migliorare chiarezza",
        label: "Migliorare chiarezza"
      },
      {
        value: "rendere più assertivo",
        label: "Rendere più assertivo"
      },
      {
        value: "aumentare empatia",
        label: "Aumentare empatia"
      },
      {
        value: "stimolare azione",
        label: "Stimolare azione"
      }
    ],
    required: true,
    requiredError: "Seleziona un obiettivo",
    doc: "Risultato desiderato dalla riscrittura."
  },
  {
    type: "select",
    name: "tone",
    label: "Tono desiderato",
    defaultValue: "costruttivo",
    options: [
      {
        value: "costruttivo",
        label: "Costruttivo"
      },
      {
        value: "diretto ma gentile",
        label: "Diretto ma gentile"
      },
      {
        value: "formale",
        label: "Formale"
      },
      {
        value: "motivante",
        label: "Motivante"
      }
    ],
    doc: "Stile di comunicazione da adottare."
  },
  {
    type: "text",
    name: "audience",
    label: "Destinatario",
    placeholder: "Es. membro del team, cliente enterprise",
    required: true,
    requiredError: "Indica il destinatario del feedback",
    doc: "Chi riceverà il feedback rielaborato."
  }
],
  ctaLabel: 'Ottimizza feedback',
  ResultView,
};

export default definition;

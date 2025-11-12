// 🔧 File generato da batch-add-growth-tools.js
// Tool: AI Persona Mentor Builder

import React from 'react';

const LABELS = {
  summary: "Sintesi",
  prompt: "Prompt del mentore",
  sections: "Struttura del percorso",
  metadata: "Dettagli chiave",
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
  id: 'ai-prompt-persona-mentor',
  title: 'AI Persona Mentor Builder',
  fields: [
  {
    type: "text",
    name: "persona",
    label: "Tipo di persona/utente",
    placeholder: "Es. Product manager junior, founder alla prima startup",
    required: true,
    requiredError: "Indica la tipologia di persona da supportare",
    doc: "Profilo sintetico della persona che riceverà il mentoring."
  },
  {
    type: "textarea",
    name: "challenge",
    label: "Sfida principale",
    placeholder: "Descrivi il problema o l’obiettivo su cui lavorare",
    rows: 4,
    required: true,
    requiredError: "Descrivi la sfida principale",
    doc: "Problema o traguardo che il mentore deve affrontare."
  },
  {
    type: "select",
    name: "format",
    label: "Formato del percorso",
    defaultValue: "percorso 4 settimane",
    options: [
      {
        value: "sessione singola",
        label: "Sessione singola"
      },
      {
        value: "percorso 4 settimane",
        label: "Percorso 4 settimane"
      },
      {
        value: "roadmap trimestrale",
        label: "Roadmap trimestrale"
      },
      {
        value: "supporto on-demand",
        label: "Supporto on-demand"
      }
    ],
    required: true,
    requiredError: "Seleziona un formato",
    doc: "Struttura temporale del mentoring."
  },
  {
    type: "select",
    name: "tone",
    label: "Tono del mentore",
    defaultValue: "empatico",
    options: [
      {
        value: "empatico",
        label: "Empatico"
      },
      {
        value: "sfidante",
        label: "Sfidante"
      },
      {
        value: "pragmatico",
        label: "Pragmatico"
      },
      {
        value: "visionario",
        label: "Visionario"
      }
    ],
    doc: "Stile comunicativo desiderato."
  }
],
  ctaLabel: 'Crea mentore AI',
  ResultView,
};

export default definition;

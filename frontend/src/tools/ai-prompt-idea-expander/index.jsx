// 🔧 File generato da batch-add-growth-tools.js
// Tool: Prompt Idea Expander

import React from 'react';

const LABELS = {
  summary: "Sintesi",
  prompt: "Prompt generato",
  sections: "Outline consigliato",
  metadata: "Parametri chiave",
  tips: "Suggerimenti rapidi"
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
  id: 'ai-prompt-idea-expander',
  title: 'Prompt Idea Expander',
  fields: [
  {
    type: "textarea",
    name: "idea",
    label: "Idea di partenza",
    placeholder: "Descrivi in 2-3 frasi l'idea da potenziare",
    rows: 5,
    required: true,
    requiredError: "Inserisci l'idea di partenza",
    doc: "Descrizione sintetica (almeno 20 caratteri) dell'idea originale."
  },
  {
    type: "text",
    name: "audience",
    label: "Pubblico di riferimento",
    placeholder: "Es. marketer B2B, studenti, founder di startup",
    required: true,
    requiredError: "Specifica il pubblico di riferimento",
    doc: "Pubblico principale a cui è destinato il risultato."
  },
  {
    type: "select",
    name: "goal",
    label: "Obiettivo principale",
    defaultValue: "lancio prodotto",
    options: [
      {
        value: "lancio prodotto",
        label: "Lancio prodotto"
      },
      {
        value: "generazione lead",
        label: "Generazione lead"
      },
      {
        value: "educazione",
        label: "Educazione / tutorial"
      },
      {
        value: "storytelling",
        label: "Storytelling / awareness"
      }
    ],
    required: true,
    requiredError: "Seleziona un obiettivo",
    doc: "Obiettivo primario del prompt generato."
  },
  {
    type: "select",
    name: "tone",
    label: "Tono di voce",
    defaultValue: "visionario",
    options: [
      {
        value: "visionario",
        label: "Visionario"
      },
      {
        value: "professionale",
        label: "Professionale"
      },
      {
        value: "convincente",
        label: "Convincente"
      },
      {
        value: "amichevole",
        label: "Amichevole"
      }
    ],
    doc: "Tono richiesto per la risposta del modello."
  }
],
  ctaLabel: 'Genera prompt potenziato',
  ResultView,
};

export default definition;

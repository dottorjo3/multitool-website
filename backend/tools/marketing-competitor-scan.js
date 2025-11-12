// 🔧 File generato da batch-add-growth-tools.js
// Tool: Competitor Messaging Scan

const PROMPT_INTRO = "You provide competitive messaging audits that highlight differentiators and opportunities for unique positioning.";
const INSTRUCTIONS = [
  "Elenca i competitor principali: {{competitors}} e descrivi il tuo valore {{value}}.",
  "Indica il pubblico target {{audience}} per orientare il confronto.",
  "Richiedi tabella comparativa con pro/contro, tone of voice e opportunità di differenziazione."
];
const SECTION_TEMPLATES = [
  {
    "title": "Panoramica competitivo",
    "template": "Riepiloga competitor chiave: {{competitors}}. Pubblico target: {{audience}}. Valore distintivo: {{value}}."
  },
  {
    "title": "Tabella confronto",
    "template": "Richiedi confronto su messaggi chiave, offerte, pricing, proof e tono. Evidenzia gap e opportunità."
  },
  {
    "title": "Strategia di differenziazione",
    "template": "Suggerisci come enfatizzare {{value}} e quali messaggi secondari introdurre per distinguersi."
  }
];
const TIP_TEMPLATES = [
  "Aggiungi fonti pubbliche (landing page, annunci, LinkedIn) per arricchire l’analisi.",
  "Pianifica revisione trimestrale per mantenere il confronto aggiornato."
];
const METADATA_TEMPLATES = [
  {
    "label": "Audience",
    "template": "{{audience}}"
  },
  {
    "label": "Vantaggio",
    "template": "{{value}}"
  },
  {
    "label": "Competitor",
    "template": "{{competitors}}"
  }
];
const SUMMARY_TEMPLATE = "Analisi competitor per {{audience}} con vantaggio core {{value}} su {{competitors}}.";
const FIELD_CONFIG = [
  {
    "name": "competitors",
    "required": true,
    "message": "Elenca almeno un competitor",
    "defaultValue": ""
  },
  {
    "name": "value",
    "required": true,
    "message": "Descrivi il tuo valore differenziante",
    "defaultValue": ""
  },
  {
    "name": "audience",
    "required": true,
    "message": "Specifica il pubblico target",
    "defaultValue": ""
  }
];

function fillTemplate(template, values) {
  return template.replace(/{{([A-Za-z0-9_]+)}}/g, (_, key) => {
    const value = values[key];
    if (value === undefined || value === null) {
      return '';
    }
    return String(value);
  });
}

function buildSections(values) {
  return SECTION_TEMPLATES.map((item) => ({
    title: item.title,
    content: fillTemplate(item.template, values),
  }));
}

function buildMetadata(values) {
  return (METADATA_TEMPLATES || [])
    .map((item) => ({
      label: item.label,
      value: fillTemplate(item.template, values),
    }))
    .filter((entry) => entry.value && entry.value.trim().length > 0);
}

module.exports = {
  async run({ params }) {
    const values = {};

    FIELD_CONFIG.forEach((field) => {
      const raw = params?.[field.name];
      let value = '';

      if (raw === undefined || raw === null || (typeof raw === 'string' && raw.trim() === '')) {
        value = field.defaultValue ? String(field.defaultValue) : '';
      } else if (Array.isArray(raw)) {
        value = raw.join(', ');
      } else {
        value = String(raw).trim();
      }

      if (field.required && !value) {
        throw new Error(field.message);
      }

      values[field.name] = value;
    });

    const promptLines = INSTRUCTIONS.map((instruction, index) => {
      return `${index + 1}. ${fillTemplate(instruction, values)}`;
    });

    const prompt = [PROMPT_INTRO, '', ...promptLines].filter(Boolean).join('
');
    const summary = SUMMARY_TEMPLATE ? fillTemplate(SUMMARY_TEMPLATE, values) : '';

    return {
      summary,
      prompt,
      sections: buildSections(values),
      metadata: buildMetadata(values),
      tips: TIP_TEMPLATES.map((tip) => fillTemplate(tip, values)),
    };
  },
};

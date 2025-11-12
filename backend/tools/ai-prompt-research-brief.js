// 🔧 File generato da batch-add-growth-tools.js
// Tool: Research Prompt Brief

const PROMPT_INTRO = "You craft research prompts that gather credible insights, references and benchmarks for strategic decision making.";
const INSTRUCTIONS = [
  "Definisci il campo di ricerca: {{topic}} con destinatari {{audience}}.",
  "Specifica la profondità desiderata {{scope}} e il tipo di deliverable {{deliverable}}.",
  "Richiedi fonti affidabili, trend, dati chiave e raccomandazioni operative."
];
const SECTION_TEMPLATES = [
  {
    "title": "Ambito e pubblico",
    "template": "Tema principale: {{topic}}. Audience: {{audience}}. Profondità: {{scope}}."
  },
  {
    "title": "Struttura del deliverable",
    "template": "Deliverable richiesto: {{deliverable}}. Includi overview, trend, benchmark, takeaway e next step."
  },
  {
    "title": "Fonti e qualità",
    "template": "Indica di citare fonti verificabili, range temporali recenti e di evidenziare eventuali gap informativi."
  }
];
const TIP_TEMPLATES = [
  "Restringi la finestra temporale o il mercato geografico per risultati più precisi.",
  "Chiedi sempre una sezione “limitations” per evitare overconfidence nei dati."
];
const METADATA_TEMPLATES = [
  {
    "label": "Audience",
    "template": "{{audience}}"
  },
  {
    "label": "Profondità",
    "template": "{{scope}}"
  },
  {
    "label": "Deliverable",
    "template": "{{deliverable}}"
  }
];
const SUMMARY_TEMPLATE = "Brief di ricerca su {{topic}} per {{audience}} con profondità {{scope}} e deliverable {{deliverable}}.";
const FIELD_CONFIG = [
  {
    "name": "topic",
    "required": true,
    "message": "Specifica il tema di ricerca",
    "defaultValue": ""
  },
  {
    "name": "audience",
    "required": true,
    "message": "Indica chi userà il report",
    "defaultValue": ""
  },
  {
    "name": "scope",
    "required": true,
    "message": "Seleziona la profondità dell'analisi",
    "defaultValue": "approfondita (2-3 ore)"
  },
  {
    "name": "deliverable",
    "required": false,
    "message": "Il campo Tipo di deliverable è obbligatorio.",
    "defaultValue": "report strutturato"
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

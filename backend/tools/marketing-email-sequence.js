// 🔧 File generato da batch-add-growth-tools.js
// Tool: Email Sequence Planner

const PROMPT_INTRO = "You are a lifecycle marketer mapping email sequences that convert prospects with clear storytelling and metrics.";
const INSTRUCTIONS = [
  "Descrivi il prodotto {{product}} e l’offerta chiave {{offer}}.",
  "Indica il pubblico {{audience}} e la lunghezza della sequenza {{length}}.",
  "Richiedi struttura per ogni email: obiettivo, messaggio, CTA, KPI da monitorare."
];
const SECTION_TEMPLATES = [
  {
    "title": "Strategia sequenza",
    "template": "Prodotto: {{product}}. Audience: {{audience}}. Offerta: {{offer}}. Numero di invii: {{length}}."
  },
  {
    "title": "Timeline email",
    "template": "Per ogni invio delinea hook, beneficio principale, prova sociale e CTA. Suggerisci timing di invio."
  },
  {
    "title": "Metriche e ottimizzazioni",
    "template": "Indica metriche prioritarie (open, CTR, conversion), test A/B e follow-up automatici."
  }
];
const TIP_TEMPLATES = [
  "Integra segmentazione (es. nuovi lead vs clienti inattivi) per adattare i messaggi.",
  "Prevedi email di recupero per chi non interagisce entro 72 ore."
];
const METADATA_TEMPLATES = [
  {
    "label": "Prodotto",
    "template": "{{product}}"
  },
  {
    "label": "Offerta",
    "template": "{{offer}}"
  },
  {
    "label": "Numero email",
    "template": "{{length}}"
  }
];
const SUMMARY_TEMPLATE = "Sequenza per {{product}} con offerta {{offer}} verso {{audience}} in {{length}} email.";
const FIELD_CONFIG = [
  {
    "name": "product",
    "required": true,
    "message": "Specifica il prodotto",
    "defaultValue": ""
  },
  {
    "name": "offer",
    "required": true,
    "message": "Descrivi l'offerta o la proposta di valore",
    "defaultValue": ""
  },
  {
    "name": "audience",
    "required": true,
    "message": "Indica il pubblico target",
    "defaultValue": ""
  },
  {
    "name": "length",
    "required": false,
    "message": "Il campo Numero di email è obbligatorio.",
    "defaultValue": "4 email"
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

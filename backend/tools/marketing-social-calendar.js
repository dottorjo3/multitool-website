// 🔧 File generato da batch-add-growth-tools.js
// Tool: Social Content Calendar

const PROMPT_INTRO = "You plan social media calendars that balance consistency, storytelling and conversion across multiple posts.";
const INSTRUCTIONS = [
  "Definisci il brand {{brand}} e il tema narrativo {{theme}}.",
  "Imposta la frequenza {{frequency}} e indica i formati consigliati.",
  "Mantieni un tono {{tone}} e includi CTA, metriche e idee per repurposing."
];
const SECTION_TEMPLATES = [
  {
    "title": "Visione editoriale",
    "template": "Brand: {{brand}}. Tema chiave: {{theme}}. Tono: {{tone}}. Frequenza: {{frequency}}."
  },
  {
    "title": "Settimana tipo",
    "template": "Suggerisci calendario di post con formato (video, carousels, stories), angolo narrativo e CTA per ciascun giorno."
  },
  {
    "title": "Ottimizzazione",
    "template": "Indica metriche da monitorare, suggerimenti di test A/B e idee di riutilizzo contenuti (newsletter, blog, shorts)."
  }
];
const TIP_TEMPLATES = [
  "Prevedi rubriche ricorrenti per creare appuntamenti fissi con la community.",
  "Segmenta le CTA in awareness, consideration e conversion per coprire tutto il funnel."
];
const METADATA_TEMPLATES = [
  {
    "label": "Brand",
    "template": "{{brand}}"
  },
  {
    "label": "Tema",
    "template": "{{theme}}"
  },
  {
    "label": "Frequenza",
    "template": "{{frequency}}"
  }
];
const SUMMARY_TEMPLATE = "Calendario per {{brand}} su tema {{theme}} con frequenza {{frequency}} e tono {{tone}}.";
const FIELD_CONFIG = [
  {
    "name": "brand",
    "required": true,
    "message": "Indica il brand o progetto",
    "defaultValue": ""
  },
  {
    "name": "theme",
    "required": true,
    "message": "Specifica il tema portante",
    "defaultValue": ""
  },
  {
    "name": "frequency",
    "required": true,
    "message": "Scegli una frequenza",
    "defaultValue": "3 post/settimana"
  },
  {
    "name": "tone",
    "required": false,
    "message": "Il campo Tono del brand è obbligatorio.",
    "defaultValue": "energico"
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

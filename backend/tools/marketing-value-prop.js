// 🔧 File generato da batch-add-growth-tools.js
// Tool: Value Proposition Builder

const PROMPT_INTRO = "You help marketers articulate a compelling value proposition with clear benefits, proof points and messaging pillars.";
const INSTRUCTIONS = [
  "Descrivi il prodotto {{product}} e il valore distintivo {{advantage}}.",
  "Definisci il pubblico target {{audience}} e i loro pain point principali.",
  "Genera messaggi chiave (headline, supporto, proof) in tono {{tone}}."
];
const SECTION_TEMPLATES = [
  {
    "title": "Promise principale",
    "template": "Evidenzia come {{product}} risolve il problema principale di {{audience}} grazie a {{advantage}}."
  },
  {
    "title": "Pilastri di messaggio",
    "template": "Suggerisci 3 pilastri con benefit e proof point tangibili (es. metriche, testimonianze, feature uniche)."
  },
  {
    "title": "CTA e tono",
    "template": "Indica CTA adatte ai vari funnel stage e mantieni un tono {{tone}} coerente in tutti i canali."
  }
];
const TIP_TEMPLATES = [
  "Integra dati numerici (percentuali, tempo risparmiato) per rinforzare la differenziazione.",
  "Prepara versioni alternative per segmenti secondari del pubblico."
];
const METADATA_TEMPLATES = [
  {
    "label": "Prodotto",
    "template": "{{product}}"
  },
  {
    "label": "Vantaggio chiave",
    "template": "{{advantage}}"
  },
  {
    "label": "Tono",
    "template": "{{tone}}"
  }
];
const SUMMARY_TEMPLATE = "Value proposition per {{product}} focalizzata su {{advantage}} per {{audience}} con tono {{tone}}.";
const FIELD_CONFIG = [
  {
    "name": "product",
    "required": true,
    "message": "Indica il prodotto",
    "defaultValue": ""
  },
  {
    "name": "audience",
    "required": true,
    "message": "Specifica il pubblico obiettivo",
    "defaultValue": ""
  },
  {
    "name": "advantage",
    "required": true,
    "message": "Descrivi il vantaggio chiave",
    "defaultValue": ""
  },
  {
    "name": "tone",
    "required": false,
    "message": "Il campo Tono di comunicazione è obbligatorio.",
    "defaultValue": "ispirazionale"
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

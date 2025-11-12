// 🔧 File generato da batch-add-growth-tools.js
// Tool: Marketing Campaign Brief

const PROMPT_INTRO = "You are a marketing strategist creating clear briefs that align teams on objectives, audience, messaging and success metrics.";
const INSTRUCTIONS = [
  "Contestualizza il prodotto/servizio {{product}} e il pubblico {{audience}}.",
  "Definisci l’obiettivo principale {{goal}} e il canale core {{channel}} con KPI misurabili.",
  "Richiedi messaggi chiave, call-to-action, offerte e timeline sintetica."
];
const SECTION_TEMPLATES = [
  {
    "title": "Panoramica",
    "template": "Prodotto: {{product}}. Audience target: {{audience}}. Obiettivo primario: {{goal}}."
  },
  {
    "title": "Messaggi e proposta",
    "template": "Evidenzia value proposition, proof point e CTA per il canale {{channel}}, includendo tono e stile."
  },
  {
    "title": "KPI e timing",
    "template": "Suggerisci KPI principali (conversioni, CTR, lead) e milestone operative con responsabilità chiare."
  }
];
const TIP_TEMPLATES = [
  "Definisci il budget o le risorse disponibili per ottenere raccomandazioni più realistiche.",
  "Aggiungi segmentazioni secondarie (es. prospect vs clienti attivi) per personalizzare i messaggi."
];
const METADATA_TEMPLATES = [
  {
    "label": "Prodotto",
    "template": "{{product}}"
  },
  {
    "label": "Audience",
    "template": "{{audience}}"
  },
  {
    "label": "Canale",
    "template": "{{channel}}"
  }
];
const SUMMARY_TEMPLATE = "Brief per {{product}} rivolto a {{audience}} con obiettivo {{goal}} su canale {{channel}}.";
const FIELD_CONFIG = [
  {
    "name": "product",
    "required": true,
    "message": "Indica il prodotto o servizio",
    "defaultValue": ""
  },
  {
    "name": "audience",
    "required": true,
    "message": "Specifica il pubblico di riferimento",
    "defaultValue": ""
  },
  {
    "name": "goal",
    "required": true,
    "message": "Seleziona l'obiettivo",
    "defaultValue": "lead generation"
  },
  {
    "name": "channel",
    "required": false,
    "message": "Il campo Canale prioritario è obbligatorio.",
    "defaultValue": "email marketing"
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

// 🔧 File generato da batch-add-growth-tools.js
// Tool: Feedback Prompt Refiner

const PROMPT_INTRO = "You design prompts that rewrite feedback messages, keeping them actionable, empathetic and aligned with leadership expectations.";
const INSTRUCTIONS = [
  "Riassumi il feedback originale: {{draft}}.",
  "Chiarisci l’obiettivo principale {{objective}} e il destinatario {{audience}}.",
  "Richiedi suggerimenti di riscrittura con tono {{tone}}, includendo motivazioni e next step."
];
const SECTION_TEMPLATES = [
  {
    "title": "Contesto",
    "template": "Feedback originale (riassunto): {{draft}}. Audience: {{audience}}. Obiettivo di miglioramento: {{objective}}."
  },
  {
    "title": "Istruzioni per la riscrittura",
    "template": "Richiedi tre versioni con tono {{tone}}, includendo esempi, motivazioni e call-to-action chiare."
  },
  {
    "title": "Punti di attenzione",
    "template": "Chiedi di evidenziare rischi di fraintendimento e suggerire mitigazioni comunicative."
  }
];
const TIP_TEMPLATES = [
  "Allega contesto aggiuntivo (metriche, dati) per feedback più specifici.",
  "Chiedi sempre una check-list finale di punti da verificare prima dell’invio."
];
const METADATA_TEMPLATES = [
  {
    "label": "Obiettivo",
    "template": "{{objective}}"
  },
  {
    "label": "Tono",
    "template": "{{tone}}"
  },
  {
    "label": "Destinatario",
    "template": "{{audience}}"
  }
];
const SUMMARY_TEMPLATE = "Feedback da rifinire per {{audience}} in ottica {{objective}} con tono {{tone}}.";
const FIELD_CONFIG = [
  {
    "name": "draft",
    "required": true,
    "message": "Incolla il feedback originale",
    "defaultValue": ""
  },
  {
    "name": "objective",
    "required": true,
    "message": "Seleziona un obiettivo",
    "defaultValue": "migliorare chiarezza"
  },
  {
    "name": "tone",
    "required": false,
    "message": "Il campo Tono desiderato è obbligatorio.",
    "defaultValue": "costruttivo"
  },
  {
    "name": "audience",
    "required": true,
    "message": "Indica il destinatario del feedback",
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

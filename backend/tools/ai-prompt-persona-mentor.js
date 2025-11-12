// 🔧 File generato da batch-add-growth-tools.js
// Tool: AI Persona Mentor Builder

const PROMPT_INTRO = "You design AI coaching personas that guide users through repeatable learning journeys with empathy and clarity.";
const INSTRUCTIONS = [
  "Descrivi la persona: un mentore dedicato a {{persona}} con focus su {{challenge}}.",
  "Definisci il formato della collaborazione seguendo il modello {{format}} includendo tappe progressive.",
  "Imposta aspettative su tono {{tone}}, materiali di supporto e modalità di feedback."
];
const SECTION_TEMPLATES = [
  {
    "title": "Missione del mentore",
    "template": "Obiettivo: aiutare {{persona}} a superare {{challenge}} con un approccio pratico."
  },
  {
    "title": "Struttura del percorso",
    "template": "Formato scelto: {{format}}. Prevedi milestone, esercizi e momenti di riflessione per ogni tappa."
  },
  {
    "title": "Stile e risorse",
    "template": "Tono consigliato: {{tone}}. Suggerisci risorse da proporre, check-in periodici e metriche di avanzamento."
  }
];
const TIP_TEMPLATES = [
  "Specifica esempi reali o casi studio per rendere il mentoring più concreto.",
  "Aggiungi criteri di completamento per ogni tappa così da misurare l'impatto."
];
const METADATA_TEMPLATES = [
  {
    "label": "Persona target",
    "template": "{{persona}}"
  },
  {
    "label": "Tono",
    "template": "{{tone}}"
  },
  {
    "label": "Formato",
    "template": "{{format}}"
  }
];
const SUMMARY_TEMPLATE = "Percorso di mentoring per {{persona}} con formato {{format}} e tono {{tone}}.";
const FIELD_CONFIG = [
  {
    "name": "persona",
    "required": true,
    "message": "Indica la tipologia di persona da supportare",
    "defaultValue": ""
  },
  {
    "name": "challenge",
    "required": true,
    "message": "Descrivi la sfida principale",
    "defaultValue": ""
  },
  {
    "name": "format",
    "required": true,
    "message": "Seleziona un formato",
    "defaultValue": "percorso 4 settimane"
  },
  {
    "name": "tone",
    "required": false,
    "message": "Il campo Tono del mentore è obbligatorio.",
    "defaultValue": "empatico"
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

// 🔧 File generato da batch-add-growth-tools.js
// Tool: Prompt Idea Expander

const PROMPT_INTRO = "You are an expert prompt engineer who transforms product ideas into detailed instructions for large language models.";
const INSTRUCTIONS = [
  "Summarize the mission: help {{audience}} accomplish {{goal}}.",
  "Expand the original idea \"{{idea}}\" into a structured multi-step assignment with clear deliverables.",
  "Set tone guidelines so the assistant replies with a {{tone}} voice and includes a call-to-action relevant to {{audience}}."
];
const SECTION_TEMPLATES = [
  {
    "title": "Context",
    "template": "Background: {{idea}}. Audience focus: {{audience}}. Goal: {{goal}}."
  },
  {
    "title": "Output Requirements",
    "template": "Request concrete deliverables such as bullet summaries, examples, data points and a CTA tailored to {{audience}}."
  },
  {
    "title": "Tone & Constraints",
    "template": "Use a {{tone}} tone, specify word count expectations, forbid generic filler and highlight the need for actionable insights."
  }
];
const TIP_TEMPLATES = [
  "Aggiungi KPI o metriche per orientare la risposta verso risultati misurabili.",
  "Indica formati finali (slide, email, piano editoriale) per ottenere output coerenti."
];
const METADATA_TEMPLATES = [
  {
    "label": "Tono",
    "template": "{{tone}}"
  },
  {
    "label": "Obiettivo",
    "template": "{{goal}}"
  },
  {
    "label": "Pubblico",
    "template": "{{audience}}"
  }
];
const SUMMARY_TEMPLATE = "Prompt ottimizzato per {{audience}} con tono {{tone}} focalizzato su {{goal}}.";
const FIELD_CONFIG = [
  {
    "name": "idea",
    "required": true,
    "message": "Inserisci l'idea di partenza",
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
    "message": "Seleziona un obiettivo",
    "defaultValue": "lancio prodotto"
  },
  {
    "name": "tone",
    "required": false,
    "message": "Il campo Tono di voce è obbligatorio.",
    "defaultValue": "visionario"
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

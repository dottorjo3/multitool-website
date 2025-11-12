// 🔧 File generato da batch-add-growth-tools.js
// Tool: Interview Prompt Designer

const PROMPT_INTRO = "You design structured interview prompts that surface behavioural and technical insights for a given role.";
const INSTRUCTIONS = [
  "Definisci la missione: valutare il ruolo {{role}} nel contesto di {{scenario}}.",
  "Richiedi domande approfondite orientate al focus {{focus}} con follow-up di approfondimento.",
  "Specifica un tono {{tone}} che mantenga l’esperienza del candidato positiva ma sfidante."
];
const SECTION_TEMPLATES = [
  {
    "title": "Contesto del ruolo",
    "template": "Ruolo da valutare: {{role}}. Scenario: {{scenario}}. Area prioritaria: {{focus}}."
  },
  {
    "title": "Struttura delle domande",
    "template": "Richiedi 3 blocchi: warm-up, core focus {{focus}}, casi pratici. Ogni blocco deve includere follow-up."
  },
  {
    "title": "Tono e valutazione",
    "template": "Tono: {{tone}}. Includi criteri di valutazione e segnali di allarme da monitorare durante le risposte."
  }
];
const TIP_TEMPLATES = [
  "Aggiungi skill specifiche o strumenti chiave per rendere le domande più concrete.",
  "Inserisci criteri di valutazione numerici per confrontare i candidati."
];
const METADATA_TEMPLATES = [
  {
    "label": "Ruolo",
    "template": "{{role}}"
  },
  {
    "label": "Focus",
    "template": "{{focus}}"
  },
  {
    "label": "Tono",
    "template": "{{tone}}"
  }
];
const SUMMARY_TEMPLATE = "Intervista per ruolo {{role}} focalizzata su {{focus}} in tono {{tone}}.";
const FIELD_CONFIG = [
  {
    "name": "role",
    "required": true,
    "message": "Specifica il ruolo da valutare",
    "defaultValue": ""
  },
  {
    "name": "scenario",
    "required": true,
    "message": "Inserisci lo scenario dell’intervista",
    "defaultValue": ""
  },
  {
    "name": "focus",
    "required": true,
    "message": "Scegli un focus",
    "defaultValue": "competenze tecniche"
  },
  {
    "name": "tone",
    "required": false,
    "message": "Il campo Tono intervista è obbligatorio.",
    "defaultValue": "professionale ma accogliente"
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

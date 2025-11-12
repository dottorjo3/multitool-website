// Tool: Marketing Persona Expander
// Expands base personas with motivations, objections, channels and messaging cues.

module.exports = {
  async run({ params }) {
    const personaName = params?.personaName || 'Marketing Manager';
    const industry = params?.industry || 'SaaS';
    const detailLevel = params?.detailLevel || 'full';

    const sections = [
      'Profilo demografico',
      'Obiettivi principali',
      'Pain points',
      'Messaggistica efficace',
      'Obiezioni e risposte',
      'Canali preferiti',
      'Trigger di acquisto',
    ];

    return {
      summary: `Persona expander per ${personaName} (${industry}, dettaglio ${detailLevel}).`,
      personaName,
      industry,
      detailLevel,
      sections,
      prompts: sections.map((section) => ({
        section,
        prompt: `Expand ${section.toLowerCase()} for persona ${personaName} in ${industry} industry. Dettaglio: ${detailLevel}.`,
      })),
      integration: [
        'Salva persona in CRM/Notion per allineamento team.',
        'Usa gli output per briefing campagne e segmentazioni.',
        'Aggiorna trimestralmente con insight commerciali.',
      ],
    };
  },
};

// Tool: Marketing Persona Expander
// Expands existing personas with new segments, motivators and messaging.

module.exports = {
  async run({ params }) {
    const basePersona = params?.basePersona || 'Growth Manager';
    const newSegments = Array.isArray(params?.newSegments) && params.newSegments.length > 0
      ? params.newSegments
      : ['scale-up', 'enterprise'];
    const focusArea = params?.focusArea || 'adoption';

    const expansion = newSegments.map((segment, index) => ({
      id: `persona_${index + 1}`,
      segment,
      fields: [
        'Profilo demografico e professionale',
        `Goals e pain point legati a ${focusArea}`,
        'Obiezioni principali e trigger decisionali',
        'Messaging pillars (value driver, proof, CTA)',
        'Canali preferiti e contenuti efficaci',
      ],
    }));

    return {
      summary: `Persona expander per ${basePersona} (focus ${focusArea}).`,
      basePersona,
      newSegments,
      focusArea,
      expansion,
      workflow: [
        'Analizza dati CRM/interviste per confermare ipotesi.',
        'Genera draft persona e valida con team Sales/CS.',
        'Integra snippet in playbook marketing & sales.',
      ],
      qaChecklist: [
        'Controlla segnali di bias o generalizzazioni.',
        'Allinea CTA e messaging con roadmap prodotto.',
        'Aggiorna ogni 6 mesi con dati mercato.',
      ],
    };
  },
};



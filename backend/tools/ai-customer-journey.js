// Tool: AI Customer Journey Designer
// Creates AI-assisted customer journey maps with stage prompts, pain points and content ideas.

module.exports = {
  async run({ params }) {
    const persona = params?.persona || 'Marketing Manager';
    const stages = Array.isArray(params?.stages) && params.stages.length > 0
      ? params.stages
      : ['awareness', 'consideration', 'decision', 'retention'];
    const dataSources = Array.isArray(params?.dataSources) && params.dataSources.length > 0
      ? params.dataSources
      : ['analytics', 'surveys', 'support'];

    const journey = stages.map((stage) => ({
      stage,
      prompt: `Describe customer journey stage "${stage}" for persona ${persona}. Include emotions, needs, friction points, and suggested content/offers.`,
      dataSources,
      outputs: ['summary', 'metricsToTrack', 'opportunities', 'aiPromptIdeas'],
    }));

    return {
      summary: `Customer journey per ${persona} con ${stages.length} stage.`,
      persona,
      stages,
      dataSources,
      journey,
      automation: [
        'Integra journey map con CRM e strumenti analytics.',
        'Aggiorna trimestralmente con feedback reali.',
        'Collega journey a playbook marketing/sales per attivazioni automatiche.',
      ],
      qaChecklist: [
        'Validare journey con stakeholder (marketing, sales, support).',
        'Verificare dati quantitativi per supportare ipotesi.',
        'Assicurarsi che privacy e policy siano rispettate per dati raccolti.',
      ],
    };
  },
};










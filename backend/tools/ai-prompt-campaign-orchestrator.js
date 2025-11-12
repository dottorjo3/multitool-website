// Tool: AI Prompt Campaign Orchestrator
// Builds multi-stage prompt sequences for marketing campaigns.

module.exports = {
  async run({ params }) {
    const industry = params?.industry || 'SaaS';
    const stages = Array.isArray(params?.stages) && params.stages.length > 0
      ? params.stages
      : ['awareness', 'consideration', 'decision'];
    const primaryGoal = params?.primaryGoal || 'lead generation';
    const model = params?.model || 'gpt-4o';

    const sequence = stages.map((stage, index) => ({
      stage,
      order: index + 1,
      prompt: [
        `You are a marketing strategist in the ${industry} industry.`,
        `Goal: ${primaryGoal}.`,
        `Campaign stage: ${stage}.`,
        'Provide: headline, supporting copy, CTA, angle summary.',
        'Return JSON with fields headline, copy, cta, angle, keywords.',
      ].join(' '),
      guardrails: [
        'Keep tone on-brand (trustworthy, focused).',
        'Limit headline to 60 characters.',
        'Copy max 120 words.',
      ],
    }));

    const automation = [
      'Trigger orchestrator when product marketing brief is approved.',
      'Save generated outputs in CMS or Airtable for review.',
      'Run sentiment and compliance guardrails before final approval.',
    ];

    return {
      summary: `Prompt orchestrator per campagna ${industry} con obiettivo ${primaryGoal}.`,
      industry,
      stages,
      primaryGoal,
      model,
      sequence,
      automation,
      qaChecklist: [
        'Verifica coerenza messaggi tra le fasi del funnel.',
        'Controlla che CTA non siano duplicati o in conflitto.',
        'Rivedi campioni con team marketing prima di lancio.',
      ],
      tooling: [
        'LangChain / PromptLayer per gestione sequenze',
        'Zapier/Make per invio output a Slack/Notion',
        'Amplitude / GA4 per misurare performance',
      ],
    };
  },
};











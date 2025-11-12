// Tool: AI Persona Tester
// Evaluates AI persona prompts against scenarios and provides improvement feedback.

module.exports = {
  async run({ params }) {
    const personaName = params?.personaName || 'Growth Mentor';
    const scenarios = Array.isArray(params?.scenarios) && params.scenarios.length > 0
      ? params.scenarios
      : ['new user onboarding', 'churn recovery', 'feature adoption'];
    const metrics = ['tone_alignment', 'usefulness', 'consistency', 'hallucination_risk'];

    const tests = scenarios.map((scenario, index) => ({
      scenario,
      prompt: [
        `Assume persona ${personaName}.`,
        `Scenario: ${scenario}.`,
        'Respond to the user query and explain reasoning.',
      ].join(' '),
      evaluation: metrics,
      fallbackPrompt: 'Regenerate answer emphasising brand voice and policy compliance.',
      id: `test_${index + 1}`,
    }));

    const scoring = [
      'Valuta le risposte con rubriche 1-5 per ogni metrica.',
      'Evidenzia deviazioni e suggerisci riscrittura prompt (istruzioni aggiuntive, tono, esempi).',
      'Logga risultati nel registro QA per confronti futuri.',
    ];

    return {
      summary: `Persona tester per ${personaName} su ${scenarios.length} scenari.`,
      personaName,
      scenarios,
      metrics,
      tests,
      scoring,
      qaChecklist: [
        'Assicurati che la persona non violi policy (no consigli legali/medici).',
        'Controlla coerenza di stile e livello di dettaglio.',
        'Verifica che le risposte citino fonti o disclaimers quando necessario.',
      ],
      automation: [
        'Integra con pipeline CI per test regolari dei prompt persona.',
        'Invia report settimanale con score medio e regressioni.',
        'Crea alert se score scende sotto soglia definita (es. 3/5).',
      ],
    };
  },
};











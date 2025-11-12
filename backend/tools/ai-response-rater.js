// Tool: AI Response Rater
// Designs a human/automated rating workflow for AI responses with rubrics and logging.

module.exports = {
  async run({ params }) {
    const rubricCriteria = Array.isArray(params?.rubricCriteria) && params.rubricCriteria.length > 0
      ? params.rubricCriteria
      : ['accuracy', 'tone', 'helpfulness'];
    const ratingScale = params?.ratingScale || '1-5';
    const reviewCadence = params?.reviewCadence || 'weekly';

    const process = [
      'Definisci rubric con descrittori per ciascun punteggio.',
      'Raccogli risposte AI e screenshot/metadati rilevanti.',
      `Assegna rater (umani o modello) e applica scala ${ratingScale}.`,
      'Logga risultati con commenti e follow-up.',
      `Esegui review ${reviewCadence} per trend e regressioni.`,
    ];

    return {
      summary: `Response rater con scala ${ratingScale}, criteri ${rubricCriteria.join(', ')}, review ${reviewCadence}.`,
      rubricCriteria,
      ratingScale,
      reviewCadence,
      process,
      tooling: [
        'OpenAI / Anthropic eval tools',
        'Supervised review platforms (Label Studio, Surge)',
        'Custom dashboard (Looker, Metabase)',
      ],
      qaChecklist: [
        'Assicurati coerenza tra rater (Cohen’s kappa).',
        'Mantieni training e guideline aggiornate.',
        'Integra feedback nel retraining/modifica prompt.',
      ],
    };
  },
};










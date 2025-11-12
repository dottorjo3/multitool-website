// Tool: HR Interview Scorecard Builder
// Generates structured interview scorecards with competencies, rating scale and guidance.

module.exports = {
  async run({ params }) {
    const competencies = Array.isArray(params?.competencies) && params.competencies.length > 0
      ? params.competencies
      : ['technical knowledge', 'problem solving', 'communication', 'culture fit'];
    const ratingScale = params?.ratingScale || '1-5';
    const interviewTypes = Array.isArray(params?.interviewTypes) && params.interviewTypes.length > 0
      ? params.interviewTypes
      : ['screen', 'technical', 'values'];

    const scorecards = interviewTypes.map((type) => ({
      interviewType: type,
      competencies: competencies.map((competency) => ({
        competency,
        behaviorIndicators: [
          `Indicatori osservabili per ${competency}.`,
          'Domande suggerite.',
          'Red flag da evitare.',
        ],
      })),
      ratingScale,
      notes: ['Spazio note qualitative', 'Decisione consigliata'],
    }));

    return {
      summary: `Scorecard colloqui (${interviewTypes.length} tipologie, scala ${ratingScale}).`,
      competencies,
      ratingScale,
      interviewTypes,
      scorecards,
      automation: [
        'Distribuzione automatica scorecard via ATS.',
        'Reminder compilazione post-intervista.',
        'Dashboard allineamento voti e commenti.',
      ],
      qaChecklist: [
        'Allineare scorecard con hiring manager.',
        'Aggiornare indicatori dopo retro interviste.',
        'Monitorare bias e training interviewer.',
      ],
    };
  },
};







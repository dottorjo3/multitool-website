// Tool: AI Copy Length Analyzer
// Evaluates copy length across channels and suggests adjustments.

module.exports = {
  async run({ params }) {
    const channel = params?.channel || 'email';
    const targetLength = Number(params?.targetLength) || 120;
    const tolerance = Number(params?.tolerance) || 20;

    const guidelines = {
      email: { subject: 60, preheader: 100, body: 150 },
      landing: { headline: 60, subheadline: 120, section: 200 },
      social: { headline: 40, body: 100 },
    };

    const reference = guidelines[channel] || guidelines.email;

    const report = Object.entries(reference).map(([section, limit]) => ({
      section,
      limit,
      recommendedRange: [Math.max(0, limit - tolerance), limit + tolerance],
      prompt: `Ensure ${section} length is around ${limit} characters with tolerance ${tolerance}.`,
    }));

    return {
      summary: `Analisi lunghezza copy per ${channel} con target ${targetLength}±${tolerance}.`,
      channel,
      targetLength,
      tolerance,
      report,
      automation: [
        'Integra analizzatore in pipeline generazione copy.',
        'Blocca pubblicazione se sezioni fuori range.',
        'Invia suggerimenti di pruning/espansione al copywriter.',
      ],
      metrics: [
        'Lunghezza media per sezione',
        'Scostamento % dal target',
        'Numero revisioni necessarie',
      ],
    };
  },
};











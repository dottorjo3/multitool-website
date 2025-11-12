// Tool: AI Tone Calibrator
// Helps calibrate tone instructions for AI prompts with before/after samples.

module.exports = {
  async run({ params }) {
    const currentTone = params?.currentTone || 'generic';
    const desiredTone = params?.desiredTone || 'authoritative';
    const sampleCount = Number(params?.sampleCount) || 5;

    const instructions = [
      `Analizza differenza tra tono ${currentTone} e ${desiredTone}.`,
      'Identifica parole chiave da evitare e da usare.',
      'Suggerisci modifiche al prompt (stile, verbi, ritmo).',
      'Fornisci esempi before/after con spiegazione.',
    ];

    const samples = Array.from({ length: sampleCount }).map((_, index) => ({
      id: `sample_${index + 1}`,
      prompt: `Transform copy sample ${index + 1} from ${currentTone} to ${desiredTone}. Provide explanation of changes.`,
      fields: ['original', 'transformed', 'changeExplanation'],
    }));

    return {
      summary: `Tone calibrator da ${currentTone} a ${desiredTone} (${sampleCount} esempi).`,
      currentTone,
      desiredTone,
      sampleCount,
      instructions,
      samples,
      qaChecklist: [
        'Verifica coerenza con brand voice e policy.',
        'Controlla che il tono trasformato non generi claim rischiosi.',
        'Testa campioni su focus group interno per feedback qualitativo.',
      ],
      automation: [
        'Integra calibratore in fase di onboarding copywriter/PMM.',
        'Salva esempi in knowledge base per riuso futuro.',
        'Esegui ricalibrazione trimestrale o post-rebranding.',
      ],
    };
  },
};











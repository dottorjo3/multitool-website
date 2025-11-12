// Tool: AI Prompt Sentiment Guard
// Defines sentiment guardrails and corrective actions for AI-generated copy.

module.exports = {
  async run({ params }) {
    const targetSentiment = params?.targetSentiment || 'positive';
    const toneDeviation = Number(params?.toneDeviation) || 0.15;
    const escalationChannel = params?.escalationChannel || 'slack';

    const monitoring = [
      'Analizza output con modelli di sentiment (OpenAI, AWS Comprehend, HuggingFace).',
      `Accetta solo output con score ${targetSentiment} entro ±${toneDeviation}.`,
      'Esegui normalizzazione punteggi (0-1) e log in database QA.',
    ];

    const correctiveActions = [
      'Richiama modello con prompt di correzione (es. “make it more upbeat/neutral”).',
      'In caso di fallimenti consecutivi, segnala a human reviewer.',
      'Blocca pubblicazione automatica finché sentiment non rientra nei limiti.',
    ];

    return {
      summary: `Sentiment guard per output AI (target=${targetSentiment}, tolleranza=${toneDeviation}).`,
      targetSentiment,
      toneDeviation,
      escalationChannel,
      monitoring,
      correctiveActions,
      automation: [
        'Pipeline serverless: generazione → sentiment guard → safe output.',
        `Invia alert via ${escalationChannel} se score fuori range o errore.`,
        'Registra esempi edge cases per affinare guardrail.',
      ],
      qaChecklist: [
        'Verifica manualmente 10% output settimanali.',
        'Controlla bias linguistico nei punteggi (multi lingua).',
        'Aggiorna soglie se feedback utenti indica tono errato.',
      ],
    };
  },
};











// Tool: PDF OCR QA Checklist
// Provides QA steps and metrics for evaluating OCR outputs.

module.exports = {
  async run({ params }) {
    const languages = Array.isArray(params?.languages) && params.languages.length > 0
      ? params.languages
      : ['it', 'en'];
    const accuracyTarget = Number(params?.accuracyTarget) || 95;
    const includeLayout = Boolean(params?.includeLayout);

    const metrics = [
      `Word accuracy >= ${accuracyTarget}%`,
      'Character error rate (CER)',
      'Recognised language distribution',
      includeLayout ? 'Layout fidelity (heading, tables, columns)' : null,
    ].filter(Boolean);

    const qaSteps = [
      'Campiona 5-10 pagine e confronta testo OCR vs originale.',
      includeLayout ? 'Verifica che heading e tabelle siano mappati correttamente.' : null,
      'Controlla simboli speciali, accenti, numeri.',
      'Valuta immagini e grafici per eventuali didascalie mancanti.',
      'Genera report con punteggi e suggerimenti di miglioramento.',
    ].filter(Boolean);

    return {
      summary: `QA OCR su lingue ${languages.join(', ')} con target ${accuracyTarget}% layout=${includeLayout}.`,
      languages,
      accuracyTarget,
      includeLayout,
      metrics,
      qaSteps,
      tooling: [
        'Okapi, CompareDocs, DiffPDF per confronto testo',
        'Langdetect / CLD3 per detection lingua',
        'Custom script per calcolo CER/WER',
      ],
      actions: [
        'Aggiorna training dataset per pagine problematiche.',
        'Ri-esegui OCR con parametri diversi (dpi, language pack).',
        'Documenta lessons learned nel knowledge base.',
      ],
    };
  },
};











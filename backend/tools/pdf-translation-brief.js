// Tool: PDF Translation Brief
// Creates a translation plan for PDF documents including glossary, layout notes and QC steps.

module.exports = {
  async run({ params }) {
    const sourceLanguage = params?.sourceLanguage || 'it';
    const targetLanguages = Array.isArray(params?.targetLanguages) && params.targetLanguages.length > 0
      ? params.targetLanguages
      : ['en'];
    const pageCount = Number(params?.pageCount) || 30;
    const layoutComplexity = params?.layoutComplexity || 'medium';

    const assets = [
      'PDF originale editabile o esportazione in formato IDML.',
      'Glossario termini tecnici approvato.',
      'Style guide per formattazione e toni.',
      'Elenco elementi non traducibili (marchi, codici, tabelle).',
    ];

    const workflow = [
      `Analisi layout (${layoutComplexity}) per capire se servono tool DTP (InDesign, Illustrator).`,
      'Estrazione testo con mapping ID paragr. + coordinate per ricostruzione layout.',
      'Traduzione con CAT tool (Trados, MemoQ) sfruttando memorie.',
      'Quality check linguistico + layout QA (line break, overflow).',
      'Rigenerazione PDF e confronto visivo con originale.',
    ];

    const timeline = [
      { phase: 'Preparazione', effort: `${Math.min(2, Math.ceil(pageCount / 20))} giorni`, notes: 'Setup risorse, glossario, template CAT.' },
      { phase: 'Traduzione', effort: `${Math.ceil(pageCount / 10)} giorni`, notes: 'Dipende da complessità tabelle/grafici.' },
      { phase: 'Revisione', effort: `${Math.ceil(targetLanguages.length)} giorno`, notes: 'QC + layout.' },
    ];

    return {
      summary: `Brief traduzione PDF ${pageCount} pagine da ${sourceLanguage} a ${targetLanguages.join(', ')}.`,
      sourceLanguage,
      targetLanguages,
      pageCount,
      layoutComplexity,
      requiredAssets: assets,
      workflow,
      timeline,
      qaChecklist: [
        'Confronto segmenti 100% match vs traduzione (no rewrite).',
        'Controllo numeri, unità di misura e formattazione date.',
        'Verifica campi modulo e link interni/esterni.',
        'Test stampa per evitare tagli o sovrapposizioni.',
      ],
      delivery: [
        'PDF finale localizzato.',
        'Pacchetto sorgente (IDML/AI) + memorie TMX.',
        'Rapporto QA con errori corretti.',
      ],
    };
  },
};











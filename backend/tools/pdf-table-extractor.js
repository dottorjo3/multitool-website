// Tool: PDF Table Extractor Plan
// Outlines extraction of tables from PDF with column mapping and exports.

module.exports = {
  async run({ params }) {
    const tableTypes = Array.isArray(params?.tableTypes) && params.tableTypes.length > 0
      ? params.tableTypes
      : ['financial', 'inventory'];
    const outputFormat = params?.outputFormat || 'csv';
    const includeValidation = Boolean(params?.includeValidation);

    const steps = [
      'Classifica pagine contenenti tabelle (heuristic o modello ML).',
      'Esegui rilevamento griglia (Camelot, Tabula, pdfplumber).',
      'Mappa colonne con nomi standard e tipi dati.',
      includeValidation ? 'Valida schema con regole (es. importi numerici, date).'
        : 'Esegui controllo manuale spot.',
      `Esporta tabelle in formato ${outputFormat} e salva log.`,
    ];

    const automation = [
      'Pipeline CLI con run pianificato per cartelle/ingestion.',
      'Verifica qualità con sampling (10% tabelle) e metriche mismatch.',
      'Integrazione con data warehouse (BigQuery, Snowflake) per carico automatico.',
    ];

    return {
      summary: `Estrazione tabelle ${tableTypes.join(', ')} in ${outputFormat}, validazione=${includeValidation}.`,
      tableTypes,
      outputFormat,
      includeValidation,
      steps,
      automation,
      tools: [
        'Camelot/Excalibur',
        'Tabula CLI',
        'pdfplumber + pandas',
      ],
      qaChecklist: [
        'Confronta totali/aggregazioni con PDF originale.',
        'Controlla encoding caratteri speciali.',
        'Assicura troncamenti o wrap corretti per celle lunghe.',
      ],
    };
  },
};











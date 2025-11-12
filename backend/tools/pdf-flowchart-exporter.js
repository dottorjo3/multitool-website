// Tool: PDF Flowchart Exporter
// Designs a process to convert PDF procedures into flowchart diagrams.

module.exports = {
  async run({ params }) {
    const sourceType = params?.sourceType || 'procedure';
    const targetTool = params?.targetTool || 'drawio';
    const includeSwimlanes = Boolean(params?.includeSwimlanes);
    const stepsLimit = Number(params?.stepsLimit) || 40;

    const extraction = [
      'Segmenta il PDF in sezioni e paragrafi numerati.',
      'Identifica trigger, decisioni (se/ allora) e output usando regex e analisi semantica.',
      includeSwimlanes ? 'Mappa i ruoli/responsabili per assegnare lane dedicate.' : 'Associa i passaggi a categorie di processo.',
    ];

    const mapping = [
      { element: 'Start/End', shape: 'Terminator', rule: 'Frasi “Inizio / Fine” o Step 0 / ultimo.' },
      { element: 'Processo', shape: 'Rectangle', rule: 'Istruzioni operative standard.' },
      { element: 'Decisione', shape: 'Diamond', rule: 'Condizioni con opzioni (sì/no).' },
      { element: 'Input/Output', shape: 'Parallelogram', rule: 'Form, documenti, sistemi in entrata/uscita.' },
    ];

    const exportFormats = {
      drawio: 'Genera XML compatibile con diagrams.net e salva file .drawio.',
      lucidchart: 'Usa API import (JSON) o CSV connector.',
      visio: 'Crea file SVG/VDX tramite script (es. yEd + export).',
    };

    const automation = [
      'Pipeline: OCR (se necessario) → Parsing testo → JSON steps → esportazione flowchart.',
      `Limita il numero di passaggi a ${stepsLimit}, suddividendo in più diagrammi se necessario.`,
      'Versiona i diagrammi generati e collega i PDF originali per audit trail.',
    ];

    return {
      summary: `Esporta ${sourceType} in flowchart per ${targetTool} (swimlanes=${includeSwimlanes}).`,
      sourceType,
      targetTool,
      includeSwimlanes,
      stepsLimit,
      extraction,
      mapping,
      exportGuidelines: exportFormats[targetTool] || exportFormats.drawio,
      automation,
      qaChecklist: [
        'Confronta diagramma con documento originale per assicurare completezza.',
        'Verifica naming dei blocchi e colori coerenti con brand.',
        'Condividi anteprima con stakeholder per conferma logica.',
      ],
      tooling: [
        'Python + pdfplumber per parsing',
        'spaCy / Regex rules per rilevare decisioni',
        'drawio-desktop CLI o yEd CLI per generazione diagrammi',
      ],
    };
  },
};











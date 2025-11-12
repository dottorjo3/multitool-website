// Tool: Document Summary Blueprint
// Provides a structured blueprint for summarising long documents.

module.exports = {
  async run({ params }) {
    const documentType = params?.documentType || 'report';
    const pages = Number(params?.pages) || 25;
    const audience = params?.audience || 'executive';
    const tone = params?.tone || 'neutral';

    const structure = [
      { section: 'Executive overview', length: '1 paragraf', content: 'Contesto, obiettivo, risultati chiave.' },
      { section: 'Key findings', length: '3 bullet', content: 'Insight più importanti con metriche.' },
      { section: 'Risks & blockers', length: '3 bullet', content: 'Problemi aperti con impatto e owner.' },
      { section: 'Next steps', length: '3 bullet', content: 'Azioni suggerite con timeline.' },
    ];

    const extraction = [
      'Identifica heading principali e sottosezioni.',
      'Evidenzia grafici o tabelle con numeri significativi.',
      'Marca citazioni/feedback importanti per eventuale box highlight.',
    ];

    const guidelines = [
      `Audience: ${audience}. Usa lessico e livello di dettaglio adeguato.`,
      `Tone: ${tone}. Mantieni coerenza con brand voice.`,
      `Riduci a 1 pagina ogni 10 pagine originali (≈ ${Math.ceil(pages / 10)} pagine riepilogo).`,
      'Evidenzia KPI con numeri concreti e unità di misura.',
    ];

    return {
      summary: `Blueprint riassunto ${documentType} di ${pages} pagine per audience ${audience}.`,
      documentType,
      pages,
      audience,
      tone,
      structure,
      extractionSteps: extraction,
      guidelines,
      qaChecklist: [
        'Verifica che il riassunto risponda alle domande chiave “Cosa, Perché, Cosa fare dopo”.',
        'Assicurati che i numeri corrispondano al documento originale.',
        'Richiedi review di un stakeholder per convalidare interpretazione.',
      ],
      deliveryFormats: [
        'PDF 1-2 pagine',
        'Slide sintetica (PowerPoint/Keynote)',
        'Versione testo per intranet / email',
      ],
    };
  },
};











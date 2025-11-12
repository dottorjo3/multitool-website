// Tool: Document Merge Workflow
// Defines workflow to merge multiple documents into bundles with cover, TOC and output.

module.exports = {
  async run({ params }) {
    const mergeFormats = Array.isArray(params?.mergeFormats) && params.mergeFormats.length > 0
      ? params.mergeFormats
      : ['pdf', 'docx'];
    const includeCover = Boolean(params?.includeCover);
    const tocStyle = params?.tocStyle || 'hierarchical';

    const steps = [
      `Converti tutti i documenti in formato standard (${mergeFormats[0]}).`,
      includeCover ? 'Genera cover page con logo, titolo, data.' : 'Inizia con indice.',
      `Crea sommario (${tocStyle}) con link alle sezioni principali.`,
      'Unisci documenti nell’ordine desiderato applicando numerazione continua.',
      'Aggiorna metadata (title, subject) e salva versioni finali.',
    ];

    const tooling = [
      'LibreOffice --convert-to + unoconv',
      'PDFtk / qpdf / pdfcpu',
      'python-docx / docxtpl per DOCX',
    ];

    return {
      summary: `Workflow merge documenti formati ${mergeFormats.join(', ')} cover=${includeCover} toc=${tocStyle}.`,
      mergeFormats,
      includeCover,
      tocStyle,
      steps,
      tooling,
      automation: [
        'CLI o pipeline CI per generare bundle periodici.',
        'Template cover + TOC personalizzabili per dipartimenti.',
        'Integrazione con storage condiviso e notifiche team.',
      ],
      qaChecklist: [
        'Verifica ordine documenti e aggiornamento TOC.',
        'Controlla numerazione pagine e link interni.',
        'Esegui controllo dimensioni file e leggibilità dopo merge.',
      ],
    };
  },
};









